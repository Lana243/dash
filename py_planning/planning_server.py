import json
import jsonpickle
import traceback

from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse
from dacite import from_dict
from shapely.geometry import Point

from .data_types import _RawState, beatify_state, PlannedPath, CaseStatus, postprocess_planned_path


class PlannerJSONRequestHandler(BaseHTTPRequestHandler):
    def __init__(self, do_plan, on_case_status, on_planned, *args, **kwargs):
        self.do_plan = do_plan
        self.on_case_status = on_case_status
        self.on_planned = on_planned
        super().__init__(*args, **kwargs)

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_POST(self):
        # Parse query data & params to find out what was passed
        parsed_path = urlparse(self.path)
        try:
            if parsed_path.path == '/plan':
                self.plan_request()
            elif parsed_path.path == '/notify_case_status':
                self.notify_case_status_request()
            elif parsed_path.path == '/ping':
                self.ping_request()
            else:
                self.send_response(404)
        except BrokenPipeError:
            pass

    def ping_request(self):
        # Send the "200 OK" response
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(b'{"status": "ok"}')

    def plan_request(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        try:
            state = from_dict(data_class=_RawState, data=json.loads(post_data))
            response = self.do_plan(beatify_state(state))
            if not self.on_planned(response):
                response = {'status': 'error', 'message': 'trajectory verification failed'}
        except Exception:
            print('Exception while planning: ', traceback.format_exc())
            response = {'status': 'error', 'message': traceback.format_exc()}

        # Send the "200 OK" response
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()

        # Send the response
        self.wfile.write(jsonpickle.dumps(postprocess_planned_path(response)).encode('utf-8'))

    def notify_case_status_request(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        response = "{}"
        status = {}
        try:
            status = json.loads(post_data)
        except json.JSONDecodeError:
            response = {'status': 'error', 'message': 'Invalid JSON'}

        self.on_case_status(status)

        # Send the "200 OK" response
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()

        # Send the response
        self.wfile.write(jsonpickle.dumps(response).encode('utf-8'))

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        BaseHTTPRequestHandler.end_headers(self)

    def log_message(self, format, *args):
        pass  # Override the log_message method to silence all logs


class PlanningServer(HTTPServer):
    def __init__(self, server_address):
        super().__init__(server_address, PlannerJSONRequestHandler)
        self.handles_planning_requests = True
        self.case_status = CaseStatus()
        self.stop_on_fail = True

    def finish_request(self, request, client_address):
        self.RequestHandlerClass(
            self.do_plan,
            self.on_case_status,
            self.on_planned,
            request, client_address, self)

    def set_planner(self, do_plan):
        self.do_plan = do_plan

    def set_stop_on_fail(self, stop_on_fail):
        self.stop_on_fail = stop_on_fail

    def on_case_status(self, status):
        self.case_status = from_dict(data_class=CaseStatus, data=status)
        status_string = self.case_status.status
        self.handles_planning_requests = False
        self.active_planner_uuid = None

        if status_string == 'reset':
            self.case_status = CaseStatus()
            self.handles_planning_requests = True
        if status_string == 'completed':
            self.case_status.completed = True
        if status_string == 'failed':
            self.case_status.completed = False
            if not self.stop_on_fail:
                self.handles_planning_requests = True

    def on_planned(self, planned_path: PlannedPath):
        return self.verify_planned_trajectory(planned_path)

    def verify_planned_trajectory(self, planned_path: PlannedPath):
        if len(planned_path.states) < 2:
            self.handles_planning_requests = False
            self.case_status.completed = False
            self.case_status.fail_reason = "Invalid planned trajectory: less then 2 states."
            return False

        MAX_VELOCITY = 30.0  # m/s
        for state in planned_path.states:
            if state.velocity > MAX_VELOCITY:
                print("Invalid planned trajectory: too high velocity: ", state.velocity, " > ",MAX_VELOCITY)
                self.handles_planning_requests = False
                self.case_status.completed = False
                self.case_status.fail_reason = "Invalid planned trajectory."
                return False

        return True

    def run(self):
        print("Case started")
        self.handles_planning_requests = True
        while self.handles_planning_requests:
            self.handle_request()
        return self.case_status

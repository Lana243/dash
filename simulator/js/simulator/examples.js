export default [
  { id: "rough-road", name: "Rough road", time_limit: 25, data: { "p": [-102.46078, 26.38513, -68.69821, 25.79776, -55.94913, 19.50427, -25.32284, 12.6183, -16.6024, 10.7739, -6.708, 11.78013, 31.36054, 12.11554, 47.04057, 14.7988, 56.85048, 23.26776, 56.84979, 35.25828, 46.95511, 43.89463], "s": [{ "p": [-54.96429, 21.2553], "r": -0.27612, "w": 2.7671, "h": 1.67703 }, { "p": [-36.09254, 12.36963], "r": 0.14726, "w": 3.43791, "h": 1.84475 }, { "p": [-13.41625, 14.2537], "r": 0.11658, "w": 4.69568, "h": 1.42549 }, { "p": [44.00931, 18.38166], "r": 0.25771, "w": 4.94713, "h": 4.27642 }, { "p": [62.74669, 29.41331], "r": 0, "w": 4.10855, "h": 5.86952 }, { "p": [46.71119, 38.74469], "r": 1.14742, "w": 4.52775, "h": 6.70794 }, { "p": [19.7351, 9.40621], "r": 0.65041, "w": 1.97177, "h": 1.07553 }, { "p": [28.99679, 9.71727], "r": 0.20862, "w": 1.97175, "h": 1.03072 }, { "p": [24.15205, 9.93872], "r": -0.31907, "w": 1.25476, "h": 0.9859 }], "d": [], "l": 191.4, "c": { "s": "10", "sl": "10", "lp": 1 }, "v": 1 } },

  { id: "avoid-static", name: "Avoid static obstacles", time_limit: 20, data: { "p": [-125, 15, -105, -5, -75, -5, -35, 15, -25, 35, 5, 55], "s": [{ "p": [-105.62726, -7.15616], "r": 0.30515, "w": 2.7594, "h": 2.89065 }, { "p": [-76.60163, -0.93975], "r": -0.3852, "w": 6.30706, "h": 6.17543 }, { "p": [-45.00172, 3.65897], "r": -1.03052, "w": 6.96393, "h": 6.43821 }, { "p": [-30.48247, 32.82748], "r": 0, "w": 5.25568, "h": 5.3869 }], "d": [], "l": 163.8, "c": { "s": "10", "sl": "10", "lp": -1 }, "v": 1 } },

  { id: "crosswalks", name: "Negotiating crosswalks", time_limit: 55, data: { "p": [-144.73574, 55.4495, -104.89441, 31.62755, -33.87479, 61.57811, 54.60631, 46.34858], "s": [], "d": [{ "p": ["51", "-2"], "v": ["0", "1.5"], "l": 1, "t": 2 }, { "p": ["52", "+2"], "v": ["0", "-1.6"], "l": 1, "t": 2 }, { "p": ["53", "-2"], "v": ["0", "1.5"], "l": 1, "t": 2 }, { "p": ["54", "+2"], "v": ["0", "-1.4"], "l": 1, "t": 2 }, { "p": ["55", "-2"], "v": ["0", "1.5"], "l": 1, "t": 2 }, { "p": ["50", "+3"], "v": ["0", "-1.5"], "l": 1, "t": 2 }, { "p": ["51", "-3"], "v": ["0", "1.7"], "l": 1, "t": 2 }, { "p": ["52", "+3"], "v": ["0", "-1.5"], "l": 1, "t": 2 }, { "p": ["53", "-3"], "v": ["0", "1.3"], "l": 1, "t": 2 }, { "p": ["50", "-4"], "v": ["0", "1.6"], "l": 1, "t": 2 }, { "p": ["51", "-4"], "v": ["0", "1.2"], "l": 1, "t": 2 }, { "p": ["52", "-5"], "v": ["0", "1.5"], "l": 1, "t": 2 }, { "p": ["53", "-5"], "v": ["0", "1.4"], "l": 1, "t": 2 }, { "p": ["50", "4.5"], "v": ["0", "-1.6"], "l": 1, "t": 2 }, { "p": ["51", "5"], "v": ["0", "-1.4"], "l": 1, "t": 2 }, { "p": ["52", "4"], "v": ["0", "-1.5"], "l": 1, "t": 2 }, { "p": ["53", "4.5"], "v": ["0", "-1.4"], "l": 1, "t": 2 }, { "p": ["52", "5"], "v": ["0", "-1.5"], "l": 1, "t": 2 }, { "p": ["51", "-5"], "v": ["0", "0.9"], "l": 1, "t": 2 }], "l": 125.1, "c": { "s": "5", "sl": "20", "lp": 1 }, "v": 1 } },

  { id: "two-car-overtake", name: "Two-car overtake", time_limit: 40, data: { "p": [-276.4674, 303.00865, 44.88593, 120.86712], "s": [], "d": [{ "p": ["100", "0.5"], "v": ["5", "0"], "l": 1, "t": 0 }, { "p": ["100", "-0.5"], "v": ["6", "0"], "l": 1, "t": 0 }], "l": 369.4, "c": { "s": "20", "sl": "20", "lp": 1 }, "v": 1 } },

  { id: "merging", name: "Merging into slower traffic", time_limit: 90, data: { "p": [-629.09464, 16.31589, 281.97162, 14.81565], "s": [{ "p": [-440.00152, 11.62602], "r": 0, "w": 3.1379, "h": 3.13801 }, { "p": [-259.74036, 11.98013], "r": 0, "w": 2.51556, "h": 4.4441 }, { "p": [93.71013, 11.27032], "r": 0, "w": 4.07947, "h": 7.84501 }, { "p": [-94.72208, 11.28172], "r": 0, "w": 3.76609, "h": 7.53122 }], "d": [{ "p": ["320", "0.5"], "v": ["12", "0"], "l": 1, "t": 0 }, { "p": ["280", "0.5"], "v": ["12", "0"], "l": 1, "t": 0 }, { "p": ["240", "0.5"], "v": ["12", "0"], "l": 1, "t": 0 }, { "p": ["200", "0.5"], "v": ["12", "0"], "l": 1, "t": 0 }, { "p": ["160", "0.5"], "v": ["12", "0"], "l": 1, "t": 0 }, { "p": ["120", "0.5"], "v": ["12", "0"], "l": 1, "t": 0 }, { "p": ["80", "0.5"], "v": ["12", "0"], "l": 1, "t": 0 }, { "p": ["40", "0.5"], "v": ["12", "0"], "l": 1, "t": 0 }, { "p": ["0", "0.5"], "v": ["12", "0"], "l": 1, "t": 0 }, { "p": ["-40", "0.5"], "v": ["12", "0"], "l": 1, "t": 0 }, { "p": ["-80", "0.5"], "v": ["12", "0"], "l": 1, "t": 0 }, { "p": ["-120", "0.5"], "v": ["12", "0"], "l": 1, "t": 0 }, { "p": ["-160", "0.5"], "v": ["12", "0"], "l": 1, "t": 0 }, { "p": ["-200", "0.5"], "v": ["12", "0"], "l": 1, "t": 0 }], "l": 911.067, "c": { "s": "25", "sl": "25", "lp": -1 }, "v": 1 } },
];

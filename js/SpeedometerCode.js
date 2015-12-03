//Temperature speedo
$scope.generateTempSpeedo = function(watchTemp, warnTemp, bleachTemp, currentTemp) {
    $(function () {
        // variable = [lowlow, lowhigh, highlow, highhigh]  = all colors except green [low, high]
        var currentTemp = 26.81;
        var watchTemp = 29.8;
        var warnTemp = 30.0;
        var bleachTemp = 30.4;


        var red = [bleachTemp, 34];
        var orange = [warnTemp, bleachTemp];
        var yellow = [watchTemp, warnTemp];
        var green = [24, watchTemp];
        $('#container').highcharts({

                chart: {
                    type: 'gauge',
                    plotBackgroundColor: null,
                    plotBackgroundImage: null,
                    plotBorderWidth: 0,
                    plotShadow: false
                },

                title: {
                    text: 'Temperature'
                },

                pane: {
                    startAngle: -150,
                    endAngle: 150,
                    background: [{
                        backgroundColor: {
                            linearGradient: {
                                x1: 0,
                                y1: 0,
                                x2: 0,
                                y2: 1
                            },
                            stops: [
                                [0, '#FFF'],
                                [1, '#333']
                            ]
                        },
                        borderWidth: 0,
                        outerRadius: '109%'
                    }, {
                        backgroundColor: {
                            linearGradient: {
                                x1: 0,
                                y1: 0,
                                x2: 0,
                                y2: 1
                            },
                            stops: [
                                [0, '#333'],
                                [1, '#FFF']
                            ]
                        },
                        borderWidth: 1,
                        outerRadius: '107%'
                    }, {
                        // default background
                    }, {
                        backgroundColor: '#DDD',
                        borderWidth: 0,
                        outerRadius: '105%',
                        innerRadius: '103%'
                    }]
                },

                // the value axis
                yAxis: {
                    min: 24,
                    max: 34,

                    minorTickInterval: 'auto',
                    minorTickWidth: 1,
                    minorTickLength: 10,
                    minorTickPosition: 'inside',
                    minorTickColor: '#666',

                    tickPixelInterval: 30,
                    tickWidth: 2,
                    tickPosition: 'inside',
                    tickLength: 10,
                    tickColor: '#666',
                    labels: {
                        step: 2,
                        rotation: 'auto'
                    },
                    title: {
                        text: 'km/h'
                    },
                    plotBands: [{
                        from: green[0],
                        to: green[1],
                        color: '#55BF3B' // green
                    }, {
                        from: yellow[0], // - lowlow
                        to: yellow[1], // - lowhigh
                        color: '#DDDF0D' // yellow - low
                    }, {
                        from: orange[0], // - lowlow
                        to: orange[1], // - lowhigh
                        color: '#ffa500' // orange
                    }, {
                        from: red[0], // - lowlow
                        to: red[1], // - lowhigh
                        color: '#DF5353' // red
                    }]
                },

                series: [{
                    name: 'Speed',
                    data: [currentTemp],
                    tooltip: {
                        valueSuffix: ' km/h'
                    }
                }],
                credits: {
                    enabled: false
                }

            },
            // Add some life
            function (chart) {

            });
    });
};




//Anomaly speedo

$scope.generateAnomalySpeedo = function(SDone, SDtwo, SDthree, anomaly) {
    $(function () {
        // variable = [lowlow, lowhigh, highlow, highhigh]  = all colors except green [low, high]
        var red = [-3, -SDthree, SDthree, 34];
        var orange = [-SDthree, -SDtwo, SDtwo, SDthree];
        var yellow = [-SDtwo, -SDone, SDone, SDtwo];
        var green = [-SDone, SDone];
        $('#container').highcharts({

                chart: {
                    type: 'gauge',
                    plotBackgroundColor: null,
                    plotBackgroundImage: null,
                    plotBorderWidth: 0,
                    plotShadow: false
                },

                title: {
                    text: 'Water Temperature Anomaly'
                },

                pane: {
                    startAngle: -150,
                    endAngle: 150,
                    background: [{
                        backgroundColor: {
                            linearGradient: {
                                x1: 0,
                                y1: 0,
                                x2: 0,
                                y2: 1
                            },
                            stops: [
                                [0, '#FFF'],
                                [1, '#333']
                            ]
                        },
                        borderWidth: 0,
                        outerRadius: '109%'
                    }, {
                        backgroundColor: {
                            linearGradient: {
                                x1: 0,
                                y1: 0,
                                x2: 0,
                                y2: 1
                            },
                            stops: [
                                [0, '#333'],
                                [1, '#FFF']
                            ]
                        },
                        borderWidth: 1,
                        outerRadius: '107%'
                    }, {
                        // default background
                    }, {
                        backgroundColor: '#DDD',
                        borderWidth: 0,
                        outerRadius: '105%',
                        innerRadius: '103%'
                    }]
                },

                // the value axis
                yAxis: {
                    min: -3,
                    max: 3,

                    minorTickInterval: 'auto',
                    minorTickWidth: 1,
                    minorTickLength: 10,
                    minorTickPosition: 'inside',
                    minorTickColor: '#666',

                    tickPixelInterval: 30,
                    tickWidth: 2,
                    tickPosition: 'inside',
                    tickLength: 10,
                    tickColor: '#666',
                    labels: {
                        step: 2,
                        rotation: 'auto'
                    },
                    title: {
                        text: ''
                    },
                    plotBands: [{
                        from: green[0],
                        to: green[1],
                        color: '#55BF3B' // green
                    }, {
                        from: yellow[0], // - lowlow
                        to: yellow[1], // - lowhigh
                        color: '#DDDF0D' // yellow - low
                    }, {
                        from: yellow[2], // - highlow
                        to: yellow[3], // - highhigh
                        color: '#DDDF0D' // yellow
                    }, {
                        from: orange[0], // - lowlow
                        to: orange[1], // - lowhigh
                        color: '#ffa500' // orange
                    }, {
                        from: orange[2], // - highlow
                        to: orange[3], // - highhigh
                        color: '#ffa500' // orange
                    }, {
                        from: red[0], // - lowlow
                        to: red[1], // - lowhigh
                        color: '#DF5353' // red
                    }, {
                        from: red[2], // - highlow
                        to: red[3], // - highhigh
                        color: '#DF5353' // red
                    }]
                },

                series: [{
                    name: 'Anomaly',
                    data: [anomaly],
                    tooltip: {
                        valueSuffix: '°C'
                    }
                }],
                credits: {
                    enabled: false
                }

            },
            // Add some life
            function (chart) {

            });
    });

};

//var SDone = 0.52;
//var SDtwo = 1.04;
//var SDthree= 1.56;
//var anomaly = 0.119;
//generateAnomalySpeedo(4,SDone,SDtwo,SDthree, anomaly);
const container = document.getElementById('analysis-os');
const data = {
    categories: ['OS'],
    series: [
        {
            name: Object.keys(ua)[0],
            data: ua.windows
        },
        {
            name: Object.keys(ua)[1],
            data: ua.mac
        },
        {
            name: Object.keys(ua)[2],
            data: ua.android
        },
        {
            name: Object.keys(ua)[3],
            data: ua.iOs
        }
        // {
        //     name: Object.keys(ua)[3],
        //     data: ((ua.windows/total)*100).toFixed(2)
        // }
    ]
};
const options = {
    chart: {
        width: 400,
        height: 400,
        title: {
            text: 'Operating Systems',
            offsetY: 250,
            offsetX: 100
        },
        format: function(value, chartType, areaType, valuetype, legendName) {
            if (areaType === 'makingSeriesLabel') { // formatting at series area
                value =value;
            }

            return value;
        }
    },
    chartExportMenu: {
        visible: true,
        offsetX: -100
    },
    series: {
        radiusRange: ['50%', '100%'],
        showLabel: true
    },
    tooltip: {
        suffix: ''
    },
    legend: {
        align: 'bottom'
    }
};
const theme = {
    series: {
        colors: [
                '#E71D36', '#FF9F1C', '#29274C', '#F42272', '#F76F8E',
                '#DF57BC', '#F59CA9', '#8a9a9a', '#516f7d', '#F76F8E'
        ],
        label: {
            color: '#fff',
            fontFamily: 'sans-serif'
        }
    },
    title :{
        fontFamily: "Quicksand",
        align: 'center'
    },
    legend :{
        label:{
            fontFamily: "Quicksand"
        }
    },
    chart :{
        fontFamily:'Quicksand',
        background: {
            color: 'white',
            opacity: 1
        }
    }
};

// For apply theme

tui.chart.registerTheme('myTheme', theme);
options.theme = 'myTheme';

const osChart = tui.chart.pieChart(container, data, options);

//Operating System Donut Pie

const container_two = document.getElementById('analysis-browser');
const data_two = {
    categories: ['Browser'],
    series: [
        {
            name: Object.keys(br)[0],
            data: br.chrome
        },
        {
            name: Object.keys(br)[1],
            data: br.safari
        },
        {
            name: Object.keys(br)[2],
            data: br.firefox
        },
        {
            name: Object.keys(br)[3],
            data: br.ie
        }
        // {
        //     name: Object.keys(ua)[3],
        //     data: ((ua.windows/total)*100).toFixed(2)
        // }
    ]
};
const options_two = {
    chart: {
        width: 400,
        height: 400,
        title: {
            text: 'Browsers',
            offsetY: 250,
            offsetX: 145
        },
        format: function(value, chartType, areaType, valuetype, legendName) {
            if (areaType === 'makingSeriesLabel') { // formatting at series area
                value =value;
            }

            return value;
        }
    },
    series: {
        radiusRange: ['50%', '100%'],
        showLabel: true
    },
    tooltip: {
        suffix: ''
    },
    legend: {
        align: 'bottom'
    }
};

// For apply theme

tui.chart.registerTheme('myTheme', theme);
options_two.theme = 'myTheme';

const browserChart = tui.chart.pieChart(container_two, data_two, options_two);


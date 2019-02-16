document.addEventListener('DOMContentLoaded', function () {
  var myChart = Highcharts.chart('container', {
    chart: {
      type: 'column'
    },
    title: {
      text: ''
    },
    xAxis: {
      categories: [
        'CDMX',
        'MTY'
      ]
    },
    yAxis: [{
      min: 0,
      title: {
        text: 'Ingresos'
      }
    }, {
      title: {
        text: 'Ahorros'
      },
      opposite: true
    }],
    legend: {
      shadow: false
    },
    tooltip: {
      shared: true
    },
    plotOptions: {
      column: {
        grouping: false,
        shadow: false,
        borderWidth: 0
      }
    },
    series: [{
      name: 'Ingresos Ideales',
      color: 'rgba(165,170,217,1)',
      data: [150, 73],
      pointPadding: 0.3,
      pointPlacement: -0.2
    }, {
      name: 'Ingresos',
      color: 'rgba(126,86,134,.9)',
      data: [140, 90],
      pointPadding: 0.4,
      pointPlacement: -0.2
    }, {
      name: 'Ahorros Ideales',
      color: 'rgba(248,161,63,1)',
      data: [183.6, 178.8],
      tooltip: {
        valuePrefix: '$',
        valueSuffix: ' M'
      },
      pointPadding: 0.3,
      pointPlacement: 0.2,
      yAxis: 1
    }, {
      name: 'Ahorros',
      color: 'rgba(186,60,61,.9)',
      data: [203.6, 198.8],
      tooltip: {
        valuePrefix: '$',
        valueSuffix: ' M'
      },
      pointPadding: 0.4,
      pointPlacement: 0.2,
      yAxis: 1
    }]
  });
});
document.addEventListener('DOMContentLoaded', function () {
  var myChart = Highcharts.chart('chartPie', {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'pie'
  },
  title: {
    text: ''
  },
  tooltip: {
    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        style: {
          color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
        }
      }
    }
  },
  series: [{
    name: 'Sucursales',
    colorByPoint: true,
    data: [{
      name: 'CDMX',
      y: 63.4,
      sliced: true,
      selected: true
    }, {
      name: 'MTY',
      y: 36.6
    }]
  }]
});
});

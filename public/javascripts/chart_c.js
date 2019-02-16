
document.addEventListener('DOMContentLoaded', function () {
var chart = Highcharts.chart('dynamicChart', {

  title: {
    text: ''
  },

  subtitle: {
    text: ''
  },

  xAxis: {
    categories: [ 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic' , 'Ene', 'Feb']
  },

  series: [{
    type: 'column',
    colorByPoint: true,
    data: [95.6, 54.4, 71.5, 80.4, 80.4, 129.2,135.6, 144.0, 148.5, 176.0,216.4, 194.1],
    showInLegend: false
  }]

});


$('#plain').click(function () {
  chart.update({
    chart: {
      inverted: false,
      polar: false
    },
    subtitle: {
      text: 'Plain'
    }
  });
});

$('#inverted').click(function () {
  chart.update({
    chart: {
      inverted: true,
      polar: false
    },
    subtitle: {
      text: 'Inverted'
    }
  });
});

$('#polar').click(function () {
  chart.update({
    chart: {
      inverted: false,
      polar: true
    },
    subtitle: {
      text: 'Polar'
    }
  });
});});
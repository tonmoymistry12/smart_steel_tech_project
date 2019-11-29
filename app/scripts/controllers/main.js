'use strict';
var app = angular.module('smartSteelProjApp', []);
app.controller('MainCtrl', function($scope) {
  function csvJSON(csv){
    var lines=csv.split("\n");
    var result = [];
    var headers=lines[0].split(",");
  
    for(var i=1;i<lines.length;i++){
  
      var obj = {};
      var currentline=lines[i].split(",");
  
      for(var j=0;j<headers.length;j++){
        obj[headers[j]] = currentline[j];
      }
      
      result.push(obj);
     }
    
    //return result; //JavaScript object
    result = JSON.stringify(result);
    return  result//JSON
    
  }
  let createChart = function(finalData){
    var finalData2 = JSON.parse(finalData)
    var margin = {top: 30, right: 10, bottom: 10, left: 60},
    chart = d3LineWithLegend()
              .xAxis.label('Sample Index')
              .width(width(margin))
              .height(height(margin))
              .yAxis.label('Frequency (f) / Volatage (V)');
  
  
  var svg = d3.select('#test1 svg')
    .datum(generateData())
  
  svg.transition().duration(500)
    .attr('width', width(margin))
    .attr('height', height(margin))
    .call(chart);
  
  
  chart.dispatch.on('showTooltip', function(e) {
  var offset = $('#test1').offset(), // { left: 0, top: 0 }
      left = e.pos[0] + offset.left,
      top = e.pos[1] + offset.top,
      formatter = d3.format(".04f");
  
  var content = '<h3>' + e.series.label + '</h3>' +
                '<p>' +
                '<span class="value">[' +'Sample No: '+ e.point[0] + ', '+'Value: '+ formatter(e.point[1]) + ']</span>' +
                '</p>';
  
  nvtooltip.show([left, top], content);
  });
  
  chart.dispatch.on('hideTooltip', function(e) {
  nvtooltip.cleanup();
  });
  
  
  
  
  $(window).resize(function() {
  var margin = chart.margin();
  
  chart
    .width(width(margin))
    .height(height(margin));
  
  d3.select('#test1 svg')
    .attr('width', width(margin))
    .attr('height', height(margin))
    .call(chart);
  
  });
  
  
  
  
  function width(margin) {
  var w = $(window).width() - 20;
  
  return ( (w - margin.left - margin.right - 20) < 0 ) ? margin.left + margin.right + 2 : w;
  }
  
  function height(margin) {
  var h = $(window).height() - 20;
  
  return ( h - margin.top - margin.bottom - 20 < 0 ) ? 
            margin.top + margin.bottom + 2 : h;
  }
  
  
  //data
  function generateData() {
  var sensor0 = [],
      sensor1 = [],
      sensor2 = [],
      sensor3 = [],
      sensor4 = [],
      sensor5 = [],
      sensor6 = [],
      sensor7 = [],
      sensor8 = [],
      sensor9 = [];
      
  
  for (var i = 0; i < finalData2.length; i++) {
    sensor0.push([ i, finalData2[i].class_label == 1.0 ? finalData2[0].sensor0 : -finalData2[0].sensor0]);
    sensor1.push([ i, finalData2[i].class_label == 1.0 ? finalData2[0].sensor1 : -finalData2[0].sensor1]);
    sensor2.push([ i, finalData2[i].class_label == 1.0 ? finalData2[0].sensor2 : -finalData2[0].sensor2]);
    sensor3.push([ i, finalData2[i].class_label == 1.0 ? finalData2[0].sensor3 : -finalData2[0].sensor3]);
    sensor4.push([ i, finalData2[i].class_label == 1.0 ? finalData2[0].sensor4 : -finalData2[0].sensor4]);
    sensor5.push([ i, finalData2[i].class_label == 1.0 ? finalData2[0].sensor5 : -finalData2[0].sensor5]);
    sensor6.push([ i, finalData2[i].class_label == 1.0 ? finalData2[0].sensor6 : -finalData2[0].sensor6]);
    sensor7.push([ i, finalData2[i].class_label == 1.0 ? finalData2[0].sensor7 : -finalData2[0].sensor7]);
    sensor8.push([ i, finalData2[i].class_label == 1.0 ? finalData2[0].sensor8 : -finalData2[0].sensor8]);
    sensor9.push([ i, finalData2[i].class_label == 1.0 ? finalData2[0].sensor9 : -finalData2[0].sensor9]);
}
  
  return [
    {
      data: sensor0,
      label: "Sensor 0"
    },
    {
      data: sensor1,
      label: "Sensor 1"
    },
    {
      data: sensor2,
      label: "Sensor 2"
    },
    {
      data: sensor3,
      label: "Sensor 3"
    },
    {
      data: sensor4,
      label: "Sensor 4"
    },
    {
      data: sensor5,
      label: "Sensor 5"
    },
    {
      data: sensor6,
      label: "Sensor 6"
    },
    {
      data: sensor7,
      label: "Sensor 7"
    },
    {
      data: sensor8,
      label: "Sensor 8"
    },
    {
      data: sensor9,
      label: "Sensor 9"
    }
  ];
  }
  } 
  
  
fetch('../../data/task_data.csv', {mode: 'no-cors'})
  .then(response => response.text())
  .then(data=> {
    let result = csvJSON(data);
    createChart(result);
    console.log(result);
  })
  .catch(error => console.error(error));
  
});

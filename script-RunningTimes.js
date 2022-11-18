// set the dimensions and margins of the graph
var margin3 = {top: 20, right: 30, bottom: 40, left: 200},
    width3 = 1100 - margin3.left - margin3.right,
    height3 = 1100 - margin3.top - margin3.bottom;

// append the svg3 object to the body of the page
var svg3 = d3.select("#RunningTimes")
.style("width", 1100)
.style("height", 1100)
  .append("svg")
    .attr("width", width3 + margin3.left + margin3.right)
    .attr("height", height3 + margin3.top + margin3.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin3.left + "," + margin3.top + ")");
var genres="Horror";

// Parse the Data
d3.csv("clean_dataset.csv", function(data) {
var filterdata= data.filter(function(d,i){
  if (d["genres"] == genres) 
            { 
                return d; 
            } 

});


  // Add X axis
  var x = d3.scaleLinear()
    .domain([0,500])
    .range([ 0, width3]);
  svg3.append("g")
    .attr("transform", "translate(0," + height3 + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end")
      

  // Y axis
  var y = d3.scaleBand()
    .range([ 0, height3 ])
    .domain(filterdata.map(function(d) { return d.title; }))
    .padding(.2);
  svg3.append("g")
    .call(d3.axisLeft(y))

  //Bars
  svg3.selectAll("myRect")
    .data(filterdata)
    .enter()
    .append("rect")
    .attr("x", x(0) )
    .attr("y", function(d) { return y(d.title); })
    .attr("width", function(d) { return x(d.runtime); })
    .attr("height", y.bandwidth() )
    .attr("fill", "#69b3a2")
    
})
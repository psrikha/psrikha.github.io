

// set the dimensions and margins of the graph
var margin2 = {top: 10, right: 30, bottom: 30, left: 60},
    width2 = 800 - margin2.left - margin2.right,
    height2 = 400 - margin2.top - margin2.bottom;

// append the svg2 object to the body of the page
var svg2 = d3.select("#votesVsRatings")
.style("width", 800)
.style("height", 400)
    
    .attr("width2", width2 + margin2.left + margin2.right)
    .attr("height2", height2 + margin2.top + margin2.bottom)
    .append("g")
    .attr("transform",
            "translate(" + margin2.left + "," + margin2.top + ")");

//Read the data
d3.csv("clean_dataset.csv", function(data) {

    // Add X axis
    var x2 = d3.scaleLinear()
    .domain([0, 8000])
    .range([ 0, width2+100 ]);
    svg2.append("g")
    .attr("transform", "translate(0," + height2 + ")")
    .call(d3.axisBottom(x2));

    // Add Y axis
    var y2 = d3.scaleLinear()
    .domain([0, 10])
    .range([ height2, 0]);
    svg2.append("g")
    .call(d3.axisLeft(y2));

    // Add dots
    svg2.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
        .attr("cx", function (d) { return x2(d.num_votes); } )
        .attr("cy", function (d) { return y2(d.average_rating); } )
        .attr("r", 1.5)
        .style("fill", "#69b3a2")

})


var svg = d3.select("#yearWiseRating")
.style("width", 2000)
.style("height", 950)

var margin = 200,
    width = 1800,
    height = 750

svg.append("text")
   .attr("transform", "translate(100,0)")
   .attr("x", 400)
   .attr("y", 50)
   .attr("font-size", "30px")
   .text("Year Wise Ratings ")
//    .text("Count per year: 0")

var xScale = d3.scaleBand().range([0, width]).padding(0.3),
    yScale = d3.scaleLinear().range([height, 0]);

var g = svg.append("g")
           .attr("transform", "translate(" + 100 + "," + 100 + ")");

d3.csv("clean_dataset.csv", function(error, data) {
    if (error) {
        throw error;
    }

    xScale.domain(data.map(function(d) { return d.release_year; }));
    yScale.domain([0, d3.max(data, function(d) { return d.average_rating; })]);

    g.append("g")
     .attr("transform", "translate(0," + height + ")")
     .call(d3.axisBottom(xScale))
     .append("text")
     .attr("y", height -250)
     .attr("x", width - 100)
     .attr("text-anchor", "end")
     .attr("stroke", "black")
     .text("Year");

    g.append("g")
     .call(d3.axisLeft(yScale).tickFormat(function(d){
         return "" + d;
     })
     .ticks(20))
     .append("text")
     .attr("transform", "rotate(-90)")
     .attr("y", 6)
     .attr("dy", "-5.1em")
     .attr("text-anchor", "end")
     .attr("stroke", "black")
     .text("Average Ratings");
     

    g.selectAll(".bar")
     .data(data)
     .enter().append("rect")
     .attr("class", "bar")
     .attr("x", function(d) { return xScale(d.release_year); })
     .attr("y", function(d) { return yScale(d.average_rating); })
     .attr("width", xScale.bandwidth())
     .attr("height", function(d) { return height - yScale(d.average_rating); })
     .attr("fill", "steelblue")
    //  .on("mouseover",function(d,i){
    //             d3.select(this)        
    //             .attr("stroke-width", 2)
    //             .attr("stroke", "black") 
               
    //             text.transition().text("Count per year: " + i[average_rating])
                   
    //         })
    //         .on("mouseout",function(){
    //             d3.select(this)
    //             .attr("stroke-width", 0)
    //             text.transition().text("Count per year: "+ 0)
    //         })
     
     
});
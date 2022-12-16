function country_type(){



// set the dimensions and margins of the graph
const width = 700
const height = 410
document.getElementById("details").innerHTML="Country: Choose a country"
// append the svg object to the body of the page
const svg = d3.select("#bubble")
  .append("svg")
    .attr("width", width)
    .attr("height", height)

// Read data
d3.csv("clean_dataset.csv").then( function(data) {
console.log(data)
  // Filter a bit the data -> more than 1 million inhabitants
  const arr = []
        for(var i=0; i<data.length;i++){
            arr.push(data[i].country);
            
        }
        console.log(arr)
        var data1=new Object;
        for (var j=0;j<arr.length;j++){
            var num = arr[j];
            data1[num]=data1[num] ? data1[num]+1 :1;
        }
        console.log(data1)
        
        var data2=[]
        for(var a in data1){
            data2.push(
                {
                    
                    key: a,
                    value: data1[a]
                }
            )
        }
        data=data2
        console.log(data)
  // Color palette for continents?
  const color = d3.scaleOrdinal( d3.schemeTableau10)
    

  // Size scale for countries
  const size = d3.scaleLinear()
    .domain([0, 1000])
    .range([15,35])  // circle will be between 7 and 55 px wide
    

   
   
  
 

  // Initialize the circle: all located at the center of the svg area
  var node = svg.append("g")
    .selectAll("circle")
    .data(data)
    .join("circle")
      .attr("class", "node")
      .attr("r", d => size(d.value))
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .style("fill", d => color(d.value))
      .style("fill-opacity", 0.8)
      .attr("stroke", "black")
      .style("stroke-width", 0.2)
      .on("mouseover", function(d) {
        d3.select(this).transition()
        .duration('.3')
        .attr('opacity', '.75');})
    .on("mouseleave", function(d) {
            d3.select(this).transition()
            .duration('.3')
            .attr('opacity', '1');})
      .on("click", function(d, i){
        document.getElementById("chart").innerHTML=""
        content_type(d.key)
        document.getElementById("violin").innerHTML=""
        content_violin(d.key,'')
        document.getElementById("rating").innerHTML=""
        content_rating(d.key,'')
        document.getElementById("details").innerHTML="Country: "+d.key+","+"releases: "+d.value
        document.getElementById("selectButton").innerHTML=""
         })
      .call(d3.drag() // call specific function when circle is dragged
           .on("start", dragstarted)
           .on("drag", dragged)
           .on("end", dragended));

  // Features of the forces applied to the nodes:
  const simulation = d3.forceSimulation()
      .force("center", d3.forceCenter().x(width / 2).y(height / 2)) // Attraction to the center of the svg area
      .force("charge", d3.forceManyBody().strength(.1)) // Nodes are attracted one each other of value is > 0
      .force("collide", d3.forceCollide().strength(.2).radius(function(d){ return (size(d.value)+3) }).iterations(1)) // Force that avoids circle overlapping

  // Apply these forces to the nodes and update their positions.
  // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
  simulation
      .nodes(data)
      .on("tick", function(d){
        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y)
        texts
            .attr("x", d => d.x)
            .attr("y", d => d.y)
      });
let texts = svg.selectAll(null)
.data(data)
.enter()
.append('text')
.text(d => d.key )

.attr("fill", "currentColor")
.attr("font-size", d=>{
    if(d.value> 1000){
        return 12
    }
    else if(d.value> 500){
        return 10
    }
    else{
        return 8
    }

})
.attr("font-family", "sans-serif")
.attr("text-anchor", "middle")

  // What happens when a circle is dragged?
  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(.03).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }
  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(.03);
    d.fx = null;
    d.fy = null;
  }

})




}
 function content_type(country_name){

    var divWidth = 500
    var margin = {top: 30, right: 0, bottom: 20, left: 0},
        width = divWidth ,
        height = 380 - margin.top - margin.bottom,
        formatNumber = d3.format(","),
        transitioning;
    // sets x and y scale to determine size of visible boxes
    var x = d3.scaleLinear()
        .domain([0, width])
        .range([0, width]);
    var y = d3.scaleLinear()
        .domain([0, height])
        .range([0, height]);
    var treemap = d3.treemap()
            .size([width, height])
            .paddingInner(0)
            .round(false);
    var svg = d3.select('#chart').append("svg")
        .attr("width", width + margin.left + margin.right+75)
        .attr("height", height + margin.bottom + margin.top+75)
        .style("margin-left", -margin.left + "px")
        .style("margin.right", -margin.right + "px")
        .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .style("shape-rendering", "crispEdges");
    var grandparent = svg.append("g")
            .attr("class", "grandparent");
        grandparent.append("rect")
            .attr("y", -margin.top)
            .attr("width", width+10)
            .attr("height", margin.top)
            .attr("fill", '#bbbbbb');
        grandparent.append("text")
            .attr("x", 6)
            .attr("y", 6- margin.top)
            .attr("dy", ".75em");
    d3.csv("clean_dataset.csv").then( function(data) {
    var finaldata={}
    finaldata["name"]="Content_type"
    finaldata["children"]=[]
    
    const arr = []
    for(var i=0; i<data.length;i++){
        if(data[i].type!=""){
        arr.push(data[i].type);}
    }
    var data1={};
    for (var j=0;j<arr.length;j++){
        var num = arr[j];
        data1[num]=data1[num] ? data1[num]+1 :1;
    }
    for(a in data1){
        
       
        
        const arr2 = []
        for(var i=0; i<data.length;i++){
            if(country_name!=""){
            if(data[i].type==a&& data[i].country==country_name){
            arr2.push(data[i].genres);}
            }
            else{
                if(data[i].type==a){
                    arr2.push(data[i].genres);}
                    }
            }
        
        var data2={};
        for (var j=0;j<arr2.length;j++){
            var num = arr2[j];
            data2[num]=data2[num] ? data2[num]+1 :1;
        }
        var sub=[]
        
        for(var b in data2){
            sub.push(
                {
                    name: b,
                    value: data2[b]
                }
            )
        }
        finaldata["children"].push(
            {
                name: a,
                children: sub
            }
        )
    
    }
    data=finaldata
    
        
        var root = d3.hierarchy(data);
        
        treemap(root
            .sum(function (d) {
                return d.value;
            })
            .sort(function (a, b) {
                return b.height - a.height || b.value - a.value
            })
        );
        display(root);
        function display(d) {
            // write text into grandparent
            // and activate click's handler
            grandparent
                .datum(d.parent)
                .on("click", transition)
                .select("text")
                .style("font-size", "18px")
                .text(name(d));
            // grandparent color
            grandparent
                .datum(d.parent)
                .select("rect")
                .attr("fill", function () {
                    return '#bbbbbb'
                });
            var g1 = svg.insert("g", ".grandparent")
                .datum(d)
                .attr("class", "depth");
            var g = g1.selectAll("g")
                .data(d.children)
                .enter().
                append("g");
            // add class and click handler to all g's with children
            g.filter(function (d) {
                return d.children;
            })
                .classed("children", true)
                .on("click", transition)
                
            g.selectAll(".child")
                .data(function (d) {
                    return d.children || [d];
                })
                .enter().append("rect")
                .attr("class", "child")
                .call(rect);
            // add title to parents
            g.append("rect")
                .attr("class", "parent")
                .call(rect)
                .append("title")
                .text(function (d){
                    return d.data.name;
                });
            /* Adding a foreign object instead of a text object, allows for text wrapping */
            g.append("foreignObject")
                .call(rect)
                .attr("class", "foreignobj")
                .append("xhtml:div")
                .attr("dy", ".75em")
                .html(function (d) {
                    return '' +
                        '<p class="title"> ' + d.data.name + '</p>' +
                        '<p>' + formatNumber(d.value) + '</p>'
                    ;
                })
                .attr("class", "textdiv"); //textdiv class allows us to style the text easily with CSS
            function transition(d) {
                if (transitioning || !d) return;
                transitioning = true;
                var g2 = display(d),
                    t1 = g1.transition().duration(650),
                    t2 = g2.transition().duration(650);
                // Update the domain only after entering new elements.
                x.domain([d.x0, d.x1]);
                y.domain([d.y0, d.y1]);
                // Enable anti-aliasing during the transition.
                svg.style("shape-rendering", null);
                // Draw child nodes on top of parent nodes.
                svg.selectAll(".depth").sort(function (a, b) {
                    return a.depth - b.depth;
                });
                // Fade-in entering text.
                g2.selectAll("text").style("fill-opacity", 0);
                g2.selectAll("foreignObject div").style("display", "none");
                /*added*/
                // Transition to the new view.
                t1.selectAll("text").call(text).style("fill-opacity", 0);
                t2.selectAll("text").call(text).style("fill-opacity", 1);
                t1.selectAll("rect").call(rect);
                t2.selectAll("rect").call(rect);
                /* Foreign object */
                t1.selectAll(".textdiv").style("display", "none");
                /* added */
                t1.selectAll(".foreignobj").call(foreign);
                /* added */
                t2.selectAll(".textdiv").style("display", "block");
                /* added */
                t2.selectAll(".foreignobj").call(foreign);
                /* added */
                // Remove the old node when the transition is finished.
                t1.on("end.remove", function(){
                    this.remove();
                    transitioning = false;
                })
                console.log(d)
                document.getElementById("violin").innerHTML=""
                content_violin(country_name,d.data.name)
                document.getElementById("rating").innerHTML=""
                content_rating(country_name,d.data.name)
                document.getElementById("selectButton").innerHTML=""
            }
            return g;
        }
        function text(text) {
            text.attr("x", function (d) {
                return x(d.x) + 6;
            })
                .attr("y", function (d) {
                    return y(d.y) + 6;
                });
        }
        function rect(rect) {
            rect
                .attr("x", function (d) {
                    return x(d.x0);
                })
                .attr("y", function (d) {
                    return y(d.y0);
                })
                .attr("width", function (d) {
                    return x(d.x1) - x(d.x0)+10;
                })
                .attr("height", function (d) {
                    return y(d.y1) - y(d.y0);
                })
                .attr("fill", function (d) {
                    return '#bbbbbb';
                });
        }
        function foreign(foreign) { /* added */
            foreign
                .attr("x", function (d) {
                    return x(d.x0);
                })
                .attr("y", function (d) {
                    return y(d.y0);
                })
                .attr("width", function (d) {
                    return x(d.x1) - x(d.x0);
                })
                .attr("height", function (d) {
                    return y(d.y1) - y(d.y0);
                });
        }
        function name(d) {

            return breadcrumbs(d) +
                (d.parent
                ? " -  Click to zoom out"
                : " - Click on a box to zoom in");
        }
        function breadcrumbs(d) {
            
            var res = "";
            var sep = " > ";
            d.ancestors().reverse().forEach(function(i){
                res += i.data.name + sep;
            });
            return res
                .split(sep)
                .filter(function(i){
                    return i!== "";
                })
                .join(sep);
        }
    });
    }



function content_violin(country_name,content_type){
   
    var margin = {top: 10, right: 30, bottom: 0, left: 40},
        width = 420 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    var svg = d3.select("#violin")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom+50)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");


    // Read the data and compute summary statistics for each 
    
        d3.csv("clean_dataset.csv").then( function(data){
            
            if(country_name!="" && content_type=='content_type'){
                var filterdata=data.filter(function(d){
                    if (d['country']==country_name) 
                                { 
                                    return d; 
                                } 
                    
                    });
                    data=filterdata
                }
            else if(country_name!=""&&content_type!=""){
                var filterdata=data.filter(function(d){
                if (d['country']==country_name && d["type"] == content_type) 
                            { 
                                return d; 
                            } 
                
                });
                data=filterdata
            }
            
            else if(country_name!=""){
                var filterdata=data.filter(function(d){
                    if (d['country']==country_name) 
                                { 
                                    return d; 
                                } 
                    
                    });
                    data=filterdata
                }
            
            else if(content_type!=""){
                var filterdata=data.filter(function(d){
                    if ( d["type"] == content_type) 
                                { 
                                    return d; 
                                } 
                    
                    });
                    data=filterdata
                }
                

        // Show the X scale
        var x = d3.scaleBand()
            .range([0, width])
            .domain(['Comedy', 'Family', 'Drama', 'Crime', 'Action', 'Horror', 'Animation'])
            .paddingInner(0)
            .paddingOuter(.5);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // Show the Y scale
        var y = d3.scaleLinear()
            .domain([0,10])
            .range([height, 0]);
        svg.append("g").call(d3.axisLeft(y));

        // Features of density estimate
        var kde = kernelDensityEstimator(kernelEpanechnikov(.2), y.ticks(50));

        // Compute the binning for each group of the dataset
        var sumstat = d3.nest()  
            .key(function (d) {
                return d.genres;
            })
            .rollup(function (d) {   // For each key..
                input = d.map(function (g) {
                    return g.average_rating;
                });
                density = kde(input);   // And compute the binning on it.
                return (density);
            })
            .entries(data);

        var maxNum = 0;
        for (i in sumstat) {
            allBins = sumstat[i].value;
            kdeValues = allBins.map(function (a) {
                return a[1]
            });
            biggest = d3.max(kdeValues);
            if (biggest > maxNum) {
                maxNum = biggest
            }
        }
    
        // The maximum width of a violin must be x.bandwidth = the width dedicated to a group
        var xNum = d3.scaleLinear()
            .range([0, x.bandwidth()])
            .domain([-maxNum, maxNum]);

        svg
            .selectAll("myViolin")
            .data(sumstat)
            .enter()        // So now we are working group per group
            .append("g")
            .attr("transform", function (d) {
                return ("translate(" + x(d.key) + " ,0)")
            })  // Translation on the right to be at the group position
            .append("path")
            .datum(function (d) {
                return (d.value)
            })     // So now we are working density per density
            .style("opacity", .7)
            .style("fill", "#317fc8")
            .attr("d", d3.area()
                .x0(function (d) {
                    return (xNum(-d[1]))
                })
                .x1(function (d) {
                    return (xNum(d[1]))
                })
                .y(function (d) {
                    return (y(d[0]))
                })
                .curve(d3.curveCatmullRom))
                .on("mouseover", function(d) {
                    d3.select(this).transition()
                    .duration('50')
                    .attr('opacity', '.85');})
                
                .on("click", function(d, i){
                    console.log(d)})
        svg.append("text")
                    .attr("class", "x label")
                    .attr("text-anchor", "middle")
                    .attr("x", width)
                    .attr("y", height+30)
                    .text("Genre");
                
        svg.append("text")
                    .attr("class", "y label")
                    .attr("text-anchor", "end")
                    .attr("y",-40)
                    .attr("dy", ".75em")
                    .attr("transform", "rotate(-90)")
                    .text("Average Rating");

    });

    function kernelDensityEstimator(kernel, X) {
        return function (V) {
            return X.map(function (x) {
                return [x, d3.mean(V, function (v) {
                    return kernel(x - v);
                })];
            });
        }
    }

    function kernelEpanechnikov(k) {
        return function (v) {
            return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
        };
    }


}


function content_rating(country_name,content_type){
   
    d3.csv("clean_dataset.csv").then( function(data){
        const allGroup = ["Top Rated", "Low Rated", "Alphabetically"]
        
        d3.select("#selectButton")
          .selectAll('myOptions')
     	  .data(allGroup)
          .enter()
    	  .append('option')
          .text(function (d) { return d; }) // text showed in the menu
          .attr("value", function (d) { return d; }) // corresponding value returned by the button

        if(country_name!="" && content_type=='content_type'){
            var filterdata=data.filter(function(d){
                if (d['country']==country_name) 
                            { 
                                return d; 
                            } 
                
                });
                data=filterdata
            }
        else if(country_name!=""&&content_type!=""){
            var filterdata=data.filter(function(d){
            if (d['country']==country_name && d["type"] == content_type) 
                        { 
                            return d; 
                        } 
            
            });
            data=filterdata
        }
        
        else if(country_name!=""){
            var filterdata=data.filter(function(d){
                if (d['country']==country_name) 
                            { 
                                return d; 
                            } 
                
                });
                data=filterdata
            }
        
        else if(content_type!=""){
            var filterdata=data.filter(function(d){
                if ( d["type"] == content_type) 
                            { 
                                return d; 
                            } 
                
                });
                data=filterdata
            }
        var x = d3.scaleLinear()
            .domain([0,d3.max(data, d => d.average_rating)]).nice()
            .range([0, 520]);
            data.sort((a,b) => {
                return d3.descending(a.average_rating, b.average_rating)
              })
              data=data
              
        d3.select("#rating")
          .selectAll("div")
            .data(data)
          .enter().append("div")
            .style("width", function(d) { return x(d.average_rating) + "px"; })
            .text(function(d) { return "Title: "+d.title+"\xa0\xa0\xa0\xa0\xa0"+"Rating: "+d.average_rating+" \xa0\xa0\xa0\xa0\xa0"+"Runtime: "+ d.runtime+"mins"; })




    function update(selectedGroup) {
             
    if(selectedGroup=="Low Rated"){
        
        data.sort((a,b) => {
            return d3.ascending(a.average_rating, b.average_rating)
          })
          data=data
    }
    else if (selectedGroup == "Alphabetically") {
        data.sort((a,b) => {
          return d3.ascending(a.title, b.title)
        })
    }
    else{
    
        data.sort((a,b) => {
            return d3.descending(a.average_rating, b.average_rating)
          })
          data=data
        }
        
        var x = d3.scaleLinear()
        .domain([0,d3.max(data, d => d.average_rating)]).nice()
        .range([0, 520]);
    d3.select("#rating")
      .selectAll("div")
        .data(data)
      .enter().append("div")
        .style("width", function(d) { return x(d.average_rating) + "px"; })
        .text(function(d) { return "Title: "+d.title+"\xa0\xa0\xa0\xa0\xa0"+"Rating: "+d.average_rating+" \xa0\xa0\xa0\xa0\xa0"+"Runtime: "+ d.runtime+"mins"; })

    }
        d3.select("#selectButton").on("change", function(event,d) {
            // recover the option that has been chosen
            const selectedOption = d3.select(this).property("value")
            document.getElementById("rating").innerHTML=""
            // run the updateChart function with this selected option
            update(selectedOption)
        })
       
    })}
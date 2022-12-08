d3.json("output.geojson").then(function(themap){
    d3.csv("clean_dataset.csv").then(function(dataset){
    
      

       
        var svg=d3.select("svg")
        .style("width",700)
        .style("height",400)
		
        var projection=d3.geoEqualEarth() //geoMercator geoEqualEarth
                        .fitWidth(700,{type:"Sphere"})
        var pathGenerator=d3.geoPath(projection)       
        var sea=svg.append("path")
                    .attr("d",pathGenerator({type:"Sphere"}))
                    .attr("fill","lightblue")

        var headers = ["0", "10", "100", "500", "1000","2000"];
        var popPerCountry={
    
        }
        var countryname={}
        var countrypop={}
        var recovPerCountry = {}
        var deathspercountry = {}
        var countries1 = {}
       
        
            

        
            //console.log(country)
            arr=[]
            for(var i=0; i<dataset.length;i++){
                arr.push(dataset[i].country);
            }
            //const map = arr.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
            //console.info(map)
            result = { };
            for(var i = 0; i < arr.length; ++i) {
                if(!result[arr[i]])
                    result[arr[i]] = 0;
                ++result[arr[i]];
            }
            //console.log(result)
            for(var key in result) {
                //console.log(key + " : " + result[key]);
                popPerCountry[key]=result[key]
                countryname[key]=key
             }
             
           
    
        var colorScale=d3.scaleLinear()
                        //.domain([0,0.1*d3.max(Object.values(popPerCountry)),d3.max(Object.values(popPerCountry))])
                        .domain(["0", "10", "100", "500", "1000","2000"])
                        .range(d3.schemeReds[8])
                        let mouseOver = function(d) {
                            d3.selectAll(".Country")
                              .transition()
                              .duration(300)
                              .style("opacity", .5)
                            d3.select(this)
                              .transition()
                              .duration(200)
                              .style("opacity", 1)
                              .style("stroke", "black")
                          }
                        
                          let mouseLeave = function(d) {
                            d3.selectAll(".Country")
                              .transition()
                              .duration(200)
                              .style("opacity", 0.8)
                              .style("stroke", "transparent")
                            d3.select(this)
                              .transition()
                              .duration(200)
                              
                          }

        var countries=svg.append("g")
                            .selectAll("path")
                            .data(themap.features)
                            .enter()
                            .append("path")
                            .attr("d",d=>{return pathGenerator(d)})
                            .style("fill",d=>{
                                //console.log(popPerCountry[d.properties.ADM0_A3])
                                return colorScale(popPerCountry[d.properties.SUBUNIT])
    
                            })
                            //.style("stroke","white")
                            .style("stroke", "transparent")
                            .attr("class", function(d){ return "Country" } )
                            .style("opacity", .8)
                            .on("mouseover", mouseOver )
                            .on("mouseleave", mouseLeave )

                            .on("click", function(d, i){
                                document.getElementById("chart").innerHTML=""
                                content_type(countryname[d.properties.SUBUNIT])
                                document.getElementById("violin").innerHTML=""
                                content_violin(countryname[d.properties.SUBUNIT],'')
                                document.getElementById("rating").innerHTML=""
                                content_rating(countryname[d.properties.SUBUNIT],'')
                                document.getElementById("details").innerHTML="Country: "+countryname[d.properties.SUBUNIT]+","+"releases: "+popPerCountry[d.properties.SUBUNIT]
                            })
                var legend = svg.selectAll(".legend")
                .data(headers.slice().reverse())
                .enter().append("g")
                .attr("class", "legend")
                .attr("transform", function(d, i) { return "translate(-20," + i * 20 + ")"; });
                               
                legend.append("rect")
                        .attr("x", 710)
                        .attr("width", 25)
                        .attr("height", 25)
                        .style("fill", colorScale);
                            
                legend.append("text")
                        .attr("x", 700)
                        .attr("y", 18)
                        .style("text-anchor", "end")
                        .text(function(d) { return d;  });
                     
     })

 })

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
    finaldata["name"]="content_type"
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
                content_rating(country_name,d.data.name);;
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
   
    var margin = {top: 10, right: 30, bottom: 30, left: 40},
        width = 420 - margin.left - margin.right,
        height = 350 - margin.top - margin.bottom;

    var svg = d3.select("#violin")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom+100)
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
        .text(function(d) { return d.title+"  "+d.average_rating; })
        
    
       
    })}
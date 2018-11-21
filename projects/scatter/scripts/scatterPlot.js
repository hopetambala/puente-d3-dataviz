

d3.csv("data/puente.csv", function(data) {
    // Convert strings to numbers.
    // parse the date / time
    //var parseTime = d3.timeParse("%m/%d/%y");
    data.forEach(function(d) {
        //if (error) throw error;
        //if(error){
            //console.log(error);
        //}
        
        d.trashPickUpFrequency = +d.trashPickUpFrequency;
        //d.dob = parseTime(d.dob);
        d.dob = new Date(d.dob);
        
       

    });

    // set the dimensions and margins of the graph
    var margin = {top: 20, right: 20, bottom: 100, left: 50},
    width = 960 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svgMain = d3.select("body")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // set the ranges
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // Scale the range of the data
    x.domain([new Date('8/20/1940'),new Date('8/20/2018')]);
    y.domain([0, d3.max(data, function(d) { return d.trashPickUpFrequency; })]);

    // Define the div for the tooltip
    var div = d3.select("#tooltip")  //gets attribute from index.html
        .attr("class", "tooltip")
        .style("opacity", 0);
    
    // Add the scatterplot
    svgMain.selectAll("dot")
        .data(data)
        .enter().append("circle")
            .attr("r", 5)
            .attr("cx", function(d) { return x(new Date(d.dob)); })
            .attr("cy", function(d) { return y(d.trashPickUpFrequency); })
            .on("mouseover", function(d) {
                div.transition()
                    .duration(200)
                    //.style("opacity", .9);
                    .style("opacity", 200);
                div.html('<p>' + d.firstName +" "+ d.lastName + '</p>' +
                    "<br/>Date of Birth: " + d.dob +
                    "<br/>Education Level: " + d.educationLevel)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px")
                })
            .on("mouseout", function(d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });;

    // Add the X Axis
    svgMain.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x)
        //.tickFormat(d3.timeFormat("%m/%d/%y")) //<== insert the tickFormat function
        .tickFormat(d3.timeFormat("%m/%d/%y")) //<== insert the tickFormat function
        )
                //.ticks(d3.timeYear.every(1)));
    
    // Add X-Axis label 
    svgMain.append("text")             
    .attr("transform",
            "translate(" + (width/2) + " ," + 
                        (height + margin.top+15) + ")")
    
    .style("text-anchor", "middle")
    .text("Date of Birth");

    // Add the Y Axis
    svgMain.append("g")
        .call(d3.axisLeft(y)
            //.ticks(1)
        )
    // Add Y-Axis label
    svgMain.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Trash Pickup Frequency");  
    
});

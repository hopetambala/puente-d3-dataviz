

d3.csv("data/puente.csv", function(data) {
    // Convert strings to numbers.
    // parse the date / time
    var parseTime = d3.timeParse("%m/%d/%y");
    data.forEach(function(d) {
        //if (error) throw error;
        //if(error){
            //console.log(error);
        //}
        /*
        if (d.trashPickUpFrequency == 'null'|| d.trashPickUpFrequency == ''){
            d.trashPickUpFrequency = 0;
        }*/
        /*
        if(d.dob =''){
            d.dob = parseTime("2018-1-1")
        }*/

        //else{
            d.trashPickUpFrequency = +d.trashPickUpFrequency;
            d.dob = parseTime(d.dob);
            //d.dob = new Date(d.dob);
        //}
       

    });

    // set the dimensions and margins of the graph
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

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
    x.domain(d3.extent(data, function(d) { return d.dob; }));
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
            .attr("cx", function(d) { return x(d.dob); })
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
        .call(d3.axisBottom(x))
            //.tickFormat(d3.timeFormat("%y"))
            //    .ticks(d3.timeYear.every(1)));


    // Add the Y Axis
    svgMain.append("g")
        .call(d3.axisLeft(y));
    
    /*
    // Scale the range of the data
    var y = d3.scaleLinear()
        //.domain([0, 2017]) //There's some values assigned to 0 from data
        .domain([6.5, 0])
        .range([ height, 0 ]); */

    /*
    // Create Canvass
    var chart = d3.select('body')
    	.append('svg:svg')
            .attr('width', svgWidth)
            .attr('height', svgHeight)
            .attr('class', 'chart') */
    /*
    // Create and add chart to canvas
    var main = chart
        .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
            .attr('width', width)
            .attr('height', height)
            .attr('class', 'main') */

    /*
    // Draw the x axis
    var xAxis = d3.axisBottom()
    	.scale(x)

    // Add x axis to canvas
    main.append('g')
    	.attr('transform', 'translate(0,' + heightXAxis + ')')
    	.call(xAxis);

    // Create the y axis
    var yAxis = d3.axisLeft()
        .scale(y)
        .ticks(20)
        //.tickFormat(function(d) {return 1970 - Math.floor(Math.pow(Math.exp(1), d));});

    // Add y axis to canvas
    main.append('g')
    	.attr('transform', 'translate(0,0)')
    	.attr('class', 'main axis date')
        .attr('x',0)
        .attr('y',5)
        .attr('dy','.71em')
        .call(yAxis)

    var gLinks = main
        .append('g')
            .attr('class', 'link')
                    // .attr("transform", "translate(" + margin_left + "," +  20 + ")");

    var g = main.append("svg:g");

    // Define the div for the tooltip
    var div = d3.select("#tooltip")  //gets attribute from index.html
        .attr("class", "tooltip")
        .style("opacity", 0);


    // Add the scatterplot
    scatters = g.selectAll("scatter-dots")
                .data(data)
                .enter().append("circle")
                    .attr('class', function(d) {return 'reference ' + d.language})
                    // .attr("cx", function (d) { return brushXConverter(d.page); } )
                    .attr("cx", function (d) { return brushXConverter(d.avgPos); } )

                    .attr("cy", function (d) { return y(d.dateLog); } )
                    .attr("r", 8)
                    // .style("fill", function(d) { return color(cValue(d));})


                .on("mouseover", function(d) {
                    div.transition()
                        .duration(200)
                        //.style("opacity", .9);
                        .style("opacity", 200);
                    div.html('<p>' + d.bookTitle + '</p>' +
                        "<br/>Author: " + d.author +
                        "<br/>Publication Year: " + d.date +
                        "<br/>Reference Type: " +
                        d.ref_type)
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px")
                    })
                .on("mouseout", function(d) {
                    div.transition()
                        .duration(500)
                        .style("opacity", 0);
                });

    //Add the links
    links = gLinks.selectAll('.link')
                    .data(data)
                    .enter().append('line')
                    .attr('class', 'link')
                    .attr('x1', function (d) { return brushXConverter(d.avgPos); }) // the x of scatter will change (maybe p.avePage)
                    .attr('y1', function (d) { return y(d.dateLog) < height ? y(d.dateLog) : height ; })
                    .attr('x2', function (d) { return brushXConverter(d.page); })
                    .attr('y2', (d) => height)
                    .attr('stroke-width', '0.4')
                    .attr('stroke','#CCC')


    drawPages();
    gBrush.call(brush);
    gBrush.call(brush.move, [0, pageGroupWidth]); */
});

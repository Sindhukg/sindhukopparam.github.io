var margin = {top: 20, right: 20, bottom: 110, left: 150},
    margin2 = {top: 330, right: 20, bottom: 30, left: 150},
    width = 1400 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom,
    height2 = 400 - margin2.top - margin2.bottom;

function displayChart(data){

  d3.selectAll('svg').remove();

  // append the svg object to the body of the page

  var svg = d3.select("#my_dataviz")
      .append("svg")
          .attr("width", 1400)
          .attr("height", 400);

  // Add X axis --> it is a date format

  var x = d3.scaleTime().range([0, width]),
    x2 = d3.scaleTime().range([0, width]),
    y = d3.scaleLinear().range([height, 0]),
    y2 = d3.scaleLinear().range([height2, 0]);

  var xAxis = d3.axisBottom(x)
                .ticks(10)
                .tickPadding(10)
                .tickFormat(d3.timeFormat("%m/%d/%y"));

  var xAxis2 = d3.axisBottom(x)
                .ticks(10)
                .tickPadding(10)
                .tickFormat(d3.timeFormat("%m/%d/%y"));

  var yAxis = d3.axisLeft(y)
                .tickPadding(10)
                .tickFormat(d3.format("~s"));

  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d) { return d.deaths; })]);
  x2.domain(x.domain());
  y2.domain(y.domain());

  /////
  focus.append("path")
    .datum(data)
    .attr("class", "area")
    .attr("d", area);

  focus.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  focus.append("g")
    .attr("class", "axis axis--y")
    .call(yAxis)
    .append('text')
        .attr('class', 'axis-label')
        .attr('y', -60)
        .attr('x', -height / 2)
        .attr('fill', 'black')
        .attr('transform', `rotate(-90)`)
        .attr('text-anchor', 'middle')
        .text('Cases');

  context.append("path")
    .datum(data)
    .attr("class", "area")
    .attr("d", area2);

  context.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height2 + ")")
    .call(xAxis2);

  context.append("g")
    .attr("class", "brush")
    .call(brush)
    .call(brush.move, x.range());

  svg.append("rect")
    .attr("class", "zoom")
    .attr("width", width)
    .attr("height", height)
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .call(zoom);

  /////
  const bounds = svg.append("g").attr("transform","translate(" + margin.left + "," + margin.top + ")");
  const listeningRect = bounds
    .append("rect")
    .attr("class", "listening-rect")
    .attr("width", width)
    .attr("height", height)
    .on("mousemove", onMouseMove)
    .on("mousemover", onMouseMove)
    .on("mouseleave", onMouseLeave);

  const tooltipLine = bounds
    .append("g")
    .append("rect")
    .attr("class", "dotted")
    .attr("stroke-width", "1px")
    .attr("width", ".5px")
    .attr("height", height);

  const dateParser = d3.timeFormat("%-m/%-d/%y");
  ////

    function onMouseMove(){
      const mousePosition = d3.mouse(this);
      const hoveredDate = x.invert(mousePosition[0]);

      const closestIndex = data.findIndex(d => dateParser(d.date)===dateParser(hoveredDate));
      const closestDataPoint = data[closestIndex];

      const closestXValue = closestDataPoint.date;
      const closestYValue = data[closestIndex].cases;
      const closestZValue = closestDataPoint.deaths;

      //const formatDate = d3.timeFormat("%B %A %-d, %Y");
      const formatDate = d3.timeFormat("%-m/%-d/%y");

      tooltip.select("#date").text(formatDate(closestXValue));
      tooltip.select("#cases").html(closestYValue);
      tooltip.select("#deaths").html(closestZValue);

      tooltip.style("left", (d3.event.pageX-55) + "px")
              .style("top", (d3.event.pageY+10) + "px")


      tooltip.style("opacity", 1);
      tooltipLine.style("opacity", 1);

      //tooltipCircle
      //  .attr("cx", x(closestXValue))
      //  .attr("cy", y(closestYValue))
      //  .style("opacity", 1);

      tooltipLine.attr("x", x(closestXValue));

    };

    function onMouseLeave(){
      tooltip.style("opacity", 0);
//      tooltipCircle.style("opacity", 0);
      tooltipLine.style("opacity", 0);
    };

  const tooltip = d3.select("#tooltip");
  //const tooltipCircle = svg.append("g")
  //    .append("circle")
  //    .attr("class", "tooltip-circle")
  //    .attr("r", 6)
  //    .attr("stroke", "red")
  //    .attr("fill", "white")
  //    .attr("stroke-width", 3)
  //    .style("opacity", 0);
/////

};



export {displayChart};

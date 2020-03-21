//https://d3js.org/d3.v4.min.js
var margin = margin = {top: -5, right: -5, bottom: -5, left: -5}
    width = 1200 - margin.left - margin.right,
    height = 1200 - margin.top - margin.bottom,
    radius = Math.min(width, height) / 2 - 30;
		var coords = [];
		var clickPos = {};
console.log("radius = " + radius);
var padding = 20;

// Define the div for the tooltip
var div = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);

function zoomed() {
  //both forms works
  //container.attr("transform", d3.event.transform);
  //container2.attr("transform", d3.event.transform);
    container.attr('transform', `translate(${d3.event.transform.x},  	 ${d3.event.transform.y}) scale(${d3.event.transform.k})`);
    container2.attr('transform', `translate(${d3.event.transform.x},  	 ${d3.event.transform.y}) scale(${d3.event.transform.k})`);  
  
  container2.selectAll('circle')
  .attr('transform', function(d) {
    var coors = line([d]).slice(1).slice(0, -1); 
    return 'translate(' + coors + ')'
  })
  .attr('r', function(d) {
    //var transform = d3.zoomTransform(container2);
    //console.log('transform.x: ' + transform.x)
    return 0.2;
  });  
}

var zoom = d3.zoom()
    //.center([width / 2, height / 2])
    .scaleExtent([1, 100])
    .on("zoom", zoomed);


var svg = d3.select("#div_svg").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.right + ")")
.call(zoom)
    		/*.on("mousedown",function(){	
    			clickPos = {"x1" : d3.mouse(this)[0], "y1": d3.mouse(this)[1]}; 
    		})
    		.on("mouseup", function(){
    			coords.push({"x1":clickPos.x1,"y1":clickPos.y1,"x2":d3.mouse(this)[0],"y2":d3.mouse(this)[1]});
    			update();
    		})*/;

var rect = svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .style("fill", "white")
    .style("pointer-events", "all");
// radius of the whole chart
var r = d3.scaleLinear()
    .domain([0, radius])
    .range([0, radius]);

var r2 = d3.scaleLinear()
    .domain([0, radius])
    .range([0, radius/5]);
var container = svg.append("g");

var brush = d3.brush().extent([[0, 0], [width, height]]).on("end", brushended);
var disk_ref = {
	'XD_16':[100, 150],
	'XD_15':[100, 250], 
	'XC_16':[100, 350], 
	'XC_15':[100, 450],
	'XB_16':[100, 550],
	'XB_15':[100, 650], 
	'XA_20':[100, 750], 
	'XA_19':[100, 850],
	
	'XD_14':[187, 100],
	'XD_13':[187, 200], 
	'XC_14':[187, 300], 
	'XC_13':[187, 400],
	'XB_14':[187, 500],
	'XB_13':[187, 600], 
	'XA_17':[187, 700], 
	'XA_16':[187, 800],
	'XA_18':[187, 900],
	
	'XD_12':[274, 150],
	'XD_11':[274, 250], 
	'XC_12':[274, 350], 
	'XC_11':[274, 450],
	'XB_12':[274, 550],
	'XB_11':[274, 650], 
	'XA_15':[274, 750], 
	'XA_14':[274, 850],	
 
	'XD_10':[361, 100],
	'XD_9':[361, 200], 
	'XC_10':[361, 300], 
	'XC_9':[361, 400],
	'XB_10':[361, 500],
	'XB_9':[361, 600], 
	'XA_12':[361, 700], 
	'XA_11':[361, 800],
	'XA_13':[361, 900], 
	
	'XD_8':[448, 150],
	'XD_7':[448, 250], 
	'XC_8':[448, 350], 
	'XC_7':[448, 450],
	'XB_8':[448, 550],
	'XB_7':[448, 650], 
	'XA_10':[448, 750], 
	'XA_9':[448, 850],		

	'XD_6':[535, 100],
	'XD_5':[535, 200], 
	'XC_6':[535, 300], 
	'XC_5':[535, 400],
	'XB_6':[535, 500],
	'XB_5':[535, 600], 
	'XA_7':[535, 700], 
	'XA_6':[535, 800],
	'XA_8':[535, 900],           
 
	'XD_4':[622, 150],
	'XD_3':[622, 250], 
	'XC_4':[622, 350], 
	'XC_3':[622, 450],
	'XB_4':[622, 550],
	'XB_3':[622, 650], 
	'XA_5':[622, 750], 
	'XA_4':[622, 850], 
 
	'XD_2':[709, 100],
	'XD_1':[709, 200], 
	'XC_2':[709, 300], 
	'XC_1':[709, 400],
	'XB_2':[709, 500],
	'XB_1':[709, 600], 
	'XA_2':[709, 700], 
	'XA_1':[709, 800],
	'XA_3':[709, 900]
};

container.append("g")    
    .selectAll("circle")
    .data([[100, 150, 50, 'disk_present_XD_back'], [100, 250, 50, 'disk_present_XD_back'], [100, 350, 50, 'disk_present_XC_back'], [100, 450, 50, 'disk_present_XC_back'], [100, 550, 50, 'disk_present_XB_back'], [100, 650, 50, 'disk_present_XB_back'], [100,750, 50, 'disk_present_XA_back'], [100, 850, 50, 'disk_present_XA_back'], [100, 150, 20, 'disk_present_XD_back'], [100, 250, 20, 'disk_present_XD_back'], [100, 350, 20, 'disk_present_XC_back'], [100, 450, 20, 'disk_present_XC_back'], [100, 550, 20, 'disk_present_XB_back'], [100, 650, 20, 'disk_present_XB_back'], [100,750, 20, 'disk_present_XA_back'], [100, 850, 20, 'disk_present_XA_back'],          

           [187, 100, 50, 'disk_present_XD_back'], [187, 200, 50, 'disk_present_XD_back'], [187, 300, 50, 'disk_present_XC_back'], [187, 400, 50, 'disk_present_XC_back'], [187, 500, 50, 'disk_present_XB_back'], [187, 600, 50, 'disk_present_XB_back'], [187,700, 50, 'disk_present_XA_back'], [187, 800, 50, 'disk_present_XA_back'], [187, 900, 50, 'disk_present_XA_back'],[187, 100, 20, 'disk_present_XD_back'], [187, 200, 20, 'disk_present_XD_back'], [187, 300, 20, 'disk_present_XC_back'], [187, 400, 20, 'disk_present_XC_back'], [187, 500, 20, 'disk_present_XB_back'], [187, 600, 20, 'disk_present_XB_back'], [187,700, 20, 'disk_present_XA_back'], [187, 800, 20, 'disk_present_XA_back'],  [187, 900, 20, 'disk_present_XA_back'],
           
[274, 150, 50, 'disk_present_XD_back'], [274, 250, 50, 'disk_present_XD_back'], [274, 350, 50, 'disk_present_XC_back'], [274, 450, 50, 'disk_present_XC_back'], [274, 550, 50, 'disk_present_XB_back'], [274, 650, 50, 'disk_present_XB_back'], [274,750, 50, 'disk_present_XA_back'], [274, 850, 50, 'disk_present_XA_back'], [274, 150, 20, 'disk_present_XD_back'], [274, 250, 20, 'disk_present_XD_back'], [274, 350, 20, 'disk_present_XC_back'], [274, 450, 20, 'disk_present_XC_back'], [274, 550, 20, 'disk_present_XB_back'], [274, 650, 20, 'disk_present_XB_back'], [274,750, 20, 'disk_present_XA_back'], [274, 850, 20, 'disk_present_XA_back'],  

[360, 100, 50, 'disk_present_XD_back'], [360, 200, 50, 'disk_present_XD_back'], [360, 300, 50, 'disk_present_XC_back'], [360, 400, 50, 'disk_present_XC_back'], [360, 500, 50, 'disk_present_XB_back'], [360, 600, 50, 'disk_present_XB_back'], [360,700, 50, 'disk_present_XA_back'], [360, 800, 50, 'disk_present_XA_back'], [360, 900, 50, 'disk_present_XA_back'],[360, 100, 20, 'disk_present_XD_back'], [360, 200, 20, 'disk_present_XD_back'], [360, 300, 20, 'disk_present_XC_back'], [360, 400, 20, 'disk_present_XC_back'], [360, 500, 20, 'disk_present_XB_back'], [360, 600, 20, 'disk_present_XB_back'], [360,700, 20, 'disk_present_XA_back'], [360, 800, 20, 'disk_present_XA_back'],  [360, 900, 20, 'disk_present_XA_back'], 
           
[448, 150, 50, 'disk_present_XD_front'], [448, 250, 50, 'disk_present_XD_front'], [448, 350, 50, 'disk_present_XC_front'], [448, 450, 50, 'disk_present_XC_front'], [448, 550, 50, 'disk_present_XB_front'], [448, 650, 50, 'disk_present_XB_front'], [448,750, 50, 'disk_present_XA_front'], [448, 850, 50, 'disk_present_XA_front'], [448, 150, 20, 'disk_present_XD_front'], [448, 250, 20, 'disk_present_XD_front'], [448, 350, 20, 'disk_present_XC_front'], [448, 450, 20, 'disk_present_XC_front'], [448, 550, 20, 'disk_present_XB_front'], [448, 650, 20, 'disk_present_XB_front'], [448,750, 20, 'disk_present_XA_front'], [448, 850, 20, 'disk_present_XA_front'],   
           
[535, 100, 50, 'disk_present_XD_front'], [535, 200, 50, 'disk_present_XD_front'], [535, 300, 50, 'disk_present_XC_front'], [535, 400, 50, 'disk_present_XC_front'], [535, 500, 50, 'disk_present_XB_front'], [535, 600, 50, 'disk_present_XB_front'], [535,700, 50, 'disk_present_XA_front'], [535, 800, 50, 'disk_present_XA_front'], [535, 900, 50, 'disk_present_XA_front'],[535, 100, 20, 'disk_present_XD_front'], [535, 200, 20, 'disk_present_XD_front'], [535, 300, 20, 'disk_present_XC_front'], [535, 400, 20, 'disk_present_XC_front'], [535, 500, 20, 'disk_present_XB_front'], [535, 600, 20, 'disk_present_XB_front'], [535,700, 20, 'disk_present_XA_front'], [535, 800, 20, 'disk_present_XA_front'],  [535, 900, 20, 'disk_present_XA_front'],  
 
[622, 150, 50, 'disk_present_XD_front'], [622, 250, 50, 'disk_present_XD_front'], [622, 350, 50, 'disk_present_XC_front'], [622, 450, 50, 'disk_present_XC_front'], [622, 550, 50, 'disk_present_XB_front'], [622, 650, 50, 'disk_present_XB_front'], [622,750, 50, 'disk_present_XA_front'], [622, 850, 50, 'disk_present_XA_front'], [622, 150, 20, 'disk_present_XD_front'], [622, 250, 20, 'disk_present_XD_front'], [622, 350, 20, 'disk_present_XC_front'], [622, 450, 20, 'disk_present_XC_front'], [622, 550, 20, 'disk_present_XB_front'], [622, 650, 20, 'disk_present_XB_front'], [622,750, 20, 'disk_present_XA_front'], [622, 850, 20, 'disk_present_XA_front'],   
           
[709, 100, 50, 'disk_present_XD_front'], [709, 200, 50, 'disk_present_XD_front'], [709, 300, 50, 'disk_present_XC_front'], [709, 400, 50, 'disk_present_XC_front'], [709, 500, 50, 'disk_present_XB_front'], [709, 600, 50, 'disk_present_XB_front'], [709,700, 50, 'disk_present_XA_front'], [709, 800, 50, 'disk_present_XA_front'], [709, 900, 50, 'disk_present_XA_front'],[709, 100, 20, 'disk_present_XD_front'], [709, 200, 20, 'disk_present_XD_front'], [709, 300, 20, 'disk_present_XC_front'], [709, 400, 20, 'disk_present_XC_front'], [709, 500, 20, 'disk_present_XB_front'], [709, 600, 20, 'disk_present_XB_front'], [709,700, 20, 'disk_present_XA_front'], [709, 800, 20, 'disk_present_XA_front'],  [709, 900, 20, 'disk_present_XA_front'] 
            
          ])
    .enter().append("circle")
    .attr("class", function(d, i){return d[3];})
    .attr("cx", function(d, i) { return d[1]; })
    .attr("cy",  function(d, i) { return d[0]; })
    .attr("r", function(d, i) { return d[2]; });

container.selectAll('text')
  .data([['16', 72, 105], ['15', 122, 105], ['16', 172, 105], ['15', 222, 105], ['16', 272, 105], ['15', 322, 105], ['20', 372, 105], ['19', 422, 105],
         
['14', 46, 192], ['13', 96, 192], ['14', 146, 192], ['13', 196, 192], ['14', 246, 192], ['13', 296, 192], ['17', 346, 192], ['16', 396, 192], ['19', 446, 192],     

['12', 72, 278], ['11', 122, 278], ['12', 172, 278], ['11', 222, 278], ['12', 272, 278], ['11', 322, 278], ['15', 372, 278], ['14', 422, 278],
 
['10', 47, 366], ['9', 99, 366], ['10', 147, 366], ['9', 199, 366], ['10', 247, 366], ['9', 299, 366], ['12', 347, 366], ['11', 397, 366], ['13', 447, 366],  

['8', 74, 453], ['7', 124, 453], ['8', 174, 453], ['7', 224, 453], ['8', 274, 453], ['7', 324, 453], ['10', 372, 453], ['9', 424, 453],

['6', 49, 540], ['5', 99, 540], ['6', 149, 540], ['5', 199, 540], ['6', 249, 540], ['5', 299, 540], ['7', 349, 540], ['6', 399, 540], ['8', 449, 540],     

['4', 74, 627], ['3', 124, 627], ['4', 174, 627], ['3', 224, 627], ['4', 274, 627], ['3', 324, 627], ['5', 374, 627], ['4', 424, 627],
         
['2', 49, 714], ['1', 99, 714], ['2', 149, 714], ['1', 199, 714], ['2', 249, 714], ['1', 299, 714], ['2', 349, 714], ['1', 399, 714], ['3', 449, 714],          
        ])
  .enter()
  .append("text")    
    .attr("transform", function(d){return "translate("+d[1]+","+d[2]+")"})
    .attr("dx", function(d) { return d[1]; })
    .style("font-size", "12px")
    .style("fill", "#004669")
    .style("font-weight", "bold")
    .text(function(d){return d[0]});

container.append("line")
    .style("stroke", "#aaa")  // colour the line
    .attr("x1", 20)     // x position of the first end of the line
    .attr("y1", 780)      // y position of the first end of the line
    .attr("x2", 970)     // x position of the second end of the line
    .attr("y2", 780);    // y position of the second end of the line

container.append("g").selectAll('text')
  .data([['A1', 490, 525, 450, 'disk_present_XA_front'], ['A2', 225, 525, 450, 'disk_present_XB_front'], ['A3', 25, 525, 450, 'disk_present_XC_front'], ['A4', -185, 525, 450, 'disk_present_XD_front']])
  .enter()
  .append("text")    
    .attr("transform", function(d){return "translate("+d[1]+","+d[2]+") rotate(45)"})
    .attr("dx", function(d){return d[3]})
    .attr("class", function(d, i){return d[4];})
    //.style("font-size", "15px")
    //.style("fill", "#004669")
    //.style("font-weight", "bold")
    .text(function(d){return d[0]});
container.append("line")
    .style("stroke", "#ff0000")  // colour the line
    .style("stroke-dasharray", ("5, 5"))
    .attr("x1", 20)     // x position of the first end of the line
    .attr("y1", 404)      // y position of the first end of the line
    .attr("x2", 970)     // x position of the second end of the line
    .attr("y2", 404);    // y position of the second end of the line

container.append("line")
    .style("stroke", "#aaa")  // colour the line
    .attr("x1", 20)     // x position of the first end of the line
    .attr("y1", 20)      // y position of the first end of the line
    .attr("x2", 970)     // x position of the second end of the line
    .attr("y2", 20);    // y position of the second end of the line

container.append("line")
    .style("stroke", "#aaa")  // colour the line
    .attr("x1", 20)     // x position of the first end of the line
    .attr("y1", 20)      // y position of the first end of the line
    .attr("x2", 20)     // x position of the second end of the line
    .attr("y2", 780);    // y position of the second end of the line

container.append("line")
    .style("stroke", "#aaa")  // colour the line
    .attr("x1", 970)     // x position of the first end of the line
    .attr("y1", 20)      // y position of the first end of the line
    .attr("x2", 970)     // x position of the second end of the line
    .attr("y2", 780);    // y position of the second end of the 

container.append("g").selectAll('text')
  .data([['Front', 745, 315, 400], ['Back', 745,-65, 400]])
  .enter()
  .append("text")    
    .attr("transform", function(d){return "translate("+d[1]+","+d[2]+") rotate(45)"})
    .attr("dx", function(d){return d[3]})
    .style("font-size", "15px")
    .style("fill", "#004669")
    .style("font-weight", "bold")
    .text(function(d){return d[0]});

var container2= svg.append("g");
var line = d3.lineRadial()
    .radius(function(d) {
      return r(d[1]);
    })
    .angle(function(d) {
      return d[0] * Math.PI / 180;
    });

/*var pts = container.selectAll('point')
  .data([[]])//[[290, 48, 100, 150, 'chip 2'], [180, 20, 100, 150, 'chip 2'], [120, 48, 100, 250, 'chip 2'], [90, 20, 100, 250, 'chip 2'], [200, 48, 100, 350, 'chip 2'], [20, 20, 100, 350, 'chip 2'], [22, 48, 190, 100, 'chip 2'], [120, 48, 730, 100, 'chip 2'], [90, 20, 730, 100, 'chip 2'], [30, 48, 730, 900, 'chip 2'], [270, 20, 730, 900, 'chip 2']])
  .enter()
  .append('circle')
  .attr("cx", function(d){ return d[3];})
  .attr("cy", function(d){ return d[2];})
  .attr('class', 'point')
  .attr('transform', function(d) {
    var coors = line([d]).slice(1).slice(0, -1); 
    return "translate(" + coors + ")";
  })
  .attr('r', 2)
  .attr('fill',function(d,i){
    return 'red';
  })
  .on("mouseover", function(d) {		
      div.transition()		
        .duration(200)		
        .style("opacity", .9);		
      div	.html(d[4])//"angle: " + d[5] + '<br />' + ' radius: ' + d[6])	
        .style("left", (d3.event.pageX) + "px")		
        .style("top", (d3.event.pageY - 28) + "px");	
  })					
  .on("mouseout", function(d) {		
      div.transition()		
        .duration(500)		
        .style("opacity", 0);	
  });
*/


		//returns path string d for <path d="This string">
		//a curly brace between x1,y1 and x2,y2, w pixels wide 
		//and q factor, .5 is normal, higher q = more expressive bracket 
		function makeCurlyBrace(x1,y1,x2,y2,w,q)
		{
			//Calculate unit vector
			var dx = x1-x2;
			var dy = y1-y2;
			var len = Math.sqrt(dx*dx + dy*dy);
			dx = dx / len;
			dy = dy / len;

			//Calculate Control Points of path,
			var qx1 = x1 + q*w*dy;
			var qy1 = y1 - q*w*dx;
			var qx2 = (x1 - .25*len*dx) + (1-q)*w*dy;
			var qy2 = (y1 - .25*len*dy) - (1-q)*w*dx;
			var tx1 = (x1 -  .5*len*dx) + w*dy;
			var ty1 = (y1 -  .5*len*dy) - w*dx;
			var qx3 = x2 + q*w*dy;
			var qy3 = y2 - q*w*dx;
			var qx4 = (x1 - .75*len*dx) + (1-q)*w*dy;
			var qy4 = (y1 - .75*len*dy) - (1-q)*w*dx;

    	return ( "M " +  x1 + " " +  y1 +
         		" Q " + qx1 + " " + qy1 + " " + qx2 + " " + qy2 + 
          		" T " + tx1 + " " + ty1 +
          		" M " +  x2 + " " +  y2 +
          		" Q " + qx3 + " " + qy3 + " " + qx4 + " " + qy4 + 
          		" T " + tx1 + " " + ty1 );
		}

		function update()
    		{
    			var bracket = d3.select("svg").selectAll("path").attr("class","curlyBrace").data(coords);
    			
    			bracket.enter().append("path").attr("class","curlyBrace");
    			bracket.attr("d", function(d) { return makeCurlyBrace(d.x1,d.y1,d.x2,d.y2,50,0.6); });
    			bracket.exit().remove();
    			    
    			coords.shift();
    		}		
var bracket = container2.selectAll("path").data([{"x1":20.2,"y1":780.2,"x2":245.2,"y2":780.2, "class": "curlyBrace_XD"}, {"x1":245.2,"y1":780.2,"x2":450.2,"y2":780.2, "class": "curlyBrace_XC"}, {"x1":450.2,"y1":780.2,"x2":650.2,"y2":780.2, "class": "curlyBrace_XB"},     {"x1":650.2,"y1":780.2,"x2":969.2,"y2":780.2, "class": "curlyBrace_XA"},
{"x1":970.2,"y1":404.2,"x2":970.2,"y2":20.2, "class": "curlyBrace"},
{"x1":970.2,"y1":780.2,"x2":970.2,"y2":404.2, "class": "curlyBrace"}                                                                                 ])
.enter().append("path").attr("class",function(d) {return d.class;});
    			bracket.attr("d", function(d) {
            console.log('d: ' + d.x1 + ', y1: ' + d.y1 + ', d.x2: ' + d.x2 + ', d.y2: ' + d.y2 );
            return makeCurlyBrace(d.x1,d.y1,d.x2,d.y2,50,0.6); });
    			bracket.exit().remove();
var brushArea = null;
// container2.append("g")
//   .attr("class", "brush")
//   .call(brush);

function isBrushed(brush_coords, cx, cy) {
  var x0 = brush_coords[0][0],
      x1 = brush_coords[1][0],
      y0 = brush_coords[0][1],
      y1 = brush_coords[1][1];
  console.log('isBrushed: ' + (x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1));
  return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;
}
function brushended() {
    var s = d3.event.selection;
  console.log(d3.event.selection);
    if (d3.event.selection != null) {
      console.log('not null d3.event.selection');
      // revert circles to initial style
      //pts.attr("class", "non_brushed");
      var brush_coords = d3.brushSelection(this);
      // // style brushed circles
      pts.filter(function (){
        var cx = parseInt(d3.select(this).attr("rx")) + parseInt(d3.select(this).attr("cx")),
            cy = parseInt(d3.select(this).attr("ry")) + parseInt(d3.select(this).attr("cy"));
        console.log('cx: ' + JSON.stringify(cx));
        console.log('cy: ' + JSON.stringify(cy));
        return isBrushed(brush_coords, cx, cy);
      })
      .attr("class", function(){        
        return brushFill;
      });
    }
}



function transition(zoomLevel) {
  svg.transition()
      .delay(100)
      .duration(700)
      .call(zoom.scaleBy, zoomLevel);
      //.call(zoom.transform, transform);
      //.on("end", function() { canvas.call(transition); });
}

d3.selectAll('button').on('click', function() {
  if (this.id === 'zoom_in') {
    transition(1.2); // increase on 0.2 each time
  }
  if (this.id === 'zoom_out') {
    transition(0.8); // deacrease on 0.2 each time
  }
  if (this.id === 'zoom_init') {
        svg.transition().duration(750).call(
      zoom.transform,
      d3.zoomIdentity,
      d3.zoomTransform(svg.node()).invert([width / 2, height / 2])
    );
      /*scale = 1.0;
  container.attr("transform", "translate(0,0)scale(1,1)");
  zoom.scale(scale)
    .call(zoom.scaleTo, 1)
      .translate([0,0]);*/
    //container.attr("transform", "translate(0,0)scale(1,1)");
    /*svg.transition()
        .delay(100)
        .duration(700)
        //.attr("transform", "translate(" + -100 + "," + -500 + ")")
        .call(zoom.scaleTo, 1); // return to initial state*/
    //svg.attr('transform', 'translate(0,0)');
    //container.attr('transform', 'translate(-100,0)');
    //container2.attr('transform', 'translate(${0},  	 ${0}) scale(${1.0})');  
  }
  if (this.id === 'stop-brush') {
    if(brushArea){
      container2.select(".brush").remove();
      brushArea = null;
    } else{
      //alert('brushArea - null');
   brushArea = container2.append("g")
      .attr("class", "brush")
      .call(brush);
    }
  }

}  );

function updateChipData(chipData)
{
  var pts = container.selectAll('point')
  .data(chipData)
  .enter()
  .append('circle')
  .attr("cx", function(d){ return d[3];})
  .attr("cy", function(d){ return d[2];})
  .attr('class', 'point')
  .attr('transform', function(d) {
    var coors = line([d]).slice(1).slice(0, -1); 
    return "translate(" + coors + ")";
  })
  .attr('r', 2)
  .attr('fill',function(d,i){
    return 'red';
  })
  .on("mouseover", function(d) {		
      div.transition()		
        .duration(200)		
        .style("opacity", .9);		
      div	.html(d[4])//"angle: " + d[5] + '<br />' + ' radius: ' + d[6])	
        .style("left", (d3.event.pageX) + "px")		
        .style("top", (d3.event.pageY - 28) + "px");	
  })					
  .on("mouseout", function(d) {		
      div.transition()		
        .duration(500)		
        .style("opacity", 0);	
  });

}


    const openFile = function(event) {
      let input = event.target;
      let reader = new FileReader();
      reader.onload = function() {
        let text = reader.result.split('\n');
        let node = document.getElementById('output');
        //node.innerText = text.length;
        var chipData = [];
        var l = 0;
          for(var i = 0; i < text.length; i++){ 
            var splitText = text[i].split(',');
            if(splitText[0].trim().length > 0){
              l++;
              
              if(splitText[0] !== 'EXPERIMENT_NUMBER'){
                console.log(splitText[0] + ', ' + splitText[1] + ', ' + splitText[5] + ', ' + splitText[29] + ', ' + splitText[33]);
                var diskKey = splitText[0].split('_')[1]+'_'+splitText[1].substring(1);
                console.log('diskKey: ' + diskKey);
                var idorod = 20;
                if(splitText[5].startsWith('OD')) idorod = 50;
                
                chipDataTemp = [splitText[29], idorod, disk_ref[diskKey][0], disk_ref[diskKey][1], splitText[33]];
                chipData.push(chipDataTemp);
              }
           }
        }
        console.log(l);
        //node.innerText = l;
        //var chipData = [[70, 48, disk_ref['XA_20'][0], disk_ref['XA_20'][1], 'new chip XA_20'], 
        //               [270, 20, disk_ref['XA_19'][0], disk_ref['XA_19'][1], 'new chip XA_19']];
        updateChipData(chipData);

      };
      reader.readAsText(input.files[0]);
    }
    
// Below are the functions that handle actual exporting:
// getSVGString ( svgNode ) and svgString2Image( svgString, width, height, format, callback )
function getSVGString( svgNode ) {
	svgNode.setAttribute('xlink', 'http://www.w3.org/1999/xlink');
	var cssStyleText = getCSSStyles( svgNode );
	appendCSS( cssStyleText, svgNode );

	var serializer = new XMLSerializer();
	var svgString = serializer.serializeToString(svgNode);
	svgString = svgString.replace(/(\w+)?:?xlink=/g, 'xmlns:xlink='); // Fix root xlink without namespace
	svgString = svgString.replace(/NS\d+:href/g, 'xlink:href'); // Safari NS namespace fix

	return svgString;

	function getCSSStyles( parentElement ) {
		var selectorTextArr = [];

		// Add Parent element Id and Classes to the list
		selectorTextArr.push( '#'+parentElement.id );
		for (var c = 0; c < parentElement.classList.length; c++)
				if ( !contains('.'+parentElement.classList[c], selectorTextArr) )
					selectorTextArr.push( '.'+parentElement.classList[c] );

		// Add Children element Ids and Classes to the list
		var nodes = parentElement.getElementsByTagName("*");
		for (var i = 0; i < nodes.length; i++) {
			var id = nodes[i].id;
			if ( !contains('#'+id, selectorTextArr) )
				selectorTextArr.push( '#'+id );

			var classes = nodes[i].classList;
			for (var c = 0; c < classes.length; c++)
				if ( !contains('.'+classes[c], selectorTextArr) )
					selectorTextArr.push( '.'+classes[c] );
		}

		// Extract CSS Rules
		var extractedCSSText = "";
		for (var i = 0; i < document.styleSheets.length; i++) {
			var s = document.styleSheets[i];
			
			try {
			    if(!s.cssRules) continue;
			} catch( e ) {
		    		if(e.name !== 'SecurityError') throw e; // for Firefox
		    		continue;
		    	}

			var cssRules = s.cssRules;
			for (var r = 0; r < cssRules.length; r++) {
				if ( contains( cssRules[r].selectorText, selectorTextArr ) )
					extractedCSSText += cssRules[r].cssText;
			}
		}
		

		return extractedCSSText;

		function contains(str,arr) {
			return arr.indexOf( str ) === -1 ? false : true;
		}

	}

	function appendCSS( cssText, element ) {
		var styleElement = document.createElement("style");
		styleElement.setAttribute("type","text/css"); 
		styleElement.innerHTML = cssText;
		var refNode = element.hasChildNodes() ? element.children[0] : null;
		element.insertBefore( styleElement, refNode );
	}
}
    
    
    
    d3.select('#export').on('click', function(){
	var svgString = getSVGString(svg.node());
	svgString2Image( svgString, 2*width, 2*height, 'png', save ); // passes Blob and filesize String to the callback

	function save( dataBlob, filesize ){
		saveAs( dataBlob, 'D3 vis exported to PNG.png' ); // FileSaver.js function
	}
      
      
    });

function svgString2Image( svgString, width, height, format, callback ) {
	      var doctype = '<?xml version="1.0" standalone="no"?>'
             + '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';
var source = getSVGString(d3.select('svg').node());
      
// var source = (new XMLSerializer()).serializeToString(d3.select('svg').node());
var blob = new Blob([ doctype + source], { type: 'image/svg+xml' });

var url = window.URL.createObjectURL(blob);
var image = new Image();
  image.onerror = function() {
    console.log('An error occurred while attempting to load SVG');
  };
	var canvas = document.createElement("canvas");
	var context = canvas.getContext("2d");

	canvas.width = width;
	canvas.height = height;

	image.onload = function() {
		context.clearRect ( 0, 0, width, height );
		context.drawImage(image, 0, 0, width, height);

		canvas.toBlob( function(blob) {
			var filesize = Math.round( blob.length/1024 ) + ' KB';
			if ( callback ) callback( blob, filesize );
		});

		
	};

	image.src = url;
}
const WIDTH = 540;
const HEIGHT = 540;


var mainSvg = d3.select("#viz")
        .append("svg")
        .attr("width", WIDTH)
        .attr("height", HEIGHT);


function highlightLine(lineNumbers) {  /* lineNumbers can be an array or a single number. Yay overloading! */
  
  $('#snippet').css('background-color', 'white');
  $('#snippet p').css('background-color', 'white').css('color', 'black');
  if (lineNumbers instanceof Array) {
  for (var i = 0; i < lineNumbers.length; i++)
      if (lineNumbers[i] != 0)
          $('#line'+lineNumbers[i]).css('background-color', 'DimGray').css('color', 'LightCoral').css('line-height','15px');
  }
  else
    $('#line'+lineNumbers).css('background-color', 'black').css('color', 'white');
}

var GraphWidget = function() {
   
    if (mainSvg.select("#vertex").empty()) {
        vertexSvg = mainSvg.append("g")
                .attr("id", "vertex");
    }
    if (mainSvg.select("#edge").empty()) {
        edgeSvg = mainSvg.append("g")
                .attr("id", "edge");
    }
    if (mainSvg.select("#vertexText").empty()) {
        vertexTextSvg = mainSvg.append("g")
                .attr("id", "vertexText");
    }
    if (mainSvg.select("#edgeWeight").empty()) {
        edgeWeightSvg = mainSvg.append("g")
                .attr("id", "edgeWeight");
    }
    if (mainSvg.select("#edgeWeightPath").empty()) {
        edgeWeightPathSvg = mainSvg.append("g")
                .attr("id", "edgeWeightPath");
    }
    if (mainSvg.select("#marker").empty()) {
        markerSvg = mainSvg.append("g")
                .attr("id", "marker");
    }

    var self = this;
    
    var vertexList = {};
    var edgeList = {};

    var vertexUpdateList = {};
    var edgeUpdateList = {};
    
    var pause = "false";
    var animationDuration = 1000;
    var currentItr = -1;
    var animationStateList = {};
    
    this.addVertex = function(cx, cy, vertexText, vertexClassNumber, show, extraText) {
        if (show != false)
            show = true;

        var newVertex = new GraphVertexWidget(cx, cy, VERTEX_SHAPE_CIRCLE, vertexText, vertexClassNumber);
        if (extraText != "")
            newVertex.changeExtraText(extraText);

        vertexList[vertexClassNumber] = newVertex;
        vertexUpdateList[vertexClassNumber] = false;

        if (show == true) {
            vertexList[vertexClassNumber].showVertex();
            vertexList[vertexClassNumber].redraw();
        }
    }

    // Default for weight is 1 and for type is EDGE_TYPE_UDE
    this.addEdge = function(vertexClassA, vertexClassB, edgeIdNumber, type, weight, show, showWeight) {
        try {
            if (show != false)
                show = true;
            if (showWeight != true)
                showWeight = false;
            if (type == null || isNaN(type))
                type = EDGE_TYPE_UDE;
            if (weight == null || isNaN(weight))
                weight = 1;

            var vertexA = vertexList[vertexClassA];
            var vertexB = vertexList[vertexClassB];

            var newEdge = new GraphEdgeWidget(vertexA, vertexB, edgeIdNumber, type, weight);

            edgeList[edgeIdNumber] = newEdge;
            edgeUpdateList[edgeIdNumber] = false;

            vertexList[vertexClassA].addEdge(newEdge);
            vertexList[vertexClassB].addEdge(newEdge);

            if (show == true) {
                edgeList[edgeIdNumber].showEdge();
                if (showWeight == true)
                    edgeList[edgeIdNumber].showWeight();
                edgeList[edgeIdNumber].redraw();
            }
        }
        catch (err) {
        }
    }
    // graphState object is equivalent to one element of the statelist.
    // See comments below this function
    this.updateGraph = function(graphState, duration) {
        if (duration == null || isNaN(duration))
            duration = animationDuration;
        updateDisplay(graphState, duration);
    }
    function updateDisplay(graphState, duration) {     
        
        var currentVertexState = graphState["vl"];
        var currentEdgeState = graphState["el"];
        
        //if(animationStateList.length != 0)
        {
            if( graphState["lineNo"] != -1)
                highlightLine(graphState["lineNo"]);
        }
        
        var key;           
        for (key in currentVertexState) {
            if (vertexList[key] == null || vertexList[key] == undefined) {
                self.addVertex(currentVertexState[key]["cx"], currentVertexState[key]["cy"], currentVertexState[key]["text"], key, false);
            }

            var currentVertex = vertexList[key];

            currentVertex.showVertex();

            if (currentVertexState[key]["state"] == OBJ_HIDDEN)
                currentVertex.hideVertex();
            else if (currentVertexState[key]["state"] != null)
                currentVertex.stateVertex(currentVertexState[key]["state"]);
            else
                currentVertex.stateVertex(VERTEX_DEFAULT);

            currentVertex.moveVertex(currentVertexState[key]["cx"], currentVertexState[key]["cy"]);
            currentVertex.changeText(currentVertexState[key]["text"]);

            if (currentVertexState[key]["text-font-size"] != null) {
                currentVertex.changeTextFontSize(currentVertexState[key]["text-font-size"]);
            }
            if (currentVertexState[key]["inner-r"] != null && currentVertexState[key]["outer-r"] != null) {
                currentVertex.changeRadius(currentVertexState[key]["inner-r"], currentVertexState[key]["outer-r"]);
            }
            if (currentVertexState[key]["inner-w"] != null && currentVertexState[key]["outer-w"] != null) {
                currentVertex.changeWidth(currentVertexState[key]["inner-w"], currentVertexState[key]["outer-w"]);
            }
            if (currentVertexState[key]["inner-h"] != null && currentVertexState[key]["outer-h"] != null) {
                currentVertex.changeHeight(currentVertexState[key]["inner-h"], currentVertexState[key]["outer-h"]);
            }
            if (currentVertexState[key]["inner-stroke-width"] != null && currentVertexState[key]["outer-stroke-width"] != null) {
                currentVertex.changeStrokeWidth(currentVertexState[key]["inner-stroke-width"], currentVertexState[key]["outer-stroke-width"]);
            }
            if (currentVertexState[key]["extratext"] == null) {
                currentVertex.changeExtraText("");
            } else {
                currentVertex.changeExtraText(currentVertexState[key]["extratext"]);
            }
            

            currentVertex.redraw(duration);

            vertexUpdateList[key] = true;
        }
        for (key in vertexUpdateList) {
            if (vertexUpdateList[key] == false) {
                vertexList[key].hideVertex();
                vertexList[key].redraw(duration);
                vertexUpdateList[key] = true;
            }
        }
        try {
            for (key in currentEdgeState) {
                if (edgeList[key] == null || edgeList[key] == undefined) {
                    self.addEdge(currentEdgeState[key]["vertexA"], currentEdgeState[key]["vertexB"], key, currentEdgeState[key]["type"], currentEdgeState[key]["weight"], false);
                }

                var currentEdge = edgeList[key];

                currentEdge.showEdge();

                if (currentEdgeState[key]["state"] == OBJ_HIDDEN)
                    currentEdge.hideEdge();
                else if (currentEdgeState[key]["state"] != null)
                    currentEdge.stateEdge(currentEdgeState[key]["state"]);
                else
                    currentEdge.stateEdge(EDGE_DEFAULT);

                currentEdge.hideWeight();
                if (currentEdgeState[key]["state"] != OBJ_HIDDEN && currentEdgeState[key]["displayWeight"] != null && currentEdgeState[key]["displayWeight"]) {
                    currentEdge.showWeight();
                }

                currentEdge.changeVertexA(vertexList[currentEdgeState[key]["vertexA"]]);
                currentEdge.changeVertexB(vertexList[currentEdgeState[key]["vertexB"]]);
                if (currentEdgeState[key]["type"] == null)
                    currentEdgeState[key]["type"] = EDGE_TYPE_UDE;
                currentEdge.changeType(currentEdgeState[key]["type"]);
                if (currentEdgeState[key]["weight"] != null)
                    currentEdge.changeWeight(currentEdgeState[key]["weight"]);

                currentEdge.refreshPath();
                if (currentEdgeState[key]["animateHighlighted"] == null || !currentEdgeState[key]["animateHighlighted"])
                    currentEdge.redraw(duration);
                else {
                    currentEdge.animateHighlighted(duration * 0.9);
                }

                edgeUpdateList[key] = true;
            }

            for (key in edgeUpdateList) {
                if (edgeUpdateList[key] == false) {
                    edgeList[key].hideEdge();
                    edgeList[key].redraw(duration);
                    edgeUpdateList[key] = true;
                }
            }
        } catch (err) {
        }
        for (key in vertexUpdateList) {
            vertexUpdateList[key] = false;
        }

        for (key in edgeUpdateList) {
            edgeUpdateList[key] = false;
        }
    }
    this.startAnimation = function(stateList) {
        
        currentItr = 0;
        if(stateList == null)
            return;
        animationStateList = stateList;
        self.play();
    }
    this.play = function(){
        self.animate();
    }
    this.animate = function(){
        if(currentItr >= animationStateList.length)
        {
            currentItr = animationStateList.length -1;
            return;
        }
        if(pause == "false")
        {
            self.next(animationDuration);
            setTimeout(function(){
                self.animate();
            }, animationDuration);
        }
    }
    this.next = function(duration){
        
        if(currentItr >= animationStateList.length)
        {
            currentItr = animationStateList.length -1;
            return;
        }
        updateDisplay(animationStateList[currentItr], duration);
        if(pause == 'false')
            currentItr++;
    }
    this.Reset = function()
    {
        currentItr = animationStateList.length - 1;
        for (key in vertexUpdateList) {
            vertexUpdateList[key] = false;
        }

        for (key in edgeUpdateList) {
            edgeUpdateList[key] = false;
        }
    }
    this.pause = function(){
        pause = "true";
    }
    this.backward = function(){
        pause = "true";
        if(currentItr != -1)
        {
            currentItr -= 1;
            self.next(animationDuration);
        }
    }
    this.stop = function(){
        pause = 'false';
        currentItr = animationStateList.length-1;
        self.next(animationDuration);
        self.Reset();
    }
    
    this.startplay = function(){
        if(pause == "true")
        {
            pause = "false";
            self.animate();
        }
    }
    this.forward = function(){
        pause = "true";
        if(currentItr < animationStateList.length-1)
        {
            currentItr += 1;
            self.next(animationDuration);
        }
    }
    
}

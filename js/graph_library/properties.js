
const graphVertexProperties = {
  "innerVertex":{
    "r": 14,
    "width":30,
    "height": 30,
    "stroke-width": 0,
    "default":{
      "fill": "#eee",
      "stroke": "#fff"
    },
    "greenFill":{
      "fill": "#ffff4d",
      "stroke": "#fff"
    },
    "blueFill":{
      "fill": "#2ebbd1",
      "stroke": "#fff"
    },
  },
  "outerVertex":{
    "r": 16,
    "width": 32,
    "height": 32,
    "stroke-width": 2,
    "default":{
      "fill": "#333",
      "stroke": "#333"
    },
  "greenFill":{
      "fill": "#ffff4d",
      "stroke": "#ffff4d"
    },
    "blueFill":{
      "fill": "#2ebbd1",
      "stroke": "#2ebbd1"
    },
  },
  "text":{
    "font-size": 16,
    "default":{
      "fill": "#333",
      "font-family": "'PT Sans', sans-serif",
      "font-weight": "bold",
      "text-anchor": "middle"
    },
   "greenFill":{
      "fill": "#333",
      "font-family": "'PT Sans', sans-serif",
      "font-weight": "bold",
      "text-anchor": "middle"
    }, 
    "blueFill":{
      "fill": "#333",
      "font-family": "'PT Sans', sans-serif",
      "font-weight": "bold",
      "text-anchor": "middle"
    },
  },
  "label":{
    "font-size": 16,
    "default":{
      "fill": "#333",
      "font-family": "'PT Sans', sans-serif",
      "font-weight": "bold",
      "text-anchor": "middle"
    },
    "greenFill":{
      "fill": "#fff",
      "font-family": "'PT Sans', sans-serif",
      "font-weight": "bold",
      "text-anchor": "middle"
    },
    "blueFill":{
      "fill": "#fff",
      "font-family": "'PT Sans', sans-serif",
      "font-weight": "bold",
      "text-anchor": "middle"
    },
  }
};

/*
 * GraphEdgeWidget
 */

const graphEdgeProperties = {
  
  "path":{
    "stroke-width": 3,
    "default":{
      "stroke": "#333"
    },
    "blue":{
      "stroke": "#2ebbd1"
  },
  "green":{
      "stroke": "#ffff4d"
    },
     "highlighted":{
      "stroke": "#ff8a27"
    },
    "traversed":{
      "stroke": "#ff8a27"
    },
  },
  "weight":{
    "font-size": 16,
    "default":{
      "startOffset": "75%",
      "dy": -5,
      "fill": "#333",
      "font-family": "'PT Sans', sans-serif",
      "font-weight": "bold",
      "text-anchor": "middle"
    },
    "highlighted":{
      "startOffset": "75%",
      "dy": -5,
      "fill": "#ff8a27",
      "font-family": "'PT Sans', sans-serif",
      "font-weight": "bold",
      "text-anchor": "middle"
    },
    "traversed":{
      "startOffset": "75%",
      "dy": -5,
      "fill": "#ff8a27",
      "font-family": "'PT Sans', sans-serif",
      "font-weight": "bold",
      "text-anchor": "middle"
    },
	"green":{
      "startOffset": "75%",
      "dy": -5,
      "fill": "#ffff4d",
      "font-family": "'PT Sans', sans-serif",
      "font-weight": "bold",
      "text-anchor": "middle"
    },
  }
}


const ARROW_MARKER_WIDTH = 3;
const ARROW_MARKER_HEIGHT = 3;
const ARROW_REFX = 9;
const ARROW_FILL = "#333";

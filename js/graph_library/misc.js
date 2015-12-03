/*
 * Miscellaneous functions
 */

function deepCopy(obj){
  var newObj;

  if(obj instanceof Array){
    var i;

    newObj = [];

    for (i = 0; i < obj.length; i++) {
      newObj.push(deepCopy(obj[i]));
    }
  }

  else if(obj instanceof Object){
    newObj = {};

    for(keys in obj){
      newObj[keys] = deepCopy(obj[keys]);
    }
  }

  else{
    newObj = obj;
  }

  return newObj;
}

var priorityQueue = function(){
    var heapSize = -1;
    var minimum;
    var self = this;
    this.parent = function(i){
        return Math.round(i/2)-1;
    }
    this.left = function(i){
        return 2*i+1;
    }
    this.right = function(i){
        return 2*i+2;
    }
    this.MinHeapify = function(vertices, i){
        var l = self.left(i);
        var r = self.right(i);
        if(l <= heapSize-1 && vertices[l]["key"]< vertices[i]["key"])
            minimum = l;
        else
            minimum = i;
        if(r <= heapSize-1 && vertices[r]["key"] < vertices[minimum]["key"])
            minimum = r;
        if(minimum != i)
        {
            var temp = vertices[minimum];
            vertices[minimum] = vertices[i];
            vertices[i] = temp;
            self.MinHeapify(vertices, minimum);
        }   
    }
    this.BuildMinHeap = function(vertices){
        heapSize = vertices.length;
        for(var i = Math.floor(vertices.length/2); i >= 0; i--)
            self.MinHeapify(vertices, i);
    }
    this.heapMin = function(vertices){
        return vertices[0];
    }
    this.HeapExtractMin = function(vertices){
        if(heapSize < 0)
           return null;
       var min = vertices[0];
       vertices[0] = vertices[heapSize-1];
       vertices.splice(heapSize-1, 1);
       heapSize--;
       self.MinHeapify(vertices,0);
       return min;//["vertex"]; 
    }
    
}

var disjointset = function() {
    var nodes = {};
    this.makeset = function(node){
        if(nodes[node] != null) return false;
        var temp = {
            "parent":node,
            "rank":0
        }
        nodes[node] = temp;
    }
    this.findset = function(node){
        if(nodes[node] == null) return false;
        var curparent = nodes[node]["parent"];
        if(curparent != nodes[curparent]["parent"])
        {
            curparent = nodes[curparent]["parent"];
        }
        return curparent;
    } 
    this.union = function(node1, node2){
        if(nodes[node1] == null || nodes[node2] == null) return false;
        
        if(nodes[node1]["rank"] > nodes[node2]["rank"])
        {
            nodes[node2]["parent"] = node1;
        }
        else
        {
               nodes[node1]["parent"] = node2;
               if(nodes[node1]["rank"] == nodes[node2]["rank"])
               {
                   nodes[node2]["rank"] += 1;
               }
        }
    }
}
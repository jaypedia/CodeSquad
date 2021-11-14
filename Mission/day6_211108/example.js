HashMap = function () {
  this.map = new Array();
};

HashMap.prototype = {
  put: function (key, value) {
    this.map[key] = value;
  },
  get: function (key) {
    return this.map[key];
  },
  getAll: function () {
    return this.map;
  },
  clear: function () {
    this.map = new Array();
  },
  isEmpty: function () {
    return this.map.size() == 0;
  },
  remove: function (key) {
    delete this.map[key];
  },
  toString: function () {
    var temp = '';
    for (i in this.map) {
      temp = temp + ',' + i + ':' + this.map[i];
    }
    temp = temp.replace(',', '');
    return temp;
  },
  keySet: function () {
    var keys = new Array();
    for (i in this.map) {
      keys.push(i);
    }
    return keys;
  },
};

function Hashtest() {
  //test
  try {
    var map = new HashMap();
    map.put('1', '2');
    //map.put("3", "4");
    //map.remove("1");
    var allTemp = map.getAll();
    for (i in allTemp) {
      console.log(i);
    }
    console.log(map.toString());
  } catch (e) {
    console.log(e);
  }
}

console.log(Hashtest());

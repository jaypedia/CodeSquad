hMap = function () {
  this.map = new Object();
};

hMap.prototype = {
  put: function (key, value) {
    this.map[key] = value;
  },
  get: function (key) {
    return this.map[key];
  },
  containsKey: function (key) {
    return key in this.map;
  },
  containsValue: function (value) {
    for (var prop in this.map) {
      if (this.map[prop] == value) {
        return true;
      }
    }
    return false;
  },
  clear: function () {
    for (var prop in this.map) {
      delete this.map[prop];
    }
  },
  remove: function (key) {
    delete this.map[key];
  },
  keys: function () {
    var arKey = new Array();
    for (var prop in this.map) {
      arKey.push(prop);
    }
    return arKey;
  },
  values: function () {
    var arVal = new Array();
    for (var prop in this.map) {
      arVal.push(this.map[prop]);
    }
    return arVal;
  },
  size: function () {
    var count = 0;
    for (var prop in this.map) {
      count++;
    }
    return count;
  },
};

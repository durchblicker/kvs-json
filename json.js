/*
** © 2013 by Philipp Dunkel <pip@pipobscure.com>. Licensed under MIT-License.
*/
/*jshint node:true, browser:false*/
'use strict';

module.exports = KVSJson;
module.exports.kvt = 'utility';

var Abstract = require('kvs-abstract');
var sanitizeHtml = require('sanitize-html');

Abstract.bequeath(KVSJson);
function KVSJson(store) {
  Abstract.instantiate(this);
  this.store = store;
  this._list = store.list.bind(store);
  this._remove = store.remove.bind(store);
}

KVSJson.prototype._get = function(name, callback) {
  this.store.get(name, function(err, val) {
    if(err) return callback(err);
    try {
      val = JSON.parse(Buffer.isBuffer(val) ? val.toString('utf-8') : String(val));
      val = applyFunctionOnLeafNodeValues(sanitizeString, val);
    } catch(ex) {
      return callback(ex);
    }
    callback(null, val);
  });
};
KVSJson.prototype._set = function(name, value, callback) {
  try {
    value = JSON.parse(Buffer.isBuffer(value) ? value.toString('utf-8') : JSON.stringify(value));
    value = applyFunctionOnLeafNodeValues(sanitizeString, value);
    value = new Buffer(JSON.stringify(value));
    this.store.set(name, value, callback);
  } catch(ex) {
    return callback(ex);
  }
};

function sanitizeString (elem) {
  if (typeof elem === 'string') {
    return sanitizeHtml(elem, {
      allowedTags: ['b', 'i']
    });
  } else {
    return elem;
  }
}

function applyFunctionOnLeafNodeValues (fn, obj) {
  if (!obj) {
    return obj;
  } else if (typeof obj === 'object') {
    Object.keys(obj).forEach(function (key) {
      obj[key] = applyFunctionOnLeafNodeValues.call(this, fn, obj[key]);
    });
    return obj;
  } else {
    return fn(obj);
  }
}

/*
** © 2013 by Philipp Dunkel <pip@pipobscure.com>. Licensed under MIT-License.
*/
/*jshint node:true, browser:false*/
'use strict';

module.exports = KVSJson;
module.exports.kvt = 'utility';

var Abstract = require('kvs-abstract');

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
    } catch(ex) {
      return callback(ex);
    }
    callback(null, val);
  });
};
KVSJson.prototype._set = function(name, value, callback) {
  value = Buffer.isBuffer(value) ? value : new Buffer(JSON.stringify(value));
  this.store.set(name, value, callback);
};

# KVS - JSON
[KVS](http://npmjs.org/package/kvs) or   *K*ey *V*alue *S*tore is an abstract KeyValueStore system. The *kvs-** group of node modules, are intended to present a unified interface to key value stores of every persuasion. This allows for substituting them without changing anything but the initializing parameters.

*KVS-filter* modules are modules that are used to modify the requests to the KVS system. They can transform the *key* or the *value* or both in some way. However they need to take either be transparent and keep to the KVS-system definition (i.e.: values are buffers, etc...) or be used close to the consumer of the API.

*KVS-json* is a *KVS filter* module that accepts JavaScript objects as values and JSON-stringifies them into buffers for actual storage. On the reverse it takes the buffer it receives from underlying storage, and JSO-parses it before returning a JavaScript object to the consumer. This means it breaks the KVS conventions and is a utility module that is used to wrap kvs instances.

## Install
    npm install kvs-json
    
## Use
    var KVS=require('kvs-json');
    var store = new KVS(store); // pass in the KVS-Instance that is used as storage
    store.set('name', { <this is an object> }, function(err) {…});
    store.get('name', function(err, value) {
    	// attention! value will be an object
    });
    store.remove('name', function(err) { … });
    store.list('name', function(err, value) { … });

## License (MIT)
**Copyright (c) 2013 [Philipp Dunkel](mailto:pip@pipobscure.com)**

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

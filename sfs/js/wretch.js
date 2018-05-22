!function(t,r){"object"==typeof exports&&"undefined"!=typeof module?module.exports=r():"function"==typeof define&&define.amd?define(r):t.wretch=r()}(this,function(){"use strict";var t=Object.assign||function(t){for(var r,e=1,o=arguments.length;e<o;e++)for(var n in r=arguments[e])Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n]);return t},r=function(e,o,n){if(void 0===n&&(n=!1),!e||!o||"object"!=typeof e||"object"!=typeof o)return e;var i=t({},e);for(var s in o)o.hasOwnProperty(s)&&(o[s]instanceof Array&&e[s]instanceof Array?i[s]=n?e[s].concat(o[s]):o[s]:"object"==typeof o[s]&&"object"==typeof e[s]?i[s]=r(e[s],o[s],n):i[s]=o[s]);return i},e={defaults:{},errorType:null,polyfills:{fetch:null,FormData:null,URLSearchParams:null,performance:null,PerformanceObserver:null,AbortController:null},polyfill:function(t,r){for(var e=void 0===r?{}:r,o=e.doThrow,n=void 0===o||o,i=e.instance,s=void 0!==i&&i,u=[],c=2;c<arguments.length;c++)u[c-2]=arguments[c];var a=this.polyfills[t]||("undefined"!=typeof self?self[t]:null)||("undefined"!=typeof global?global[t]:null);if(n&&!a)throw new Error(t+" is not defined");return s&&a?new(a.bind.apply(a,[void 0].concat(u))):a}},o=function(t,r,e,o){var i=t.getEntriesByName(r);return!!(i&&i.length>0)&&(e(i.reverse()[0]),o.clearMeasures(r),n.callbacks.delete(r),n.callbacks.size<1&&(n.observer.disconnect(),o.clearResourceTimings&&o.clearResourceTimings()),!0)},n={callbacks:new Map,observer:null,observe:function(t,r){if(t&&r){var i=e.polyfill("performance",{doThrow:!1});(function(t,r){return!n.observer&&t&&r&&(n.observer=new r(function(r){n.callbacks.forEach(function(e,n){o(r,n,e,t)})}),t.clearResourceTimings&&t.clearResourceTimings()),n.observer})(i,e.polyfill("PerformanceObserver",{doThrow:!1}))&&(o(i,t,r,i)||(n.callbacks.size<1&&n.observer.observe({entryTypes:["resource","measure"]}),n.callbacks.set(t,r)))}}},i=function(){function o(t,r,e,o,n){void 0===e&&(e=new Map),void 0===o&&(o=[]),void 0===n&&(n=[]),this._url=t,this._options=r,this._catchers=e,this._resolvers=o,this._middlewares=n}return o.factory=function(t,r){return void 0===t&&(t=""),void 0===r&&(r={}),new o(t,r)},o.prototype.selfFactory=function(t){var r=void 0===t?{}:t,e=r.url,n=void 0===e?this._url:e,i=r.options,s=void 0===i?this._options:i,u=r.catchers,c=void 0===u?this._catchers:u,a=r.resolvers,f=void 0===a?this._resolvers:a,l=r.middlewares;return new o(n,s,c,f,void 0===l?this._middlewares:l)},o.prototype.defaults=function(t,o){return void 0===o&&(o=!1),e.defaults=o?r(e.defaults,t):t,this},o.prototype.errorType=function(t){return e.errorType=t,this},o.prototype.polyfills=function(r){return e.polyfills=t({},e.polyfills,r),this},o.prototype.url=function(t,r){return void 0===r&&(r=!1),r?this.selfFactory({url:t}):this.selfFactory({url:this._url+t})},o.prototype.options=function(t,e){return void 0===e&&(e=!0),this.selfFactory({options:e?r(this._options,t):t})},o.prototype.query=function(t){return this.selfFactory({url:s(this._url,t)})},o.prototype.headers=function(t){return this.selfFactory({options:r(this._options,{headers:t})})},o.prototype.accept=function(t){return this.headers({Accept:t})},o.prototype.content=function(t){return this.headers({"Content-Type":t})},o.prototype.auth=function(t){return this.headers({Authorization:t})},o.prototype.catcher=function(t,r){var e=new Map(this._catchers);return e.set(t,r),this.selfFactory({catchers:e})},o.prototype.signal=function(r){return this.selfFactory({options:t({},this._options,{signal:r.signal})})},o.prototype.resolve=function(t,r){return void 0===r&&(r=!1),this.selfFactory({resolvers:r?[t]:this._resolvers.concat([t])})},o.prototype.middlewares=function(t,r){return void 0===r&&(r=!1),this.selfFactory({middlewares:r?t:this._middlewares.concat(t)})},o.prototype.method=function(o,i){return function(t){var o=t._url,i=t._catchers,s=t._resolvers,u=t._middlewares,c=t._options,a=r(e.defaults,c),f=e.polyfill("AbortController",{doThrow:!1,instance:!0});!a.signal&&f&&(a.signal=f.signal);var l=function(t){return function(r){return 0===t.length?r:1===t.length?t[0](r):t.reduceRight(function(e,o,n){return n===t.length-2?o(e(r)):o(e)})}}(u)(e.polyfill("fetch"))(o,a),p=l.then(function(t){return t.ok?t:t[e.errorType||"text"]().then(function(r){var o=new Error(r);throw o[e.errorType]=r,o.status=t.status,o.response=t,o})}),d=function(r){return r.catch(function(r){if(i.has(r.status))return i.get(r.status)(r,t);if(i.has(r.name))return i.get(r.name)(r,t);throw r})},h=function(t){return function(r){return d(t?p.then(function(r){return r&&r[t]()}).then(function(t){return t&&r&&r(t)||t}):p.then(function(t){return t&&r&&r(t)||t}))}},y={res:h(null),json:h("json"),blob:h("blob"),formData:h("formData"),arrayBuffer:h("arrayBuffer"),text:h("text"),perfs:function(t){return l.then(function(r){return n.observe(r.url,t)}),y},setTimeout:function(t,r){return void 0===r&&(r=f),setTimeout(function(){return r.abort()},t),y},controller:function(){return[f,y]},error:function(t,r){return i.set(t,r),y},badRequest:function(t){return y.error(400,t)},unauthorized:function(t){return y.error(401,t)},forbidden:function(t){return y.error(403,t)},notFound:function(t){return y.error(404,t)},timeout:function(t){return y.error(408,t)},internalError:function(t){return y.error(500,t)},onAbort:function(t){return y.error("AbortError",t)}};return s.reduce(function(r,e){return e(r,t)},y)}(this.options(t({},i,{method:o})))},o.prototype.get=function(t){return void 0===t&&(t={}),this.method("GET",t)},o.prototype.delete=function(t){return void 0===t&&(t={}),this.method("DELETE",t)},o.prototype.put=function(t){return void 0===t&&(t={}),this.method("PUT",t)},o.prototype.post=function(t){return void 0===t&&(t={}),this.method("POST",t)},o.prototype.patch=function(t){return void 0===t&&(t={}),this.method("PATCH",t)},o.prototype.head=function(t){return void 0===t&&(t={}),this.method("HEAD",t)},o.prototype.opts=function(t){return void 0===t&&(t={}),this.method("OPTIONS",t)},o.prototype.body=function(r){return this.selfFactory({options:t({},this._options,{body:r})})},o.prototype.json=function(t){return this.content("application/json").body(JSON.stringify(t))},o.prototype.formData=function(t){return this.body(u(t))},o.prototype.formUrl=function(t){return this.body("string"==typeof t?t:c(t)).content("application/x-www-form-urlencoded")},o}(),s=function(t,r){var o=e.polyfill("URLSearchParams",{instance:!0}),n=t.indexOf("?");for(var i in r)if(r[i]instanceof Array)for(var s=0,u=r[i];s<u.length;s++){var c=u[s];o.append(i,c)}else o.append(i,r[i]);return~n?t.substring(0,n)+"?"+o.toString():t+"?"+o.toString()},u=function(t){var r=e.polyfill("FormData",{instance:!0});for(var o in t)if(t[o]instanceof Array)for(var n=0,i=t[o];n<i.length;n++){var s=i[n];r.append(o+"[]",s)}else r.append(o,t[o]);return r},c=function(t){return Object.keys(t).map(function(r){return encodeURIComponent(r)+"="+encodeURIComponent("object"==typeof t[r]?JSON.stringify(t[r]):t[r])}).join("&")},a=i.factory;return a.default=i.factory,a});
//# sourceMappingURL=wretch.js.map
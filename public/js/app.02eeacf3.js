(function(t){function e(e){for(var o,s,a=e[0],c=e[1],l=e[2],d=0,p=[];d<a.length;d++)s=a[d],r[s]&&p.push(r[s][0]),r[s]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(t[o]=c[o]);u&&u(e);while(p.length)p.shift()();return i.push.apply(i,l||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],o=!0,a=1;a<n.length;a++){var c=n[a];0!==r[c]&&(o=!1)}o&&(i.splice(e--,1),t=s(s.s=n[0]))}return t}var o={},r={app:0},i=[];function s(e){if(o[e])return o[e].exports;var n=o[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=o,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)s.d(n,o,function(e){return t[e]}.bind(null,o));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],c=a.push.bind(a);a.push=e,a=a.slice();for(var l=0;l<a.length;l++)e(a[l]);var u=c;i.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},2856:function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("097d");var o=n("2b0e"),r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[t.disconnected?n("div",{staticClass:"modal modal--danger"},[t._m(0)]):t._e(),t.connected?t._e():n("div",{staticClass:"modal"},[t._m(1)]),t._l(t.motors,function(e){return n("table",{staticClass:"motor",on:{click:function(n){t.sel[e]=!t.sel[e]}}},[n("tr",[n("th",{attrs:{colspan:"2"}},[t._v("Motor "+t._s(e))])]),n("tr",[n("th",[t._v("Position")]),n("td",[t._v(t._s(t.pos[e]))])]),n("tr",[n("th",[t._v("Target")]),n("td",[t._v(t._s(t.tar[e]))])]),n("tr",[n("th",[t._v("Select")]),n("td",[n("input",{directives:[{name:"model",rawName:"v-model.number",value:t.sel[e],expression:"sel[motor]",modifiers:{number:!0}}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.sel[e])?t._i(t.sel[e],null)>-1:t.sel[e]},on:{change:function(n){var o=t.sel[e],r=n.target,i=!!r.checked;if(Array.isArray(o)){var s=t._n(null),a=t._i(o,s);r.checked?a<0&&t.$set(t.sel,e,o.concat([s])):a>-1&&t.$set(t.sel,e,o.slice(0,a).concat(o.slice(a+1)))}else t.$set(t.sel,e,i)}}})])]),n("tr",[n("td",[n("button",{on:{click:function(n){n.stopPropagation(),t.moveUp(e)}}},[t._v("↑")])]),n("td",[n("button",{on:{click:function(n){n.stopPropagation(),t.moveDown(e)}}},[t._v("↓")])])])])}),n("br"),n("table",{staticClass:"settings"},[t._m(2),n("tr",[n("th",[t._v("Steps")]),n("td",[n("input",{directives:[{name:"model",rawName:"v-model",value:t.steps,expression:"steps"}],attrs:{type:"number"},domProps:{value:t.steps},on:{input:function(e){e.target.composing||(t.steps=e.target.value)}}})])]),n("tr",[n("td",[n("input",{directives:[{name:"model",rawName:"v-model",value:t.target,expression:"target"}],attrs:{type:"number"},domProps:{value:t.target},on:{input:function(e){e.target.composing||(t.target=e.target.value)}}})]),n("td",[n("button",{on:{click:function(e){e.stopPropagation(),t.moveTo("selected",t.target)}}},[t._v("MOVE")])])]),n("tr",[n("td",[n("button",{on:{click:function(e){e.stopPropagation(),t.moveUp("selected")}}},[t._v("↑")])]),n("td",[n("button",{on:{click:function(e){e.stopPropagation(),t.moveDown("selected")}}},[t._v("↓")])])]),n("tr",[n("td",[n("button",{on:{click:function(e){e.stopPropagation(),t.randomize()}}},[t._v("RANDOMIZE")])]),n("td",[n("button",{on:{click:function(e){e.stopPropagation(),t.reset()}}},[t._v("SET TO ZERO")])])]),n("tr",[n("td",[n("button",{on:{click:function(e){e.stopPropagation(),t.selectAll()}}},[t._v("SELECT ALL")])]),n("td",[n("button",{on:{click:function(e){e.stopPropagation(),t.selectAll(!1)}}},[t._v("DESELECT ALL")])])]),n("tr",[n("td",[n("button",{on:{click:function(e){e.stopPropagation(),t.dither()}}},[t._v("TOGGLE DITHER")])]),n("td",[n("button",{on:{click:function(e){e.stopPropagation(),t.shutdown()}}},[t._v("SHUTDOWN")])])])])],2)},i=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"modal__inner"},[n("h2",[t._v("Wichtig!")]),n("p",[t._v("Die Verbindung wurde geschlossen. Die Stromversorgung der Motoren muss abgeschaltet werden!")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"modal__inner"},[n("h2",[t._v("Warten auf Verbindung...")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("tr",[n("th",{attrs:{colspan:"2"}},[t._v("Global")])])}],s={name:"app",data:function(){return{motors:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],pos:{1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0,11:0,12:0,13:0,14:0,15:0,16:0},tar:{1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0,11:0,12:0,13:0,14:0,15:0,16:0},sel:{1:!1,2:!1,3:!1,4:!1,5:!1,6:!1,7:!1,8:!1,9:!1,10:!1,11:!1,12:!1,13:!1,14:!1,15:!1,16:!1},steps:200,target:0,connected:!1,disconnected:!1}},sockets:{connect:function(){console.log("socket connected"),this.connected=!0,this.disconnected=!1},disconnect:function(){console.log("socket disconnected"),this.disconnected=!0},update_target:function(t){if("undefined"==typeof t.motor)for(var e in t)this.tar[e]=t[e];else this.tar[t.motor]=t.tar},update_pos:function(t){for(var e in t)this.pos[e]=t[e]}},methods:{moveUp:function(t){this.move(t,-1*parseInt(this.steps))},moveDown:function(t){this.move(t,parseInt(this.steps))},moveZero:function(){for(var t in this.sel)this.tar[t]=0,this.$socket.emit("update_target_manual",{motor:t,tar:this.tar[t]})},move:function(t,e){var n=this;if("selected"===t)for(t in this.sel)this.sel[t]&&n.move(t,e);else this.tar[t]+=parseInt(e),this.$socket.emit("update_target_manual",{motor:t,tar:this.tar[t]})},moveTo:function(t,e){var n=this;if("selected"===t)for(t in this.sel)this.sel[t]&&n.moveTo(t,e);else this.tar[t]=parseInt(e),this.$socket.emit("update_target_manual",{motor:t,tar:this.tar[t]})},selectAll:function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];for(var e in this.sel)this.sel[e]=t},dither:function(){this.$socket.emit("dither_manual")},randomize:function(){this.$socket.emit("randomize_manual")},reset:function(){confirm("Wirklich?")&&confirm("Wirklich, wirklich?")&&this.$socket.emit("reset_manual")},shutdown:function(){confirm("Wirklich?")&&this.$socket.emit("shutdown_manual")}}},a=s,c=(n("5c0b"),n("2877")),l=Object(c["a"])(a,r,i,!1,null,null,null);l.options.__file="App.vue";var u=l.exports,d=n("2f62");o["a"].use(d["a"]);var p=new d["a"].Store({state:{},mutations:{},actions:{}}),f=n("0a12"),v=n.n(f);o["a"].config.productionTip=!1,o["a"].use(v.a,window.location.protocol+"//"+window.location.host),new o["a"]({store:p,render:function(t){return t(u)}}).$mount("#app")},"5c0b":function(t,e,n){"use strict";var o=n("2856"),r=n.n(o);r.a}});
//# sourceMappingURL=app.02eeacf3.js.map
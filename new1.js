1/*
Copyright 2014, KISSY v1.47
MIT Licensed
build time: May 22 12:28
*/
KISSY.add("event/dom/base/utils",["dom"],function(i,b){var a=b("dom"),c="ksEventTargetId_"+i.now(),d=i.Env.host.document;return{simpleAdd:d&&d.addEventListener?
function(a,b,d,c){a.addEventListener&&a.addEventListener(b,d,!!c)}:function(a,b,d){a.attachEvent&&a.attachEvent("on"+b,d)},simpleRemove:d&&d.removeEventListener?
function(a,b,d,c){a.removeEventListener&&a.removeEventListener(b,d,!!c)}:function(a,b,d){a.detachEvent&&a.detachEvent("on"+b,d)},data:function(b,d){return a.data(b,c,d
)},removeData:function(b){return a.removeData(b,
c)}}});KISSY.add("event/dom/base/special",[],function(){return{}});
KISSY.add("event/dom/base/observer",["event/base","./special"],function(i,b){function a(b){a.superclass.constructor.call(this,b)}var c=b("event/base"),d=b("./special"
);i.extend(a,c.Observer,{keys:"fn,filter,data,context,originalType,groups,last".split(","),notifyInternal:function(a,b){var c,i,k=a.type,h;(h=this.originalType)?a.type
=h:h=k;(c=d[h])&&c.handle?(c=c.handle(a,this,b))&&0<c.length&&(i=c[0]):i=this.simpleNotify(a,b);!1===i&&a.halt();a.type=k;return i}});return a});
KISSY.add("event/dom/base/object",["event/base"],function(i,b){function a(){return s}function c(){return q}function d(n){var t=n.type;d.superclass.constructor.call(
this);this.originalEvent=n;var e=c;"defaultPrevented"in n?e=n.defaultPrevented?a:c:"getPreventDefault"in n?e=n.getPreventDefault()?a:c:"returnValue"in n&&(e=n.
returnValue===q?a:c);this.isDefaultPrevented=e;var g=[],f,j=k.concat();i.each(h,function(a){t.match(a.reg)&&(j=j.concat(a.props),a.fix&&g.push(a.fix))});for(e=j.length
;e;)f=j[--e],
this[f]=n[f];this.target||(this.target=n.srcElement||m);3===this.target.nodeType&&(this.target=this.target.parentNode);for(e=g.length;e;)f=g[--e],f(this,n)}var r=b(
"event/base"),m=i.Env.host.document,s=!0,q=!1,k="altKey,bubbles,cancelable,ctrlKey,currentTarget,eventPhase,metaKey,shiftKey,target,timeStamp,view,type".split(","),h
=[{reg:/^key/,props:["char","charCode","key","keyCode","which"],fix:function(a,h){null==a.which&&(a.which=null!=h.charCode?h.charCode:h.keyCode);void 0===a.metaKey&&(a
.metaKey=
a.ctrlKey)}},{reg:/^touch/,props:["touches","changedTouches","targetTouches"]},{reg:/^gesturechange$/i,props:["rotation","scale"]},{reg:/^(mousewheel|DOMMouseScroll)$/
,props:[],fix:function(a,h){var e,g,f,j=h.wheelDelta,l=h.axis,b=h.wheelDeltaY,c=h.wheelDeltaX,d=h.detail;j&&(f=j/120);d&&(f=-(0===d%3?d/3:d));void 0!==l&&(l===a.
HORIZONTAL_AXIS?(g=0,e=-1*f):l===a.VERTICAL_AXIS&&(e=0,g=f));void 0!==b&&(g=b/120);void 0!==c&&(e=-1*c/120);!e&&!g&&(g=f);void 0!==e&&(a.deltaX=e);void 0!==g&&(a.
deltaY=g);void 0!==
f&&(a.delta=f)}},{reg:/^mouse|contextmenu|click|mspointer|(^DOMMouseScroll$)/i,props:
"buttons,clientX,clientY,button,offsetX,relatedTarget,which,fromElement,toElement,offsetY,pageX,pageY,screenX,screenY".split(","),fix:function(a,h){var e,g,f=a.target,
j=h.button;null==a.pageX&&null!=h.clientX&&(e=f.ownerDocument||m,g=e.documentElement,e=e.body,a.pageX=h.clientX+(g&&g.scrollLeft||e&&e.scrollLeft||0)-(g&&g.clientLeft
||e&&e.clientLeft||0),a.pageY=h.clientY+(g&&g.scrollTop||e&&e.scrollTop||0)-(g&&g.clientTop||
e&&e.clientTop||0));!a.which&&void 0!==j&&(a.which=j&1?1:j&2?3:j&4?2:0);!a.relatedTarget&&a.fromElement&&(a.relatedTarget=a.fromElement===f?a.toElement:a.fromElement);
return a}}];i.extend(d,r.Object,{constructor:d,preventDefault:function(){var a=this.originalEvent;a.preventDefault?a.preventDefault():a.returnValue=q;d.superclass.
preventDefault.call(this)},stopPropagation:function(){var a=this.originalEvent;a.stopPropagation?a.stopPropagation():a.cancelBubble=s;d.superclass.stopPropagation.call
(this)}});
return d});
KISSY.add("event/dom/base/observable","event/base,dom,./special,./utils,./observer,./object".split(","),function(i,b){function a(a){i.mix(this,a);this.reset()}var c=b(
"event/base"),d=b("dom"),r=b("./special"),m=b("./utils"),s=b("./observer"),q=b("./object"),k=c.Utils;i.extend(a,c.Observable,{setup:function(){var a=this.type,b=r[a
]||{},d=this.currentTarget,e=m.data(d).handle;(!b.setup||b.setup.call(d,a)===false)&&m.simpleAdd(d,a,e)},constructor:a,reset:function(){a.superclass.reset.call(this);
this.lastCount=
this.delegateCount=0},notify:function(a){var b=a.target,c=a.type,e=this.currentTarget,g=this.observers,f=[],j,l,u=this.delegateCount||0,o,v;if(u&&b.nodeType)for(;b!==e
;){if(b.disabled!==true||c!=="click"){var p={},i,k,m;o=[];for(l=0;l<u;l++){v=g[l];m=v.filter;k=m+"";i=p[k];i===void 0&&(i=p[k]=d.test(b,m));i&&o.push(v)}o.length&&f.
push({currentTarget:b,currentTargetObservers:o})}b=b.parentNode||e}u<g.length&&f.push({currentTarget:e,currentTargetObservers:g.slice(u)});l=0;for(b=f.length;!a.
isPropagationStopped()&&
l<b;++l){c=f[l];o=c.currentTargetObservers;c=c.currentTarget;a.currentTarget=c;for(c=0;!a.isImmediatePropagationStopped()&&c<o.length;c++){e=o[c];e=e.notify(a,this);j
!==false&&e!==void 0&&(j=e)}}return j},fire:function(h,b){var h=h||{},c=""+this.type,e,g,f=r[c]||{};e=f.bubbles!==false;var j=this.currentTarget;if(!(f.fire&&f.fire.
call(j,b)===false)){if(!(h instanceof q)){g=h;h=new q({currentTarget:j,type:c,target:j});i.mix(h,g)}if(!(f.preFire&&f.preFire.call(j,h,b)===false)){g=j;var l=d.
getWindow(g),
u=l.document,f=[],o,k="on"+c,p=0;do{f.push(g);g=g.parentNode||g.ownerDocument||g===u&&l}while(!b&&g&&e);g=f[p];do{h.currentTarget=g;if(e=a.getDomEventObservable(g,c)){
e=e.notify(h);e!==void 0&&o!==false&&(o=e)}g[k]&&g[k].call(g)===false&&h.preventDefault();g=f[++p]}while(!b&&g&&!h.isPropagationStopped());if(!b&&!h.isDefaultPrevented
()){try{if(j[c]&&!i.isWindow(j)){a.triggeredEvent=c;j[c]()}}catch(m){}a.triggeredEvent=""}return o}}},on:function(a){var b=this.observers,c=r[this.type]||{},a=a 
instanceof
s?a:new s(a);if(this.findObserver(a)===-1){if(a.filter){b.splice(this.delegateCount,0,a);this.delegateCount++}else if(a.last){b.push(a);this.lastCount++}else b.splice(
b.length-this.lastCount,0,a);c.add&&c.add.call(this.currentTarget,a)}},detach:function(a){var b,c=r[this.type]||{},e="filter"in a,g=a.filter,f=a.context,j=a.fn,l=this.
currentTarget,d=this.observers,a=a.groups;if(d.length){a&&(b=k.getGroupsRe(a));var o,i,p,m,q=d.length;if(j||e||b){f=f||l;o=a=0;for(i=[];a<q;++a){p=d[a];m=p.context||l;
if(f!==m||j&&j!==p.fn||e&&(g&&g!==p.filter||!g&&!p.filter)||b&&!p.groups.match(b))i[o++]=p;else{p.filter&&this.delegateCount&&this.delegateCount--;p.last&&this.
lastCount&&this.lastCount--;c.remove&&c.remove.call(l,p)}}this.observers=i}else this.reset();this.checkMemory()}},checkMemory:function(){var a=this.type,b,c,e=r[a
]||{},g=this.currentTarget,f=m.data(g);if(f){b=f.observables;if(!this.hasObserver()){c=f.handle;(!e.tearDown||e.tearDown.call(g,a)===false)&&m.simpleRemove(g,a,c);
delete b[a]}if(i.isEmptyObject(b)){f.handle=
null;m.removeData(g)}}}});a.triggeredEvent="";a.getDomEventObservable=function(a,b){var c=m.data(a),e;if(c)e=c.observables;return e?e[b]:null};a.
getDomEventObservablesHolder=function(a,b){var c=m.data(a);!c&&b&&m.data(a,c={});return c};return a});
KISSY.add("event/dom/base/dom-event","event/base,./utils,dom,./special,./observable,./object".split(","),function(i,b){function a(a,b){var c=q[b]||{},j;if(!a.
originalType&&(j=c.typeFix)){a.originalType=b;b=j}return b}function c(b,c,f){var j,l,d,f=i.merge(f),c=a(f,c);j=k.getDomEventObservablesHolder(b,1);if(!(d=j.handle)){d=
j.handle=function(a){var b=a.type,c=d.currentTarget;if(!(k.triggeredEvent===b||typeof KISSY==="undefined"))if(b=k.getDomEventObservable(c,b)){a.currentTarget=c;a=new h
(a);return b.notify(a)}};
d.currentTarget=b}if(!(l=j.observables))l=j.observables={};j=l[c];if(!j){j=l[c]=new k({type:c,currentTarget:b});j.setup()}j.on(f);b=null}function d(b,c,f){var f=i.
merge(f),c=a(f,c),b=k.getDomEventObservablesHolder(b),d=(b||{}).observables;if(b&&d)if(c)(c=d[c])&&c.detach(f);else for(c in d)d[c].detach(f)}var r=b("event/base"),m=b
("./utils"),s=b("dom"),q=b("./special"),k=b("./observable"),h=b("./object"),n=r.Utils,t={on:function(a,b,f,d){a=s.query(a);n.batchForType(function(a,b,e,f){for(var e=n
.normalizeParam(b,
e,f),d,b=e.type,f=a.length-1;f>=0;f--){d=a[f];c(d,b,e)}},1,a,b,f,d);return a},detach:function(a,b,c,j){a=s.query(a);n.batchForType(function(a,b,c,f){for(var c=n.
normalizeParam(b,c,f),e,g,b=c.type,f=a.length-1;f>=0;f--){e=a[f];d(e,b,c);if(c.deep&&e.getElementsByTagName){g=e.getElementsByTagName("*");for(e=g.length-1;e>=0;e--)d(
g[e],b,c)}}},1,a,b,c,j);return a},delegate:function(a,b,c,d,l){return t.on(a,b,{fn:d,context:l,filter:c})},undelegate:function(a,b,c,d,l){return t.detach(a,b,{fn:d,
context:l,
filter:c})},fire:function(a,b,c,d){var l,c=c||{};c.synthetic=1;n.splitAndRun(b,function(b){var g,h,i;n.fillGroupsForEvent(b,c);b=c.type;if((h=q[b])&&h.typeFix)b=h.
typeFix;a=s.query(a);for(h=a.length-1;h>=0;h--){g=a[h];i=k.getDomEventObservable(g,b);!d&&!i&&(i=new k({type:b,currentTarget:g}));if(i){g=i.fire(c,d);l!==false&&g!==
void 0&&(l=g)}}});return l},fireHandler:function(a,b,c){return t.fire(a,b,c,1)},clone:function(a,b){var d;if(d=k.getDomEventObservablesHolder(a)){var h=m.data(a);h&&h
===m.data(b)&&
m.removeData(b);i.each(d.observables,function(a,d){i.each(a.observers,function(a){c(b,d,a)})})}}};return t});
KISSY.add("event/dom/base/key-codes",[],function(i){var b=i.UA,a={MAC_ENTER:3,BACKSPACE:8,TAB:9,NUM_CENTER:12,ENTER:13,SHIFT:16,CTRL:17,ALT:18,PAUSE:19,CAPS_LOCK:20,
ESC:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,PRINT_SCREEN:44,INSERT:45,DELETE:46,ZERO:48,ONE:49,TWO:50,THREE:51,FOUR:52,FIVE:
53,SIX:54,SEVEN:55,EIGHT:56,NINE:57,QUESTION_MARK:63,A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87
,X:88,
Y:89,Z:90,META:91,WIN_KEY_RIGHT:92,CONTEXT_MENU:93,NUM_ZERO:96,NUM_ONE:97,NUM_TWO:98,NUM_THREE:99,NUM_FOUR:100,NUM_FIVE:101,NUM_SIX:102,NUM_SEVEN:103,NUM_EIGHT:104,
NUM_NINE:105,NUM_MULTIPLY:106,NUM_PLUS:107,NUM_MINUS:109,NUM_PERIOD:110,NUM_DIVISION:111,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122
,F12:123,NUMLOCK:144,SEMICOLON:186,DASH:189,EQUALS:187,COMMA:188,PERIOD:190,SLASH:191,APOSTROPHE:192,SINGLE_QUOTE:222,OPEN_SQUARE_BRACKET:219,BACKSLASH:220,
CLOSE_SQUARE_BRACKET:221,
WIN_KEY:224,MAC_FF_META:224,WIN_IME:229,isTextModifyingKeyEvent:function(b){var d=b.keyCode;if(b.altKey&&!b.ctrlKey||b.metaKey||d>=a.F1&&d<=a.F12)return!1;switch(d){
case a.ALT:case a.CAPS_LOCK:case a.CONTEXT_MENU:case a.CTRL:case a.DOWN:case a.END:case a.ESC:case a.HOME:case a.INSERT:case a.LEFT:case a.MAC_FF_META:case a.META:case
 a.NUMLOCK:case a.NUM_CENTER:case a.PAGE_DOWN:case a.PAGE_UP:case a.PAUSE:case a.PRINT_SCREEN:case a.RIGHT:case a.SHIFT:case a.UP:case a.WIN_KEY:case a.WIN_KEY_RIGHT:
return!1;
default:return!0}},isCharacterKey:function(c){if(c>=a.ZERO&&c<=a.NINE||c>=a.NUM_ZERO&&c<=a.NUM_MULTIPLY||c>=a.A&&c<=a.Z||b.webkit&&0===c)return!0;switch(c){case a.
SPACE:case a.QUESTION_MARK:case a.NUM_PLUS:case a.NUM_MINUS:case a.NUM_PERIOD:case a.NUM_DIVISION:case a.SEMICOLON:case a.DASH:case a.EQUALS:case a.COMMA:case a.PERIOD
:case a.SLASH:case a.APOSTROPHE:case a.SINGLE_QUOTE:case a.OPEN_SQUARE_BRACKET:case a.BACKSLASH:case a.CLOSE_SQUARE_BRACKET:return!0;default:return!1}}};return a});
KISSY.add("event/dom/base/gesture",[],function(){return{start:"mousedown",move:"mousemove",end:"mouseup",tap:"click",singleTap:"click",doubleTap:"dblclick"}});
KISSY.add("event/dom/base/special-events",["./dom-event","./special"],function(i,b){var a=b("./dom-event"),c=b("./special");return i.mix(c,{mousewheel:{typeFix:i.UA.
gecko?"DOMMouseScroll":"mousewheel"},load:{bubbles:!1},click:{fire:function(a){if(!a&&"checkbox"===""+this.type&&this.click&&"input"===this.nodeName.toLowerCase())
return this.click(),!1}},focus:{bubbles:!1,preFire:function(b,c){if(!c)return a.fire(this,"focusin")},fire:function(a){if(!a&&this.ownerDocument&&this!==this.
ownerDocument.activeElement&&
this.focus)return this.focus(),!1}},blur:{bubbles:!1,preFire:function(b,c){if(!c)return a.fire(this,"focusout")},fire:function(a){if(!a&&this.ownerDocument&&this===
this.ownerDocument.activeElement&&this.blur)return this.blur(),!1}}})});
KISSY.add("event/dom/base/mouseenter",["dom","./special"],function(i,b){var a=b("dom"),c=b("./special");i.each([{name:"mouseenter",fix:"mouseover"},{name:"mouseleave",
fix:"mouseout"}],function(b){c[b.name]={typeFix:b.fix,handle:function(b,c,d){var i=b.currentTarget,k=b.relatedTarget;if(!k||k!==i&&!a.contains(i,k))return[c.
simpleNotify(b,d)]}}})});
KISSY.add("event/dom/base/valuechange",["dom","./dom-event","./special"],function(i,b){function a(a){if(k.hasData(a,f)){var b=k.data(a,f);clearTimeout(b);k.removeData(
a,f)}}function c(b){a(b.target)}function d(a){var b=a.value,c=k.data(a,g);b!==c&&(h.fireHandler(a,t,{prevVal:c,newVal:b}),k.data(a,g,b))}function r(a){k.hasData(a,f)||
k.data(a,f,setTimeout(function o(){d(a);k.data(a,f,setTimeout(o,j))},j))}function m(a){var b=a.target;"focus"===a.type&&k.data(b,g,b.value);r(b)}function s(a){d(a.
target)}
function q(b){k.removeData(b,g);a(b);h.detach(b,"blur",c);h.detach(b,"webkitspeechchange",s);h.detach(b,"mousedown keyup keydown focus",m)}var k=b("dom"),h=b(
"./dom-event"),n=b("./special"),t="valuechange",e=k.nodeName,g="event/valuechange/history",f="event/valuechange/poll",j=50;n[t]={setup:function(){var a=e(this);if(
"input"===a||"textarea"===a)q(this),h.on(this,"blur",c),h.on(this,"webkitspeechchange",s),h.on(this,"mousedown keyup keydown focus",m)},tearDown:function(){q(this)}};
return h});
KISSY.add("event/dom/base","./base/dom-event,./base/object,./base/key-codes,./base/gesture,./base/special-events,./base/mouseenter,./base/valuechange".split(","),
function(i,b){var a=b("./base/dom-event"),c=b("./base/object"),d=b("./base/key-codes"),r=b("./base/gesture"),m=b("./base/special-events");b("./base/mouseenter");b(
"./base/valuechange");return i.merge({add:a.on,remove:a.detach,KeyCode:d,Gesture:r,Special:m,Object:c},a)});

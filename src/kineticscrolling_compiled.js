// KineticScrolling
// http://code.google.com/p/kineticscrolling/
// Copyright (c) 2010 Tatsuhiro Tsujikawa
// Released under the MIT License
var g=null;function i(){this.a=g;this.b=[];this.m=this.h=this.i=this.l=this.f=this.c=g;this.d=new KineticScrollingOverlay_;this.g=5.0E-5;this.j=50}function k(a,b){return Math.sqrt(b[0]*b[0]+b[1]*b[1])}function n(a,b,e,c,f,d,o,p){function m(h){var l=(new Date).getTime();if(!(l-h>a.j*3)){h=l-p;var j=h*h;h=b-c*j;j=f-o*j;if(h>1||j>1){a.a.panBy(h*e,j*d);a.c=window.setTimeout(function(){m(l)},a.j)}}}return m}function q(a){return function(){a.c&&window.clearTimeout(a.c);a.b=[]}}
function r(a){return function(){if(!(a.b.length<2)){for(var b=a.b[0].k,e=a.b[0].e,c=g,f=g,d=1;d<a.b.length;++d){if(e-a.b[d].e>200)break;c=a.b[d].k;f=a.b[d].e}if(c)if(e!=f){b=[b.x-c.x,b.y-c.y];d=k(a,b);if(d!=0){c=[1,0];c=Math.acos((b[0]*c[0]+b[1]*c[1])/(k(a,b)*k(a,c)));e=Math.min(40,d/(e-f)*30);f=Math.cos(c);c=Math.sin(c);d=(new Date).getTime();n(a,Math.abs(f)*e,b[0]>=0?1:-1,Math.abs(f*a.g),Math.abs(c)*e,b[1]>=0?1:-1,Math.abs(c*a.g),d)(d)}}}}}
function s(a){return function(){a.b.unshift({k:a.d.getProjection().fromLatLngToDivPixel(a.a.getCenter()),e:(new Date).getTime()});a.b.length>100&&a.b.pop()}}
i.prototype.setMap=function(a){if(this.a!=a){var b=this,e=function(){b.c&&window.clearTimeout(b.c)};if(this.a){google.maps.event.removeListener(this.f);google.maps.event.removeListener(this.l);google.maps.event.removeListener(this.i);google.maps.event.removeListener(this.h);google.maps.event.removeListener(this.n);this.d.setMap(g);e()}if(this.a=a){this.d.setMap(this.a);this.f=google.maps.event.addListener(this.a,"click",e);this.l=google.maps.event.addListener(this.a,"zoom_changed",e);this.i=google.maps.event.addListener(this.a,
"dragstart",q(this));this.h=google.maps.event.addListener(this.a,"dragend",r(this));this.m=google.maps.event.addListener(this.a,"drag",s(this))}}};i.prototype.getMap=function(){return this.a};function KineticScrollingOverlay_(){}KineticScrollingOverlay_.prototype=new google.maps.OverlayView;KineticScrollingOverlay_.prototype.onAdd=function(){};KineticScrollingOverlay_.prototype.draw=function(){};KineticScrollingOverlay_.prototype.onRemove=function(){};window.KineticScrolling=i;
i.prototype.getMap=i.prototype.getMap;i.prototype.setMap=i.prototype.setMap;window.KineticScrollingOverlay_=KineticScrollingOverlay_;KineticScrollingOverlay_.onAdd=KineticScrollingOverlay_.prototype.onAdd;KineticScrollingOverlay_.draw=KineticScrollingOverlay_.prototype.draw;KineticScrollingOverlay_.onRemove=KineticScrollingOverlay_.prototype.onRemove;

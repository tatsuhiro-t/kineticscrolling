// KineticScrolling
// 
// The MIT License
//
// Copyright (c) 2010 Tatsuhiro Tsujikawa
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
/**
 * Adds A kinetic scrolling feature to google map created using Google
 * Maps Javascript API V3.
 * 
 * @constructor
 */
function KineticScrolling() {
    /**
     * @private
     */
    this.map_ = null;

    /**
     * Track of mouse movement while user is dragging a map.  The each
     * element has 2 properties: point and time.  point is x-y
     * coordinate of the mouse position and time is the milliseconds
     * from epoch when the mouse pointer is positioned at that point.
     * @private
     */
    this.points_ = [];

    /**
     * @private
     */
    this.scrollTimeoutId_ = null;

    /**
     * @private
     */
    this.clickListener_ = null;

    /**
     * @private
     */
    this.zoomChangedListener_ = null;

    /**
     * @private
     */
    this.dragStartListener_ = null;

    /**
     * @private
     */
    this.dragEndListener_ = null;

    /**
     * @private
     */
    this.mouseMoveEventListener_ = null;

    /**
     * @constructor
     * @base google.maps.OverlayView
     */
    function NullOverlayView() {}
    NullOverlayView.prototype = new google.maps.OverlayView;
    NullOverlayView.prototype.onAdd = function() {};
    NullOverlayView.prototype.draw = function() {};
    NullOverlayView.prototype.onRemove = function() {};
    
    /**
     * @private
     */
    this.overlay_ = new NullOverlayView();

    /**
     * @private
     */
    this.deceleration_ = 0.00005;

    /**
     * @private
     */
    this.panInterval_ = 50;
}

/**
 * Calculates the length of 2-dimensional vector v.
 * @private
 * @param {Array.<Number>} v
 * @return Number
 */
KineticScrolling.prototype.vecLength_ = function(v) {
    return Math.sqrt(v[0]*v[0]+v[1]*v[1]);
};

/**
 * Calculates dot product of 2-dimensional vector v1 and v2.
 * @private
 * @param {Array.<Number>} v1
 * @param {Array.<Number>} v2
 * @return {Number}
 */
KineticScrolling.prototype.dotProduct_ = function(v1, v2) {
    return v1[0]*v2[0]+v1[1]*v2[1];
};

/**
 * Calculates angle of 2-dimensional vector v1 and v2.
 * @private
 * @param {Array.<Number>} v1
 * @param {Array.<Number>} v2
 * @return {Number}
 */
KineticScrolling.prototype.angle_ = function(v1, v2) {
    var costheta = this.dotProduct_(v1, v2)/
        (this.vecLength_(v1)*this.vecLength_(v2));
    return Math.acos(costheta);
};

/**
 * Returns function to scroll map.
 * @private
 * @param {Number} xv Initial scroll length of x-axis.
 * @param {Number} xd Direction of scroll of x-axis. 1: right. -1: left.
 * @param {Number} xa Deceleration of x-axis.
 * @param {Number} yv Initial scroll length of y-axix.
 * @param {Number} yd Direction of scroll of y-axis. 1: down. -1: up.
 * @param {Number} ya Deceleration of y-axis.
 * @param {Number} baseTime Time in milliseconds from epoc when scroll begins.
 * @return {Function}
 */
KineticScrolling.prototype.genPartialScrollFun_ = function(
    xv, xd, xa, yv, yd, ya, baseTime) {
    var that = this;
    var scroll = function(prevTime) {
        var now = new Date().getTime();
        // If scroll is not called in certain time interval, we stop
        // scroll. That is too slow to show smooth animation.
        if(now-prevTime > that.panInterval_*3) {
            return;
        }
        var elapsed = now-baseTime;
        var t2 = elapsed*elapsed;
        var dx = xv-xa*t2;
        var dy = yv-ya*t2;
        if(dx > 0.000001 || dy > 0.000001) {
            that.map_.panBy(dx*xd, dy*yd);
            that.scrollTimeoutId_ = window.setTimeout(
                function() {
                    scroll(now);
                },
                that.panInterval_);
        }
    };
    return scroll;
};

/**
 * @private
 */
KineticScrolling.prototype.genDragstartCallback_ = function() {
    var that = this;
    return function() {
        that.stopScroll_();
        that.mouseMoveEventListener_ =
            google.maps.event.addListener(that.map_, 'mousemove',
                                          that.genMouseMoveCallback_());
        that.points_ = [];
    };
};

/**
 * @private
 */
KineticScrolling.prototype.genDragendCallback_ = function() {
    var that = this;
    return function() {
        google.maps.event.removeListener(that.mouseMoveEventListener_);
        that.mouseMoveEventListener_ = null;
        if(that.points_.length < 2) {
            return;
        }
        var endPoint = that.points_[0].point;
        var endTime = that.points_[0].time;
        var startPoint = null;
        var startTime = null;
        for(var i = 1; i < that.points_.length; ++i) {
            if(endTime-that.points_[i].time > 200) {
                break;
            }
            startPoint = that.points_[i].point;
            startTime = that.points_[i].time;
        }
        if(!startPoint) {
            return;
        }
        if(endTime == startTime) {
            return;
        }
        var v1 = [endPoint.x-startPoint.x, endPoint.y-startPoint.y];
        var len = that.vecLength_(v1);
        if(len < 0.000001) {
            return;
        }
        var v2 = [1, 0];
        var theta = that.angle_(v1, v2);
        if(len > 0) {
            var initial = Math.min(40, len/(endTime-startTime)*30);
            var cosTheta = Math.cos(theta);
            var sinTheta = Math.sin(theta);
            var now = new Date().getTime();
            that.genPartialScrollFun_(Math.abs(cosTheta)*initial,
                                      v1[0] < 0?1:-1,
                                      Math.abs(cosTheta*that.deceleration_),
                                      Math.abs(sinTheta)*initial,
                                      v1[1] < 0?1:-1,
                                      Math.abs(sinTheta*that.deceleration_),
                                      now)(now);
        }
    };
};

/**
 * @private
 */
KineticScrolling.prototype.genMouseMoveCallback_ = function() {
    var that = this;
    return function(event) {
        var projection = that.overlay_.getProjection();
        var point = projection.fromLatLngToContainerPixel(event.latLng);
        that.points_.unshift({point:point, time:new Date().getTime()});
        if(that.points_.length > 100) {
            that.points_.pop();
        }
    };
};

/**
 * @private
 */
KineticScrolling.prototype.removeMapsEventLister_ = function() {
    google.maps.event.removeListener(this.clickListener_);
    google.maps.event.removeListener(this.zoomChangedListener_);
    google.maps.event.removeListener(this.dragStartListener_);
    google.maps.event.removeListener(this.dragEndListener_);
    if(this.mouseMoveEventListener_) {
        google.maps.event.removeListener(this.mouseMoveEventListener_);
    }
};

/**
 * @private
 */
KineticScrolling.prototype.stopScroll_ = function() {
    if(this.scrollTimeoutId_) {
        window.clearTimeout(this.scrollTimeoutId_);
    }    
};

/**
 * Adds kinetic scrolling functionality to map.  To remove kinetic
 * scrolling from map, call this function with null.  When this
 * function was called with a map A before and this function is called
 * with different map B again, then first the kinetic scrolling is
 * removed from A. Then it is added to B.
 * @param {google.maps.Map} map
 */
KineticScrolling.prototype.setMap = function(map) {
    if(this.map_ == map) {
        return;
    }
    var that = this;
    var stopScroll = function() {
        that.stopScroll_();
    };
    if(this.map_) {
        this.removeMapsEventLister_();
        this.overlay_.setMap(null);
        stopScroll();
    }
    this.map_ = map;
    if(this.map_) {
        this.overlay_.setMap(this.map_);
        this.clickListener_ =
            google.maps.event.addListener(this.map_, 'click',
                                          stopScroll);

        this.zoomChangedListener_ =
            google.maps.event.addListener(this.map_, 'zoom_changed',
                                          stopScroll);

        this.dragStartListener_ =
            google.maps.event.addListener(this.map_, 'dragstart',
                                          this.genDragstartCallback_());

        this.dragEndListener_ =
            google.maps.event.addListener(this.map_, 'dragend',
                                          this.genDragendCallback_());  
    }
};

KineticScrolling.prototype.getMap = function() {
    return this.map_;
}

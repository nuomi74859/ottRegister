/**
 * Created by nuomi on 14-7-24.
 */
;(function($){
    'use strict';
    $.fn.keyFocus = function(options){
        var self = this;
        var opt = $.extend({
            'activeClass':'on'
        },options);
        var tData = [];
        self.each(function(n,v){
            var $v = $(v);
            var vLeft = $v.offset().left + $v.width() / 2, vTop = $v.offset().top + $v.height() / 2;
            var vP = Math.sqrt(vLeft * vLeft + vTop * vTop);
            tData.push({'target':$v,'offset':vP});
        });
        tData.sort(function(a, b){
            return a.offset - b.offset;
        });
        var nowTarget = tData[0];
        var contrast = function(thisTar, op){
            var conData = [];
            var thisL = thisTar['target'].offset().left + thisTar['target'].width() / 2, thisT = thisTar['target'].offset().top + thisTar['target'].height() / 2;
            switch (op) {
                case 37: {
                    conData = [];
                    $.each(tData, function(n,v){
                        var nextL = v['target'].offset().left + v['target'].width() / 2, nextT = v['target'].offset().top + v['target'].height() / 2;
                        if(nextL != thisL || nextT != thisT) {
                            if(nextL < thisL && Math.abs(thisL-nextL) >= Math.abs(thisT - nextT)) {
                                v['offset'] = Math.sqrt(Math.abs((thisL - nextL) * (thisL - nextL)) + Math.abs((thisT - nextT) * (thisT - nextT)));
                                conData.push(v);
                            }
                        }
                    });
                    conData.sort(function(a,b){
                        return a.offset - b.offset;
                    });
                    break;
                }
                case 39: {
                    conData = [];
                    $.each(tData, function(n,v){
                        var nextL = v['target'].offset().left + v['target'].width() / 2, nextT = v['target'].offset().top + v['target'].height() / 2;
                        if(nextL != thisL || nextT != thisT) {
                            if(nextL > thisL && Math.abs(thisL-nextL) >= Math.abs(thisT - nextT)) {
                                v['offset'] = Math.sqrt(Math.abs((thisL - nextL) * (thisL - nextL)) + Math.abs((thisT - nextT) * (thisT - nextT)));
                                conData.push(v);
                            }
                        }
                    });
                    conData.sort(function(a,b){
                        return a.offset - b.offset;
                    });
                    break;
                }
                case 38: {
                    conData = [];
                    $.each(tData, function(n,v){
                        var nextL = v['target'].offset().left + v['target'].width() / 2, nextT = v['target'].offset().top + v['target'].height() / 2;
                        if(nextL != thisL || nextT != thisT) {
                            if(nextT < thisT && Math.abs(thisL-nextL) <= Math.abs(thisT - nextT)) {
                                v['offset'] = Math.sqrt(Math.abs((thisL - nextL) * (thisL - nextL)) + Math.abs((thisT - nextT) * (thisT - nextT)));
                                conData.push(v);
                            }
                        }
                    });
                    conData.sort(function(a,b){
                        return a.offset - b.offset;
                    });
                    break;
                }
                case 40: {
                    conData = [];
                    $.each(tData, function(n,v){
                        var nextL = v['target'].offset().left + v['target'].width() / 2, nextT = v['target'].offset().top + v['target'].height() / 2;
                        if(nextL != thisL || nextT != thisT) {
                            if(nextT > thisT && Math.abs(thisL-nextL) <= Math.abs(thisT - nextT)) {
                                v['offset'] = Math.sqrt(Math.abs((thisL - nextL) * (thisL - nextL)) + Math.abs((thisT - nextT) * (thisT - nextT)));
                                conData.push(v);
                            }
                        }
                    });
                    conData.sort(function(a,b){
                        return a.offset - b.offset;
                    });
                    break;
                }
                default: conData[0] = '';
            }
            if(conData.length > 0 && conData[0] != '') {
                return conData[0];
            }
        };
        $(document).on({
            'keydown.keyFocus':function(e){
                var thisObj = contrast(nowTarget, e.keyCode);
                if (typeof(thisObj) != 'undefined' && nowTarget['target'].length > 0){
                    self.removeClass(opt.activeClass);
                    thisObj['target'].addClass(opt.activeClass);
                    nowTarget = thisObj;
                }
            }
        });
    }
})(jQuery);

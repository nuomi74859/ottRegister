/*! ottRegister 03-09-2014 */
!function($){"use strict";$.fn.keyFocus=function(options){var self=this,opt=$.extend({activeClass:"on"},options),tData=[];self.each(function(n,v){var $v=$(v),vLeft=$v.offset().left+$v.width()/2,vTop=$v.offset().top+$v.height()/2,vP=Math.sqrt(vLeft*vLeft+vTop*vTop);tData.push({target:$v,offset:vP})}),tData.sort(function(a,b){return a.offset-b.offset});var nowTarget=tData[0],contrast=function(thisTar,op){var conData=[],thisL=thisTar.target.offset().left+thisTar.target.width()/2,thisT=thisTar.target.offset().top+thisTar.target.height()/2;switch(op){case 37:conData=[],$.each(tData,function(n,v){var nextL=v.target.offset().left+v.target.width()/2,nextT=v.target.offset().top+v.target.height()/2;(nextL!=thisL||nextT!=thisT)&&thisL>nextL&&Math.abs(thisL-nextL)>=Math.abs(thisT-nextT)&&(v.offset=Math.sqrt(Math.abs((thisL-nextL)*(thisL-nextL))+Math.abs((thisT-nextT)*(thisT-nextT))),conData.push(v))}),conData.sort(function(a,b){return a.offset-b.offset});break;case 39:conData=[],$.each(tData,function(n,v){var nextL=v.target.offset().left+v.target.width()/2,nextT=v.target.offset().top+v.target.height()/2;(nextL!=thisL||nextT!=thisT)&&nextL>thisL&&Math.abs(thisL-nextL)>=Math.abs(thisT-nextT)&&(v.offset=Math.sqrt(Math.abs((thisL-nextL)*(thisL-nextL))+Math.abs((thisT-nextT)*(thisT-nextT))),conData.push(v))}),conData.sort(function(a,b){return a.offset-b.offset});break;case 38:conData=[],$.each(tData,function(n,v){var nextL=v.target.offset().left+v.target.width()/2,nextT=v.target.offset().top+v.target.height()/2;(nextL!=thisL||nextT!=thisT)&&thisT>nextT&&Math.abs(thisL-nextL)<=Math.abs(thisT-nextT)&&(v.offset=Math.sqrt(Math.abs((thisL-nextL)*(thisL-nextL))+Math.abs((thisT-nextT)*(thisT-nextT))),conData.push(v))}),conData.sort(function(a,b){return a.offset-b.offset});break;case 40:conData=[],$.each(tData,function(n,v){var nextL=v.target.offset().left+v.target.width()/2,nextT=v.target.offset().top+v.target.height()/2;(nextL!=thisL||nextT!=thisT)&&nextT>thisT&&Math.abs(thisL-nextL)<=Math.abs(thisT-nextT)&&(v.offset=Math.sqrt(Math.abs((thisL-nextL)*(thisL-nextL))+Math.abs((thisT-nextT)*(thisT-nextT))),conData.push(v))}),conData.sort(function(a,b){return a.offset-b.offset});break;default:conData[0]=""}return conData.length>0&&""!=conData[0]?conData[0]:void 0};$(document).on({"keydown.keyFocus":function(e){var thisObj=contrast(nowTarget,e.keyCode);"undefined"!=typeof thisObj&&nowTarget.target.length>0&&(self.removeClass(opt.activeClass),thisObj.target.addClass(opt.activeClass),nowTarget=thisObj)}})}}(jQuery);
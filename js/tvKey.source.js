/*! ottRegister 04-09-2014 */
$(document).ready(function(){var AndroidPlatform=!0;navigator.userAgent.indexOf("Android")<=0&&(AndroidPlatform=!1),androidKeyHandler=function(){this.target="focusBtn:visible",this.focusClass="on",this.focusInputState="import",this.parent="html",this.defaultBtn="defaultBtn",this.keyBoardChars=["@","~","!","_","-","#","&","*","(",")"],this.debug=!1,this.KEYS=AndroidPlatform?{ENTER:23,LEFT:21,UP:19,RIGHT:22,DOWN:20,BACK:4,DEL:67}:{ENTER:13,LEFT:37,UP:38,RIGHT:39,DOWN:40,BACK:27,DEL:46},this.btns="",this.currentBtnElement="",this.keyboardIsShow=!1,this.currentInputTarget="",this.backEvent=!1},androidKeyHandler.prototype={init:function($start){console.log("akh init....");var self=this;self.btns=$(self.parent+" ."+self.target).add($("."+self.focusInputState)),self.btns.each(function(index,element){var o=$(element),offset=o.offset();o.data("w",o.outerWidth()).data("h",o.outerHeight()).data("l",offset.left).data("r",offset.left+o.data("w")).data("t",offset.top).data("b",offset.top+o.data("h"))});var focusBtn="";if($start instanceof jQuery?($(self.parent+" ."+self.focusClass).removeClass(self.focusClass),focusBtn=$start):"undefined"!=typeof $start&&$start>=0?($(self.parent+" ."+self.focusClass).removeClass(self.focusClass),focusBtn=self.btns.eq($start)):focusBtn=$(self.parent).find("."+self.defaultBtn).length>0?$(self.parent).find("."+self.defaultBtn).eq(0):$(self.parent+" ."+self.focusClass+":visible").length>0?$(self.parent+" ."+self.focusClass+":visible").eq(0):self.btns.eq(0),self.currentBtnElement=focusBtn,self.currentBtnElement.addClass(self.focusClass),self.debug){var debugBoxHtml=$('<div id="tvKeyDebugBox"></div>');debugBoxHtml.css({position:"absolute",left:0,top:0,padding:"6px",background:"rgba(0,0,0,0.2)",color:"#fff",zIndex:999999}),0==$("#tvKeyDebugBox").length&&$("body").append(debugBoxHtml),self.debugMsg.clear(),self.debugMsg.push("is debug.........")}},keymove:function($key){var self=this;if(self.debug&&self.debugMsg.push("按键: "+$key),self.debug){{$('<div id="tvKeyDebugBox">按键'+$key+"</div>")}$("body").append("")}if(self.btns.length<1&&self.init(),$key==self.KEYS.ENTER||66==$key)return self.isInput(self.currentBtnElement)&&!self.currentBtnElement.hasClass(self.focusInputState)?self.keyboardShow(self.currentBtnElement):self.currentBtnElement.trigger("click"),!1;if(AndroidPlatform&&$key>=7&&16>=$key&&""!=self.currentInputTarget&&self.currentInputTarget.val(self.currentInputTarget.val()+($key-7)),$key==self.KEYS.DEL&&""!=self.currentInputTarget&&self.delInputVal(self.currentInputTarget),$key==self.KEYS.BACK&&(self.backEvent?self.backEvent.apply():window.history.go(-1)),$key==self.KEYS.LEFT){if(self.currentBtnElement.hasClass(self.focusInputState)){var cursorIndex=self.getCursorPosition(self.currentBtnElement);return cursorIndex>0&&self.setCursorPosition(self.currentBtnElement,cursorIndex-1),!1}self.filterBtn(self.btns,"L"),$(self.parent).trigger("leftKey")}if($key==self.KEYS.UP&&(self.filterBtn(self.btns,"U"),$(self.parent).trigger("upKey")),$key==self.KEYS.RIGHT){if(self.currentBtnElement.hasClass(self.focusInputState)){var cursorIndex=self.getCursorPosition(self.currentBtnElement);return cursorIndex<self.currentBtnElement.val().length&&self.setCursorPosition(self.currentBtnElement,cursorIndex+1),!1}self.filterBtn(self.btns,"R"),$(self.parent).trigger("rightKey")}$key==self.KEYS.DOWN&&(self.filterBtn(self.btns,"D"),$(self.parent).trigger("downKey"))},keyboardShow:function($obj){var self=this,offset=$obj.offset(),keyboardName="keyboard_all";$obj.attr("keyboard")&&(keyboardName=$obj.attr("keyboard")),$("#"+keyboardName).css({left:offset.left,top:offset.top+$obj.height()+5}).show(),self.parent="#"+keyboardName,self.backEvent=function(){self.keyboardHide()},self.keyboardIsShow=!0,self.currentInputTarget=$obj,$obj.removeClass(self.focusClass).addClass(self.focusInputState),self.setCursorPosition($obj,$obj.val().length),self.init(1),$(".keyBoardTargetFlag li").unbind("click").click(function(){var currentBtnElement=$(this),input=self.currentInputTarget,cursorIndex=self.getCursorPosition(input),val=input.val(),val1=val.substr(0,cursorIndex),val2=val.substr(cursorIndex,input.val().length),keyboardBox=currentBtnElement.parent();currentBtnElement.hasClass("closekeyboard")?self.keyboardHide():currentBtnElement.hasClass("delinput")?self.delInputVal(input):currentBtnElement.hasClass("okbtn")?self.keyboardHide():currentBtnElement.hasClass("lowercase")?(keyboardBox.find(".letter").each(function(){var o=$(this);o.html(o.html().toLowerCase())}),currentBtnElement.html("大写"),currentBtnElement.removeClass("lowercase"),currentBtnElement.addClass("uppercase")):currentBtnElement.hasClass("uppercase")?(keyboardBox.find(".letter").each(function(){$(this).html($(this).html().toUpperCase())}),currentBtnElement.html("小写"),currentBtnElement.removeClass("uppercase"),currentBtnElement.addClass("lowercase")):currentBtnElement.hasClass("tochar")?(keyboardBox.find(".number").each(function(i){$(this).html(akh.keyBoardChars[i])}),currentBtnElement.html("123"),currentBtnElement.removeClass("tochar"),currentBtnElement.addClass("tonumber")):currentBtnElement.hasClass("tonumber")?(keyboardBox.find(".number").each(function(i){$(this).html(i)}),currentBtnElement.html("字符"),currentBtnElement.removeClass("tonumber"),currentBtnElement.addClass("tochar")):(input.val(val1+currentBtnElement.text()+val2),angular&&angular.element(input).triggerHandler("change"),self.setCursorPosition(input,cursorIndex+1))})},delInputVal:function($input){var self=this,cursorIndex=self.getCursorPosition($input),val=$input.val(),val1=val.substr(0,cursorIndex),val2=val.substr(cursorIndex,$input.val().length);$input.val(val1.substr(0,val1.length-1)+val2),angular&&angular.element($input).triggerHandler("change"),self.setCursorPosition($input,cursorIndex-1)},keyboardHide:function(){var self=this;triggerOnInput(self.currentInputTarget.attr("name")),$(".keyBoardTargetFlag").hide(),self.keyboardIsShow=!1,self.parent="body",self.backEvent=!1,self.currentInputTarget.removeClass(self.focusInputState);var index=$(self.parent+" ."+self.target).index(self.currentInputTarget);self.currentInputTarget.blur(),self.currentInputTarget="",self.init(index)},filterBtn:function($btns,$direction){var self=this,newBtn="",range=0,currentBtnElement=self.currentBtnElement,b=[];b.l=currentBtnElement.data("l"),b.t=currentBtnElement.data("t"),b.w=currentBtnElement.data("w"),b.h=currentBtnElement.data("h"),b.x=b.l+b.w/2,b.y=b.t+b.h/2;var DTarget=currentBtnElement.attr("direction");if(DTarget&&""!=DTarget&&(DTarget=DTarget.split(":")),DTarget&&DTarget[0]==$direction&&(newBtn=$.isNumeric(DTarget[1])?$(self.parent+" ."+self.target).eq(+DTarget[1]):$(DTarget[1])),""==newBtn){var cbePa=currentBtnElement.parents(".focusLayout");cbePa.length>0&&cbePa.attr("scroll")&&!self.isBorderElement(currentBtnElement,$direction)&&($btns=cbePa.find("."+self.target))}""==newBtn&&$btns.each(function(index,element){var o=$(element),a=[];a.l=o.data("l"),a.t=o.data("t"),a.w=o.data("w"),a.h=o.data("h"),a.x=a.l+a.w/2,a.y=a.t+a.h/2,"U"==$direction&&(a.l+a.w<b.l||a.l>b.l+b.w||a.t+a.h<=b.t+1&&(r=self.distance(b.x,b.t,a.x,a.y),""==newBtn?(newBtn=o,range=r):range>r&&(range=r,newBtn=o))),"D"==$direction&&(a.l+a.w<b.l||a.l>b.l+b.w||a.t>b.t&&(r=self.distance(b.x,b.t+b.h,a.x,a.y),""==newBtn?(newBtn=o,range=r):range>r&&(range=r,newBtn=o))),"L"==$direction&&(a.t+a.h<b.t||a.t>b.t+b.h||a.l+a.w<=b.l&&(r=self.distance(b.l,b.y,a.x,a.y),""==newBtn?(newBtn=o,range=r):range>r&&(range=r,newBtn=o))),"R"==$direction&&(a.t+a.h<b.t||a.t>b.t+b.h||a.l>=b.l+b.w&&(r=self.distance(b.l+b.w,b.y,a.x,a.y),""==newBtn?(newBtn=o,range=r):range>r&&(range=r,newBtn=o)))}),""==newBtn&&$btns.each(function(index,element){var o=$(element),a=[];a.l=o.data("l"),a.t=o.data("t"),a.w=o.data("w"),a.h=o.data("h"),a.x=a.l+a.w/2,a.y=a.t+a.h/2,"U"==$direction&&a.t+a.h<b.t&&(r=self.distance(b.x,b.t,a.x,a.y),""==newBtn?(newBtn=o,range=r):range>r&&(range=r,newBtn=o)),"D"==$direction&&a.t>b.t&&(r=self.distance(b.x,b.t+b.h,a.x,a.y),""==newBtn?(newBtn=o,range=r):range>r&&(range=r,newBtn=o)),"L"==$direction&&a.l+a.w<b.l&&(r=self.distance(b.l,b.y,a.x,a.y),""==newBtn?(newBtn=o,range=r):range>r&&(range=r,newBtn=o)),"R"==$direction&&a.l>b.l+b.w&&(r=self.distance(b.l+b.w,b.y,a.x,a.y),""==newBtn?(newBtn=o,range=r):range>r&&(range=r,newBtn=o))}),""!=newBtn?self.setCurBtn(newBtn,$direction):self.debug&&self.debugMsg.push("tvKey no target!!! ")},setCurBtn:function($btn,$direction){var self=this,curLayout=self.currentBtnElement.parents(".focusLayout"),targetLayout=$btn.parents(".focusLayout"),curLayoutBtns=curLayout.find("."+self.target),curLayoutIndex=curLayoutBtns.index(self.currentBtnElement);if(curLayout.attr("layoutIndex",curLayoutIndex),curLayout.attr("class")!=targetLayout.attr("class")&&curLayout.attr("direction")&&curLayout.attr("direction").indexOf($direction)<0)return!1;if(curLayout.attr("class")!=targetLayout.attr("class")&&!$btn.hasClass(self.focusInputState)&&(self.debug&&self.debugMsg.push("layout change..."),targetLayout.attr("layoutIndex"))){var index=+targetLayout.attr("layoutIndex");$btn=targetLayout.find("."+self.target).eq(index)}return self.isInput(self.currentBtnElement)&&!self.currentBtnElement.hasClass(self.focusInputState)&&self.currentBtnElement.trigger("blur"),self.currentBtnElement.removeClass(self.focusClass),self.currentBtnElement.trigger("focusOut"),self.debug&&(self.isInput(self.currentBtnElement)?self.currentBtnElement.attr("debugname",self.currentBtnElement.attr("placeholder")):self.currentBtnElement.attr("debugname",self.currentBtnElement.text()),self.isInput($btn)?$btn.attr("debugname",$btn.attr("placeholder")):$btn.attr("debugname",$btn.text()),self.debugMsg.push("焦点： ["+self.currentBtnElement.attr("debugname")+"] 到 ["+$btn.attr("debugname")+"]")),$btn.addClass(self.focusClass),self.currentBtnElement=$btn,$btn.trigger("focusIn"),self.needScroll($direction),$btn},distance:function(x1,y1,x2,y2){var calX=x2-x1,calY=y2-y1;return Math.pow(calX*calX+calY*calY,.5)},isBorderElement:function($obj,$direction){var self=this,pa=$obj.parents(".focusLayout"),isBE=!0;return"L"==$direction&&pa.find("."+self.target).each(function(){var o=$(this);o.data("l")<$obj.data("l")&&(isBE=!1)}),"R"==$direction&&pa.find("."+self.target).each(function(){var o=$(this);o.data("r")>$obj.data("r")&&(isBE=!1)}),"U"==$direction&&pa.find("."+self.target).each(function(){var o=$(this);o.data("t")<$obj.data("t")&&(isBE=!1)}),"D"==$direction&&pa.find("."+self.target).each(function(){var o=$(this);o.data("b")>$obj.data("b")&&(isBE=!1)}),isBE},isInput:function($obj){return $.inArray($obj.attr("type"),["text","password","number","email"])>=0},setCursorPosition:function(ctrl,pos){ctrl=ctrl[0],ctrl.setSelectionRange&&(ctrl.focus(),ctrl.setSelectionRange(pos,pos))},getCursorPosition:function(ctrl){ctrl=ctrl[0];var CaretPos=0;return(ctrl.selectionStart||"0"==ctrl.selectionStart)&&(CaretPos=ctrl.selectionStart),CaretPos},needScroll:function($direction){var self=this,layout=self.currentBtnElement.parents(".focusLayout");if(!(layout.length<1||"undefined"==typeof layout.attr("scroll"))){var currentBtn=self.currentBtnElement,pw=layout.width(),ph=layout.height(),pl=layout.offset().left,pt=layout.position().top,sw=currentBtn.width(),sh=currentBtn.height(),sl=currentBtn.position().left,st=currentBtn.position().top,result={};result.left=pl+pw-(sl+sw),result.bottom=pt+ph-(st+sh),result.top=pt-st,result.right=pl-sl;var distanceFromLeft=layout.scrollLeft(),margin=parseInt(currentBtn.css("margin-left"));return"R"==$direction&&result.left<0?void layout.scrollLeft(distanceFromLeft+sl-pl-margin):"L"==$direction&&result.right>0?void layout.scrollLeft(distanceFromLeft-(pw-(sl+sw)-margin)):void akh.init(currentBtn)}},debugMsg:{push:function($msg){var self=this,box=$("#tvKeyDebugBox");box.fadeIn(),10==box.find("p").length&&box.find("p").eq(0).remove(),box.html(box.html()+"<p>"+$msg+"</p>"),clearTimeout(self.debugTimeout),self.debugTimeout=setTimeout(function(){box.fadeOut()},5e3)},clear:function(){$("#tvKeyDebugBox").html("")}}},window.akh=new androidKeyHandler,AndroidPlatform?window.keymove=function($key){akh.keymove($key)}:$(document).keydown(function(e){if(!window.closeTvkey){var windowsKeys=[13,37,38,39,40,27,46];return $.inArray(e.keyCode,windowsKeys)>=0?(akh.keymove(e.keyCode),e.preventDefault(),!1):void 0}}),$(".focusBtn").live("mousedown",function(){var o=$(this);$(".focusBtn.on").removeClass("on"),o.addClass("on"),akh.init()}),$("aspan.focusBtn").live("click",function(e){var o=$(this),href=o.attr("href");return href&&""!=href&&""!=href&&href.indexOf("javascript")<0?(location.href=href,e.preventDefault(),!1):void 0})});
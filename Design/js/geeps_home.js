/*
** 이벤트 처리
*/
$(window).load(onLoad);

function onLoad() {
	//startRotator(".rolling");
    scroller = new Scroller(".rolling", "scroller", 5000);
	$(".button").bind( "click", onClick_Button);
	$(".menu a").bind( "mouseenter", onMouseEnter_Menu).bind( "mouseleave", onMouseLeave_Menu);
	$(".submenu").bind( "mouseenter", onMouseEnter_Submenu).bind( "mouseleave", onMouseLeave_Submenu);
}

function onClick_Button(event) {
	var name = event.currentTarget.name;
    switch (name) {
        case "prev":
            scroller.rotateForward(".rolling");
            break;
        case "next":
            scroller.rotateBackward(".rolling");
            break;
        default:
            alert(name);
            break;
    }
}

function onMouseEnter_Menu(event) {
	var name = event.currentTarget.className;
    $(".submenu."+name).show();
}
function onMouseLeave_Menu(event) {
	var name = event.currentTarget.className;
    $(".submenu."+name).hide();
}

function onMouseEnter_Submenu(event) {
	var name = event.currentTarget.className.replace("submenu ", "");
    $(".submenu."+name).show();
}
function onMouseLeave_Submenu(event) {
	var name = event.currentTarget.className.replace("submenu ", "");
    $(".submenu").hide();
}

/*
** 배너 회전
*/
var Scroller = function(elem, name, interval) {
    this.elem = elem;
    this.name = name;
    if (!interval) interval = 10000;
    this.interval = interval;
    this.setTimeout();
};

Scroller.prototype.setTimeout = function() {
    if (this.timmer) clearTimeout(this.timmer);
    this.timmer = setTimeout(this.name+".rotateForward()", this.interval);
};

Scroller.prototype.rotateForward = function() {
    this.setTimeout();
    var first = $(this.elem+" li:first");
    if (first) {
        first.remove();
        $(this.elem+" ul").append(first);
    }
};

Scroller.prototype.rotateBackward = function() {
    this.setTimeout();
    var last = $(this.elem+" li:last");
    if (last) {
        last.remove();
        var first = $(this.elem+" li:first");
        if (first)
            $(first).before(last);
        else
            $(this.elem+" ul").append(last);
    }
};

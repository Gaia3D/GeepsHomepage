/*
** 이벤트 처리
*/
$(window).load(onLoad);

function onLoad() {
    $scroller = new Scroller(".rolling", "$scroller", 5000);
	$("button").bind( "click", onClick_Button);
	$(".menu button").bind( "mouseenter", onMouseEnter_Menu).bind( "mouseleave", onMouseLeave_Menu);
	$(".submenu").bind( "mouseenter", onMouseEnter_Submenu).bind( "mouseleave", onMouseLeave_Submenu);
}

// act by datatype and datasrc
function onClick_Button(event) {
    var obj = $(event.currentTarget);
	var datatype = obj.attr("datatype");
    var datasrc = obj.attr("datasrc");

    switch (datatype) {
        case "banner":
            switch (datasrc) {
                case "prev":
                    $scroller.rotateForward();
                    break;
                case "next":
                    $scroller.rotateBackward();
                    break;
            }
            break;

        case "wiki":
            var menu = findMenu(obj);
            var submenu = obj.text();
            var title = datasrc ? datasrc : submenu;
            loadWiki(menu, submenu, title);
            break;

        case "move_to":
            location.href = datasrc;
            break;

        case "link":
            window.open(datasrc);
            break;

        case "download":
            $.fileDownload(datasrc);
            break;

        default :
            alert("Type: "+datatype+",  Src: "+datasrc);
            break;
    }
}

// Change menu UI
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
    $(".menu ."+name).addClass("on");
}

function onMouseLeave_Submenu(event) {
	var name = event.currentTarget.className.replace("submenu ", "");
    $(".submenu").hide();
    $(".menu ."+name).removeClass("on");
}

/*
** 배너 회전
*/
var Scroller = function(elem, name, interval) {
    this.elem = elem;
    this.name = name;
    this.interval = interval ? interval : 10000;
    this.setTimeout();
};

Scroller.prototype.setTimeout = function() {
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(this.name+".rotateForward()", this.interval);
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

/*
** WIKI
 */
function findMenu(obj) {
    var menuClass = null;
    if (obj.hasClass("about"))
        menuClass = "about";
    else if (obj.hasClass("edu"))
        menuClass = "edu";
    else if (obj.hasClass("down"))
        menuClass = "down";
    else if (obj.hasClass("tech"))
        menuClass = "tech";
    else if (obj.hasClass("com"))
        menuClass = "com";
    else if (obj.parents().hasClass("about"))
        menuClass = "about";
    else if (obj.parents().hasClass("edu"))
        menuClass = "edu";
    else if (obj.parents().hasClass("down"))
        menuClass = "down";
    else if (obj.parents().hasClass("tech"))
        menuClass = "tech";
    else if (obj.parents().hasClass("com"))
        menuClass = "com";

    return $(".menu ."+menuClass+" span").text();
}

function loadWiki(menu, submenu, title) {
    var apiUrl = "http://geeps.krihs.re.kr/wiki/index.php?action=render&title=" + title;
    var errorMessage ='<h1>죄송합니다.</h1> 요청한 자료를 읽지 못했습니다.<br>잠시 후 다시 시도해 주십시오.';

    $("#contents_title").html(title);
    $("#contents_menu").html(menu);
    $("#contents_submenu").html(submenu);
    $("#contents_html").html("내용을 불러오고 있습니다...");


    $.ajax({
        method: "GET",
        url: apiUrl,
        dataType: "html"
    }).done(function (html) {
        $("#contents_html").html(html);
    }).fail(function( jqXHR, textStatus ) {
        //alert( "Request failed: " + textStatus );
        $("#contents_html").html(errorMessage);
    });

    $("#contents_main").hide();
    $("#contents_wrap").show();
}
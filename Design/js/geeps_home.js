/*
** 이벤트 처리
*/
$(window).load(onLoad);

function onLoad() {
	$("#menu_container").load("/menu.html", attachEvent);
    $scroller = new Scroller(".rolling", "$scroller", 5000);
}

// 버튼에 이벤트 부착
function attachEvent() {
	$("button").bind( "click", onClick_Button);
	$(".menu button").bind( "mouseenter", onMouseEnter_Menu).bind( "mouseleave", onMouseLeave_Menu);
	$(".submenu").bind( "mouseenter", onMouseEnter_Submenu).bind( "mouseleave", onMouseLeave_Submenu);

    var wiki = getParameterByName("wiki");
    if (wiki) {
        var menu = "?", submenu = "?";
        var menuObj = findMenuByWiki(wiki);
        if (menuObj) {
            menu = menuObj.menu;
            submenu = menuObj.submenu;
        }
        loadWiki(menu, submenu, wiki);
    }
	else {
		$("#contents_main").show();
		$("#contents_wrap").hide();

        fillNotice();
        fillQNA();
	}
}

// act by datatype and datasrc
function onClick_Button(event) {
    var obj = $(event.currentTarget);
	var datatype = obj.attr("datatype");
    var datasrc = obj.attr("datasrc");

    switch (datatype) {
        case "ui":
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
            //var menu = findMenu(obj);
            var submenu = obj.text();
            var title = datasrc ? datasrc : submenu;
            //loadWiki(menu, submenu, title);
            searchText = "?wiki="+title;
			if ($("#contents_wrap").length) {
				location.search = searchText;
			} else {
				location.href = location.origin + "/" + searchText;
			}
            break;

        case "link":
            location.href = datasrc;
            break;

        case "window":
            window.open(datasrc);
            break;

        case "download":
            $.fileDownload(datasrc);
            break;

        default :
            //alert("Type: "+datatype+",  Src: "+datasrc);
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
function loadWiki(menu, submenu, title) {
    var apiUrl = "/wiki/index.php?action=render&title=" + encodeURIComponent(title);
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

/*
** BOARD
*/
function fillNotice() {
    $.ajax({
        method: "GET",
        url: "/board/bbs/api_board.php?bo_table=notice&li_num=6",
        dataType: "html"
    }).done(function (html) {
        $("#notice_list").html(html);
    }).fail(function( jqXHR, textStatus ) {
        //alert( "Request failed: " + textStatus );
        $("#notice_list").html('<li>게시물이 없습니다.</li>');
    });
}

function fillQNA() {
    $.ajax({
        method: "GET",
        url: "/board/bbs/api_board.php?bo_table=qna&li_num=6",
        dataType: "html"
    }).done(function (html) {
        $("#qna_list").html(html);
    }).fail(function( jqXHR, textStatus ) {
        //alert( "Request failed: " + textStatus );
        $("#qna_list").html('<li>게시물이 없습니다.</li>');
    });
}

/*
** UTIL
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
function findMenuByWiki(wiki) {
    var buttonList = $(".submenu button");
    for (var i=0; i<buttonList.length; i++) {
        var obj = $(buttonList[i]);
        var submenu = obj.text();
        var title = obj.attr("datasrc") ? obj.attr("datasrc") : submenu;
        if (title == wiki) {
            var menu = findMenu(obj);
            return {"menu":menu,"submenu":submenu};
        }
    }
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    var ret = (results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " ")));
    return ret.replace("<","").replace(">","");
}
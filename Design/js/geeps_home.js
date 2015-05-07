/*
** 이벤트 처리
*/
$(window).load(onLoad);

function onLoad() {
	//startRotator(".rolling");
    scroller = new Scroller(".rolling", "scroller", 5000);
	$("button").bind( "click", onClick_Button);
	$(".menu button").bind( "mouseenter", onMouseEnter_Menu).bind( "mouseleave", onMouseLeave_Menu);
	$(".submenu").bind( "mouseenter", onMouseEnter_Submenu).bind( "mouseleave", onMouseLeave_Submenu);
}

function onClick_Button(event) {
    obj = $(event.currentTarget);
	var datatype = obj.attr("datatype");
    var datasrc = obj.attr("datasrc");

    switch (datatype) {
        case "banner":
            switch (datasrc) {
                case "prev":
                    scroller.rotateForward();
                    break;
                case "next":
                    scroller.rotateBackward();
                    break;
            }
            break;

        case "wiki":
            var menu = findMenu(obj);
            var title = datasrc ? datasrc : obj.text();
            loadWiki(menu, title);
            break;

        case "link":
            window.open(datasrc);
            break;

        default :
            alert("Type: "+datatype+",  Src: "+datasrc);
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

function loadWiki(menu, title) {
    var apiUrl = "http://geeps.krihs.re.kr/wiki/index.php?action=render&title=" + title;

    var testData ='<p>연구교육용 공간정보플랫폼 연구사업의 위키 서비스에 방문해 주셔서 감사합니다.</p><p>현재 이 서비스는 임시 운영중입니다. </p><p>하지만, 좋은 정보들이 많이 있고 앞으로 더욱 많아 질 것이니 많은 이용 부탁드립니다.</p><hr /><table cellpadding="1" cellspacing="1" border="1" style="width: 701px; height: 200px;"><tr><td style="text-align: center;"><p><b><span style="font-size: x-large;">Kaos-G[QGIS] 교육 일정 안내</span></b><br /><br />Kaos-G[QGIS] 초급 과정 교육(2차) 신청이 완료되었습니다. 신청해주신 모든 분들께 감사의 말씀드립니다.<br />Kaos-G[QGIS] 중급 과정 교육(2차)을 다음과 같이 개최할 예정입니다. 관심있으신 분들의 많은&#160;신청 부탁 드립니다.&#160;&#160;</p><p>-<b>다&#160;&#160;&#160; &#160; 음 -</b></p><p>일 시&#160;: 2015년 5월 29일 (금)&#160; 09:00 ~ 17:00<br />장 소&#160;: 국토연구원 강당 (지하 1층)&#160;</p><p style="text-align: right;">&lt;<a href="http://geeps.krihs.re.kr/wiki/index.php/%EC%9E%90%EC%84%B8%ED%9E%88_%EC%95%8C%EC%95%84%EB%B3%B4%EA%B8%B0" title="자세히 알아보기">자세히 알아보기</a>&gt;&#160;</p></td></tr></table><hr /><table cellpadding="1" cellspacing="1" border="1" style="width: 701px; height: 200px;"><tr><td style="text-align: center;"><p><b><span style="font-size: x-large;">Kaos-G[QGIS] 방문 교육 시행</span></b><br /><br />Kaos-G[QGIS] 방문 교육을 희망하시는 연구소 및 대학교를 대상으로<br />무료로 방문교육을 수행하오니 많은 신청바랍니다.<br />교육을 희망하는 곳에서는 30명 이상의 교육생이 참여해야하며, 노트북 및 인터넷이 설치되어 있어야 합니다.<br />본 방문 교육은 2015년 8월까지 한시적으로 수행하는 교육이며,<br />방문 일자는 교육기관 및 신청기관과 협의하여 조정할 예정입니다.</p><p style="text-align: right;">&lt;<a href="http://geeps.krihs.re.kr/wiki/index.php/%EA%B5%90%EC%9C%A1%EC%8B%A0%EC%B2%AD%ED%95%98%EA%B8%B0" title="교육신청하기">교육신청하기</a>&gt;</p></td></tr></table><hr /><div id="toc" class="toc"><div id="toctitle"><h2>목차</h2></div><ul><li class="toclevel-1 tocsection-1"><a href="#GEEPS_.EA.B0.9C.EC.9A.94"><span class="tocnumber">1</span> <span class="toctext">GEEPS 개요</span></a><ul><li class="toclevel-2 tocsection-2"><a href="#GEEPS_.EC.A0.95.EC.9D.98"><span class="tocnumber">1.1</span> <span class="toctext">GEEPS 정의</span></a></li><li class="toclevel-2 tocsection-3"><a href="#GEEPS_.EA.B0.9C.EB.B0.9C_.EC.A0.91.EA.B7.BC.EB.B0.A9.EB.B2.95"><span class="tocnumber">1.2</span> <span class="toctext">GEEPS 개발 접근방법</span></a></li><li class="toclevel-2 tocsection-4"><a href="#GEEPS_.EA.B0.9C.EB.B0.9C_.EC.A0.84.EB.9E.B5"><span class="tocnumber">1.3</span> <span class="toctext">GEEPS 개발 전략</span></a></li></ul></li><li class="toclevel-1 tocsection-5"><a href="#Kaos-G.C2.A0.ED.8C.A8.ED.82.A4.EC.A7.80.C2.A0.EB.8B.A4.EC.9A.B4.EB.A1.9C.EB.93.9C"><span class="tocnumber">2</span> <span class="toctext">Kaos-G&#160;패키지&#160;다운로드</span></a><ul><li class="toclevel-2 tocsection-6"><a href="#Kaos-G_.ED.8C.A8.ED.82.A4.EC.A7.80_.EB.8B.A4.EC.9A.B4.EB.A1.9C.EB.93.9C"><span class="tocnumber">2.1</span> <span class="toctext">Kaos-G 패키지 다운로드</span></a></li><li class="toclevel-2 tocsection-7"><a href="#Kaos-G_.EA.B5.90.EC.9C.A1_.EA.B5.90.EC.9E.AC_.EB.8B.A4.EC.9A.B4.EB.A1.9C.EB.93.9C"><span class="tocnumber">2.2</span> <span class="toctext">Kaos-G 교육 교재 다운로드</span></a></li></ul></li><li class="toclevel-1 tocsection-8"><a href="#.EA.B8.B0.ED.83.80_.EA.B4.80.EB.A0.A8.EC.9E.90.EB.A3.8C_.EB.8B.A4.EC.9A.B4.EB.A1.9C.EB.93.9C"><span class="tocnumber">3</span> <span class="toctext">기타 관련자료 다운로드</span></a><ul><li class="toclevel-2 tocsection-9"><a href="#.EC.BB.B4.ED.8C.8C.EC.9D.BC_.EA.B0.80.EC.9D.B4.EB.93.9C_.ED.99.9C.EC.9A.A9"><span class="tocnumber">3.1</span> <span class="toctext">컴파일 가이드 활용</span></a></li><li class="toclevel-2 tocsection-10"><a href="#QGIS.EC.97.90.EC.84.9C_.EA.B3.B5.EA.B0.84.ED.86.B5.EA.B3.84_.EB.B6.84.EC.84.9D.EA.B8.B0.EB.B2.95_.ED.99.9C.EC.9A.A9"><span class="tocnumber">3.2</span> <span class="toctext">QGIS에서 공간통계 분석기법 활용</span></a></li><li class="toclevel-2 tocsection-11"><a href="#QGIS_WPS_.EC.97.B0.EA.B3.84_API_.EB.AA.A8.EB.93.88.EC.9D.98_.ED.99.9C.EC.9A.A9"><span class="tocnumber">3.3</span> <span class="toctext">QGIS WPS 연계 API 모듈의 활용</span></a></li><li class="toclevel-2 tocsection-12"><a href="#QGIS_.ED.94.8C.EB.9F.AC.EA.B7.B8.EC.9D.B8_.EB.B0.8F_.EC.8A.A4.ED.81.AC.EB.A6.BD.ED.8A.B8_.ED.99.9C.EC.9A.A9"><span class="tocnumber">3.4</span> <span class="toctext">QGIS 플러그인 및 스크립트 활용</span></a></li></ul></li><li class="toclevel-1 tocsection-13"><a href="#.EC.B0.B8.EC.97.AC.EB.A7.88.EB.8B.B9"><span class="tocnumber">4</span> <span class="toctext">참여마당</span></a><ul><li class="toclevel-2 tocsection-14"><a href="#.EC.98.A4.ED.94.88.EC.86.8C.EC.8A.A4_GIS_.EC.BB.A4.EB.AE.A4.EB.8B.88.ED.8B.B0"><span class="tocnumber">4.1</span> <span class="toctext">오픈소스 GIS 커뮤니티</span></a></li><li class="toclevel-2 tocsection-15"><a href="#.ED.95.9C.EA.B8.80.EC.9E.90.EB.A3.8C_.EC.A0.9C.EA.B3.B5_.EC.82.AC.EC.9D.B4.ED.8A.B8"><span class="tocnumber">4.2</span> <span class="toctext">한글자료 제공 사이트</span></a></li><li class="toclevel-2 tocsection-16"><a href="#.EC.9C.84.ED.82.A4.EB.B0.B1.EA.B3.BC.EC.9D.98_.EC.9C.84.ED.82.A4.EB.AC.B8.EB.B2.95"><span class="tocnumber">4.3</span> <span class="toctext">위키백과의 위키문법</span></a></li></ul></li></ul></div><h1><span class="mw-headline" id="GEEPS_.EA.B0.9C.EC.9A.94">GEEPS 개요</span></h1><h5><span class="mw-headline" id="GEEPS_.EC.A0.95.EC.9D.98"><a href="http://geeps.krihs.re.kr/wiki/index.php/GEEPS_%EC%A0%95%EC%9D%98" title="GEEPS 정의">GEEPS 정의</a></span></h5><h5><span class="mw-headline" id="GEEPS_.EA.B0.9C.EB.B0.9C_.EC.A0.91.EA.B7.BC.EB.B0.A9.EB.B2.95"><a href="http://geeps.krihs.re.kr/wiki/index.php/GEEPS_%EA%B0%9C%EB%B0%9C_%EC%A0%91%EA%B7%BC%EB%B0%A9%EB%B2%95" title="GEEPS 개발 접근방법">GEEPS 개발 접근방법</a></span></h5><h5><span class="mw-headline" id="GEEPS_.EA.B0.9C.EB.B0.9C_.EC.A0.84.EB.9E.B5"><a href="http://geeps.krihs.re.kr/wiki/index.php/GEEPS_%EA%B0%9C%EB%B0%9C_%EC%A0%84%EB%9E%B5" title="GEEPS 개발 전략">GEEPS 개발 전략</a></span></h5><p>&#160;</p><h1><span class="mw-headline" id="Kaos-G.C2.A0.ED.8C.A8.ED.82.A4.EC.A7.80.C2.A0.EB.8B.A4.EC.9A.B4.EB.A1.9C.EB.93.9C">Kaos-G&#160;패키지&#160;다운로드</span></h1><h5><span class="mw-headline" id="Kaos-G_.ED.8C.A8.ED.82.A4.EC.A7.80_.EB.8B.A4.EC.9A.B4.EB.A1.9C.EB.93.9C"><a href="http://geeps.krihs.re.kr/wiki/index.php/Kaos-G_%ED%8C%A8%ED%82%A4%EC%A7%80_%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C" title="Kaos-G 패키지 다운로드">Kaos-G 패키지 다운로드</a></span></h5><h5><span class="mw-headline" id="Kaos-G_.EA.B5.90.EC.9C.A1_.EA.B5.90.EC.9E.AC_.EB.8B.A4.EC.9A.B4.EB.A1.9C.EB.93.9C"><a href="http://geeps.krihs.re.kr/wiki/index.php/Kaos-G_%EA%B5%90%EC%9C%A1_%EA%B5%90%EC%9E%AC_%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C" title="Kaos-G 교육 교재 다운로드">Kaos-G 교육 교재 다운로드</a></span></h5><p>&#160;</p><h1><span class="mw-headline" id=".EA.B8.B0.ED.83.80_.EA.B4.80.EB.A0.A8.EC.9E.90.EB.A3.8C_.EB.8B.A4.EC.9A.B4.EB.A1.9C.EB.93.9C">기타 관련자료 다운로드</span></h1><h5><span class="mw-headline" id=".EC.BB.B4.ED.8C.8C.EC.9D.BC_.EA.B0.80.EC.9D.B4.EB.93.9C_.ED.99.9C.EC.9A.A9"><a href="http://geeps.krihs.re.kr/wiki/index.php/%EC%BB%B4%ED%8C%8C%EC%9D%BC_%EA%B0%80%EC%9D%B4%EB%93%9C_%ED%99%9C%EC%9A%A9" title="컴파일 가이드 활용">컴파일 가이드 활용</a></span></h5><h5><span class="mw-headline" id="QGIS.EC.97.90.EC.84.9C_.EA.B3.B5.EA.B0.84.ED.86.B5.EA.B3.84_.EB.B6.84.EC.84.9D.EA.B8.B0.EB.B2.95_.ED.99.9C.EC.9A.A9"><a href="http://geeps.krihs.re.kr/wiki/index.php/QGIS%EC%97%90%EC%84%9C_%EA%B3%B5%EA%B0%84%ED%86%B5%EA%B3%84_%EB%B6%84%EC%84%9D%EA%B8%B0%EB%B2%95_%ED%99%9C%EC%9A%A9" title="QGIS에서 공간통계 분석기법 활용">QGIS에서 공간통계 분석기법 활용</a></span></h5><h5><span class="mw-headline" id="QGIS_WPS_.EC.97.B0.EA.B3.84_API_.EB.AA.A8.EB.93.88.EC.9D.98_.ED.99.9C.EC.9A.A9"><a href="http://geeps.krihs.re.kr/wiki/index.php/QGIS_WPS_%EC%97%B0%EA%B3%84_API_%EB%AA%A8%EB%93%88%EC%9D%98_%ED%99%9C%EC%9A%A9" title="QGIS WPS 연계 API 모듈의 활용">QGIS WPS 연계 API 모듈의 활용</a></span></h5><h5><span class="mw-headline" id="QGIS_.ED.94.8C.EB.9F.AC.EA.B7.B8.EC.9D.B8_.EB.B0.8F_.EC.8A.A4.ED.81.AC.EB.A6.BD.ED.8A.B8_.ED.99.9C.EC.9A.A9"><a href="http://geeps.krihs.re.kr/wiki/index.php/QGIS_%ED%94%8C%EB%9F%AC%EA%B7%B8%EC%9D%B8_%EB%B0%8F_%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8_%ED%99%9C%EC%9A%A9" title="QGIS 플러그인 및 스크립트 활용">QGIS 플러그인 및 스크립트 활용</a></span></h5><p>&#160;</p><h1><span class="mw-headline" id=".EC.B0.B8.EC.97.AC.EB.A7.88.EB.8B.B9">참여마당</span></h1><h5><span class="mw-headline" id=".EC.98.A4.ED.94.88.EC.86.8C.EC.8A.A4_GIS_.EC.BB.A4.EB.AE.A4.EB.8B.88.ED.8B.B0"><a href="http://geeps.krihs.re.kr/wiki/index.php/%EC%98%A4%ED%94%88%EC%86%8C%EC%8A%A4_GIS_%EC%BB%A4%EB%AE%A4%EB%8B%88%ED%8B%B0" title="오픈소스 GIS 커뮤니티">오픈소스 GIS 커뮤니티</a></span></h5><h5><span class="mw-headline" id=".ED.95.9C.EA.B8.80.EC.9E.90.EB.A3.8C_.EC.A0.9C.EA.B3.B5_.EC.82.AC.EC.9D.B4.ED.8A.B8"><a href="http://geeps.krihs.re.kr/wiki/index.php/%ED%95%9C%EA%B8%80%EC%9E%90%EB%A3%8C_%EC%A0%9C%EA%B3%B5_%EC%82%AC%EC%9D%B4%ED%8A%B8" title="한글자료 제공 사이트">한글자료 제공 사이트</a></span></h5><h5><span class="mw-headline" id=".EC.9C.84.ED.82.A4.EB.B0.B1.EA.B3.BC.EC.9D.98_.EC.9C.84.ED.82.A4.EB.AC.B8.EB.B2.95"><a rel="nofollow" class="external text" href="http://ko.wikipedia.org/wiki/위키백과:위키_문법">위키백과의 위키문법</a></span></h5>'


    $("#contents_title").html(title);
    $("#contents_menu").html(menu);
    $("#contents_submenu").html(title);
    $("#contents_html").html("내용을 불러오고 있습니다...");


    $.ajax({
        method: "GET",
        url: apiUrl,
        dataType: "html"
    }).done(function (html) {
        $("#contents_html").html(html);
    }).fail(function( jqXHR, textStatus ) {
        //alert( "Request failed: " + textStatus );
        $("#contents_html").html(testData);
    });

    $("#contents_main").hide();
    $("#contents_wrap").show();
}
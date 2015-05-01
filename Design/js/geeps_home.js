/*
** 이벤트 처리
*/

/*
** 배너 회전
*/
function rotateForward(elem) {
	var first = $(elem+" li:first");
	if (first) {
		first.remove();
		$(elem+" ul").append(first);
	}
}

function rotateBackward(elem) {
	var last = $(elem+" li:last");
	if (last) {
		last.remove();
		var first = $(elem+" li:first");
		if (first)
			$(first).before(last);
		else
			$(elem+" ul").append(last);
	}
}
function startRotator(elem, interval) {
	if (!interval) interval = 10000;
	setInterval("rotateForward('"+elem+"')", interval);
	//setInterval("rotateBackward('"+elem+"')", interval);
}

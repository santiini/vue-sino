/* eslint-disable */
function selecPic(file) {
	var fileName = $("#selectPic").val();
	// var reg = /\\*\./;
	// var targetStr = fileName.match(reg);
	//$("#imgName").attr('value', fileName);
	console.log(fileName)
	var targetRoad = fileName.split('\\');
	if (targetRoad.length) {
		$("#imgName").attr('value', targetRoad[targetRoad.length - 1]);
		$('.imgContainer').css({
			backgroundImage: 'url(' + fileName + ')',
		});
	}
}

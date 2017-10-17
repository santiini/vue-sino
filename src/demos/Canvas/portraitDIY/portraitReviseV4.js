/* eslint-disable */
var canvasObj = {
	xStart:0,
	yStart:0,
	width:0,
	height:0,
	initialWidth:0,
	initialHeight:0,
	beginDraw: false
}
function resetCanvasObj() {
	return {
		xStart:0,
		yStart:0,
		width:0,
		height:0,
		initialWidth:0,
		initialHeight:0,
		beginDraw: false
	}
}
var clearCanvasObj = {
	xStart:0,
	yStart:0,
	width:180,
	height:180,
	left:0,
	top:0,
	initialWidth:0,
	initialHeight:0,
	beginDraw: false,
	isCanvasArea: false,
	isRightCorner: false,
	mouseX: 0,
	mouseY: 0,
	//color: 'rgba(211,211,216,0.5)'
	color: 'rgba(0,0,0, 0.4)',
	canvasId: 0
}
function resetClearCanvasObj() {
	return {
		xStart:0,
		yStart:0,
		width:180,
		height:180,
		left:0,
		top:0,
		initialWidth:0,
		initialHeight:0,
		beginDraw: false,
		isCanvasArea: false,
		isRightCorner: false,
		mouseX: 0,
		mouseY: 0,
		//color: 'rgba(211,211,216,0.5)'
		color: 'rgba(0,0,0, 0.4)'
	}
}
var portraitGroupsArr = [
	{
		width: 60,
		height: 60,
		class: 'smallPic_60'
	},
	{
		width: 120,
		height: 120,
		class: 'smallPic_120'
	}
]
var ry_CTX;
window.onload = function() {
	$('.diyPortrait span').click(function(event) {
		/* Act on the event */
		var portraitWidth = $(".portraitWidth").val();
		var portraitHeight = $(".portraitHeight").val();
		if (parseInt(portraitWidth, 10) && parseInt(portraitHeight, 10)) {
			if (parseInt(portraitWidth, 10) == parseInt(portraitHeight, 10)) {
				var divEle = $("<div></div>");
				portraitGroupsArr.push({
					width: parseInt(portraitWidth, 10),
					height: parseInt(portraitHeight, 10),
					class: 'smallPic_' + portraitWidth
				})
				divEle.attr({
					class: 'smallPicContainer_' + portraitWidth,
				});
				var divEleChild = $("<canvas></canvas>");
				divEleChild.attr({
					class: 'smallPic_' + portraitWidth,
					id: 'smallPic_' + portraitWidth
				});
				var divEleSpan = $("<div></div>");
				divEleSpan.attr({
					class: 'pixel',
				});
				divEleSpan.html(portraitWidth + 'x' + portraitHeight + '像素');
				divEle.append(divEleChild);
				divEle.append(divEleSpan);
				$('.smallPicGroups').append(divEle);
				var divEleChildCanvas = document.getElementById('smallPic_' + portraitWidth);
				divEleChildCanvas.width = portraitWidth;
				divEleChildCanvas.height = portraitHeight;
				divEle.css({
					float: 'left',
					textAlign: 'center',
					marginLeft: '20px',
				});
				divEleChild.css({
					margin: '0 auto',
					border: '1px solid #9baab3',
				});

				$(".portraitWidth").val("");
				$(".portraitHeight").val("");
			} else {
				$(".portraitWidth").val("");
				$(".portraitHeight").val("");
				alert('请输入相同的宽高值');
			}
		} else {
			$(".portraitWidth").val("");
			$(".portraitHeight").val("");
			alert('请填写正确的高度或宽度值');
		}
	});
	var screenCanvasDOM = document.getElementById('screenCanvas');
	if (screenCanvasDOM.getContext) {
		portraitsCreate();
	} else {
		$('.portraitContainer').remove();
		createFlash();
	}
}

function portraitsCreate() {
	var element = document.getElementById('selectPic'), inputForImageName = document.getElementById('imgName');
	element.onchange = function() {
		var files = element.files, reader = new FileReader();
		if (files && files[0]) {
			inputForImageName.value = files[0].name;
			reader.onload = function(event) {
				$('.imgContainer').css({
					backgroundImage: 'url(' + event.target.result + ')'
				});
				var imageURL = event.target.result;
				htmlTransToCanvas(imageURL);

			}
			reader.readAsDataURL(files[0]);
		}
	}
}

function htmlTransToCanvas(imageURL) {
	html2canvas(document.getElementById('imgContainer'), {
		onrendered: function(canvas) {
			var isCavnasLive = document.getElementById('canvas');
			if (isCavnasLive) {
				isCavnasLive.remove();
				// document.body.removeEventListener('mousedown', mousedownFunc);
				// document.body.removeEventListener('mousemove', mousemoveFunc);
				// document.body.removeEventListener('mouseup', mouseupFunc);
				var canvasIDCtx = new Array();
				portraitGroupsArr.forEach(function(item, index) {
					var canvasID = document.getElementById(item.class);
					canvasIDCtx.push(canvasID.getContext('2d'));
					//canvasIDCtx.fillStyle = "#fff";
					//canvasIDCtx.fillRect(0,0, item.width, item.height);
					canvasIDCtx[index].clearRect(0, 0, item.width, item.height);
				})
				clearCanvasObj = resetClearCanvasObj();
				canvasObj = resetCanvasObj();
			}
			var imageURL = canvasTransToImage(canvas);
			var imgContainerCanvas = createCanvasByClassName('imgContainer');
			ry_CTX = imgContainerCanvas.getContext('2d');
			ry_CTX.clearRect(0, 0, clearCanvasObj.width, clearCanvasObj.height);
			produceSmallPic(clearCanvasObj.xStart+clearCanvasObj.left, clearCanvasObj.yStart+clearCanvasObj.top, clearCanvasObj.width, clearCanvasObj.height, imageURL);

			document.body.addEventListener('mousedown', function(event){
				mousedownFunc(event);
			});
			document.body.addEventListener('mousemove', function(event) {
				mousemoveFunc(event);
			});
			document.body.addEventListener('mouseup', function(event){
				mouseupFunc(event);
			});

			// document.getElementById('canvas').addEventListener('mousedown', mousedownFunc);
			// document.getElementById('canvas').addEventListener('mousemove', mousemoveFunc);
			// document.getElementById('canvas').addEventListener('mouseup', mouseupFunc);
			// $("body").mousedown(function(event) {
			// 	/* Act on the event */
			// 	mousedownFunc();
			// });
			// $("html").mousedown(function(event) {
			// 	/* Act on the event */
			// 	mousedownFunc();
			// });
			// $("body").mousemove(function(event) {
			// 	/* Act on the event */
			// 	mousemoveFunc();
			// });
			// $("html").mousemove(function(event) {
			// 	/* Act on the event */
			// 	mousemoveFunc();
			// });
			// $("body").mouseup(function(event) {
			// 	/* Act on the event */
			// 	mouseupFunc();
			// });
			// $("html").mouseup(function(event) {
			// 	/* Act on the event */
			// 	mouseupFunc();
			// });
			function mousedownFunc(event) {
				clearCanvasObj.beginDraw = true;
				/* Act on the event */
				clearCanvasObj.mouseX = event.clientX;
				clearCanvasObj.mouseY = event.clientY;
				var nowMouseX = event.clientX - clearCanvasObj.left;
				var nowMouseY = event.clientY - clearCanvasObj.top;
				//console.log('nowMouseX', nowMouseX);
				if ((nowMouseX >= clearCanvasObj.xStart + clearCanvasObj.width - 10) && (nowMouseX <= clearCanvasObj.xStart+ clearCanvasObj.width + 10)
					&& (nowMouseY >= clearCanvasObj.yStart + clearCanvasObj.height - 10) && (nowMouseY <= clearCanvasObj.yStart + clearCanvasObj.height + 10)) {
					clearCanvasObj.isRightCorner = true;
				}
			}
			function mousemoveFunc(event) {
				/* Act on the event */
				var nowMouseX = event.clientX - clearCanvasObj.left;
				var nowMouseY = event.clientY - clearCanvasObj.top;
				if (nowMouseX >= clearCanvasObj.xStart && nowMouseX <= clearCanvasObj.xStart + clearCanvasObj.width && nowMouseY >= clearCanvasObj.yStart && nowMouseY <= clearCanvasObj.yStart + clearCanvasObj.height) {
					clearCanvasObj.isCanvasArea = true;
					//clearCanvasObj.isRightCorner = false;
					imgContainerCanvas.style.cursor = 'move';
				} else if ((nowMouseX >= clearCanvasObj.xStart + clearCanvasObj.width - 10) && (nowMouseX <= clearCanvasObj.xStart+ clearCanvasObj.width + 10)
					&& (nowMouseY >= clearCanvasObj.yStart + clearCanvasObj.height - 10) && (nowMouseY <= clearCanvasObj.yStart + clearCanvasObj.height + 10)) {
					clearCanvasObj.isCanvasArea = true;
					//clearCanvasObj.beginDraw = false;

					imgContainerCanvas.style.cursor = 'se-resize';
				}
				else {
					clearCanvasObj.isCanvasArea = false;
					//clearCanvasObj.isRightCorner = false;
					imgContainerCanvas.style.cursor = 'default';
				}
				var outerDomWidth = $(".imgContainer").width();
				var outerDomHeight = $(".imgContainer").height();
				var xDistance = event.clientX - clearCanvasObj.mouseX;
				var yDistance = event.clientY - clearCanvasObj.mouseY;
				//var outerCTX = canvas.getContext('2d');
				//移动小方框
				if (clearCanvasObj.beginDraw && clearCanvasObj.isCanvasArea && !clearCanvasObj.isRightCorner) {
					ry_CTX.fillStyle = clearCanvasObj.color;
					// console.log('1', clearCanvasObj.xStart, clearCanvasObj.yStart)
					ry_CTX.fillRect(clearCanvasObj.xStart, clearCanvasObj.yStart, clearCanvasObj.width, clearCanvasObj.height);
					//outerCTX.fillRect(0, 0, canvas.width, canvas.height);
					clearCanvasObj.xStart += xDistance;
					clearCanvasObj.yStart += yDistance;

					//判断方框是否达到边界
					if (clearCanvasObj.xStart <= 0) {
						clearCanvasObj.xStart = 0;
					}
					if (clearCanvasObj.yStart <= 0) {
						clearCanvasObj.yStart = 0;
					}
					if ((clearCanvasObj.xStart + clearCanvasObj.width) >= outerDomWidth) {
						clearCanvasObj.xStart = outerDomWidth - clearCanvasObj.width;
					}
					if ((clearCanvasObj.yStart + clearCanvasObj.height) >= outerDomHeight) {
						clearCanvasObj.yStart = outerDomHeight - clearCanvasObj.height;
					}
					// console.log('2', clearCanvasObj.xStart, clearCanvasObj.yStart)
					ry_CTX.clearRect(clearCanvasObj.xStart, clearCanvasObj.yStart, clearCanvasObj.width, clearCanvasObj.height);
					produceSmallPic(clearCanvasObj.xStart+clearCanvasObj.left, clearCanvasObj.yStart+clearCanvasObj.top, clearCanvasObj.width, clearCanvasObj.height, imageURL)
					clearCanvasObj.mouseX = event.clientX;
					clearCanvasObj.mouseY = event.clientY;
				}
				//拖拽小方框
				if (clearCanvasObj.isRightCorner) {
					ry_CTX.fillStyle = clearCanvasObj.color;
					ry_CTX.fillRect(clearCanvasObj.xStart, clearCanvasObj.yStart, clearCanvasObj.width, clearCanvasObj.height);
					var realDistance = Math.min(xDistance, yDistance)
					clearCanvasObj.width +=  realDistance;
					clearCanvasObj.height += realDistance;
					//拖动时边界条件的判断
					if (clearCanvasObj.xStart + clearCanvasObj.width >= outerDomWidth) {
						clearCanvasObj.width = outerDomWidth - clearCanvasObj.xStart;
						clearCanvasObj.height = outerDomWidth - clearCanvasObj.xStart;
					}
					if (clearCanvasObj.yStart + clearCanvasObj.height >= outerDomHeight) {
						clearCanvasObj.width = outerDomHeight - clearCanvasObj.yStart;
						clearCanvasObj.height = outerDomHeight - clearCanvasObj.yStart;
					}
					if (clearCanvasObj.width <= 10) {
						clearCanvasObj.width = 10;
					}
					if (clearCanvasObj.height <= 10) {
						clearCanvasObj.height = 10;
					}
					ry_CTX.clearRect(clearCanvasObj.xStart, clearCanvasObj.yStart, clearCanvasObj.width, clearCanvasObj.height);
					produceSmallPic(clearCanvasObj.xStart+clearCanvasObj.left, clearCanvasObj.yStart+clearCanvasObj.top, clearCanvasObj.width, clearCanvasObj.height, imageURL);
					clearCanvasObj.mouseX = event.clientX;
					clearCanvasObj.mouseY = event.clientY;
				}
			}
			function mouseupFunc(event) {
				/* Act on the event */
				clearCanvasObj.beginDraw = false;
				clearCanvasObj.isRightCorner = false;
			}
		},
	});
}

function getRandom(a, b) {
	return Math.random()*(b - a) + a
}

function createCanvasByClassName(tag) {
	var canvasInitialWidth = $('.' + tag).width();
	var canvasInitialHeight = $('.' + tag).height();
	var left = $('.' + tag).offset().left - $('.' + tag).parent('.portraitContainer').offset().left + 1;
	var top = $('.' + tag).offset().top - $('.' + tag).parent('.portraitContainer').offset().top + 1;
	//var left = $('.' + tag).offset().left + 1;
	//var top = $('.' + tag).offset().top + 1;
	clearCanvasObj.left = $('.' + tag).offset().left + 1;
	clearCanvasObj.top = $('.' + tag).offset().top + 1;
	// clearCanvasObj.left = left;
	// clearCanvasObj.top = top;
	var canvasElement = $('<canvas></canvas>');
	var randomNum = Math.floor(getRandom(0, 10000));
	clearCanvasObj.canvasId = randomNum;
	canvasElement.attr({
		id: 'canvas',
		width: canvasInitialWidth,
		height: canvasInitialHeight
	});
	canvasElement.css({
		position: 'absolute',
		top: top,
		left: left
	});
	//$('body').append(canvasElement);
	var appendEle = $('.portraitContainer').append(canvasElement);
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	//ctx.fillStyle = "rgba(211,211,216,0.5)";
	ctx.clearRect(0, 0, canvasInitialWidth, canvasInitialHeight);
	ctx.fillStyle = "rgba(0,0,0, 0.4)";
	ctx.fillRect(0, 0, canvasInitialWidth, canvasInitialHeight);
	return canvas;
}

function produceSmallPic(left, top, width, height, imageURL) {
	imageTransToCanvas(imageURL,left, top, width, height);
}

function canvasTransToImage(canvas) {
	var imageURL = canvas.toDataURL('image/png');
	return imageURL;
}

function imageTransToCanvas(imageURL, left, top, width, height) {
	var img = new Image();
	img.src = imageURL;
	var targetCtx = new Array();
	var targetCanvas = null;
	img.onload = function() {
		portraitGroupsArr.forEach(function(item, index) {
			targetCanvas = document.getElementById(item.class);
			targetCtx.push(targetCanvas.getContext('2d'));
			targetCtx[index].clearRect(0,0, item.width, item.height);
			targetCtx[index].drawImage(img, left - clearCanvasObj.left, top - clearCanvasObj.top, width, height, 0, 0 , item.width, item.height);
		})
	}
}

function createFlash() {
	var divContainer = $("<div></div>");
	divContainer.attr({
		id: 'flashContent',
	});
	divContainer.css({
		width: '800px',
		height: '470px'
	});
	var flashObj = $("<object></object>");
	flashObj.attr({
		id: 'player',
		type: 'application/x-shockwave-flash',
		data: 'http://static.laohu.com/v2/swf/uploadPhoto.swf'
	});
	flashObj.css({
		width: '100%',
		height: '100%'
	});

	var param1 = $("<param>");
	param1.attr({
		name: 'quality',
		value: 'high'
	});
	flashObj.append(param1);
	var param2 = $("<param>");
	param2.attr({
		name: 'allowscriptaccess',
		value: 'always'
	});
	flashObj.append(param2);
	var param3 = $("<param>");
	param3.attr({
		name: 'allowFullScreen',
		value: 'true'
	});
	flashObj.append(param3);
	var param4 = $("<param>");
	param4.attr({
		name: 'wmode',
		value: 'transparent'
	});
	flashObj.append(param4);
	var aTag = $("<a></a>");
	aTag.attr({
		href: 'http://www.adobe.com/go/getflash',
	});
	var img = $("<img>");
	img.attr({
		alt: 'Get Adobe Flash player',
		src: 'http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif'
	});
	aTag.append(img);
	flashObj.append(aTag);
	divContainer.append(flashObj);

	$('body').append(divContainer);
}





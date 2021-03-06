function convertCanvasToImage(canvas) {
    var image = new Image();
    image.crossOrigin = "*";
    image.src = canvas.toDataURL("image/jpeg");

    return image;
}

function getBase64Image(img) {
    var image = new Image();
    image.src = img.src;
    image.onload = function() {

        if (image.complete) {
            var canvas = document.createElement("canvas");
            canvas.width = image.width;
            canvas.height = image.height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(image, 0, 0, image.width, image.height);
            var ext = image.src.substring(image.src.lastIndexOf(".") + 1).toLowerCase();
            //        var dataURL = canvas.toDataURL("image/"+ext);
            var dataURL = canvas.toDataURL("image/jpeg", 1.0);

            var testDom = document.getElementById('test');
            testDom.src = dataURL;
            return dataURL;
        }

    };

}

function CanvasToimages_1() {
    // var testDom = document.getElementById('test');

            // var vanvas = document.getElementsByTagName("canvas")[0];
            // var canvasImg = convertCanvasToImage(vanvas);
            // var base64 = getBase64Image(canvasImg);

            var image = new Image();
            image.src = "./resource/res/end.png"
            image.onload = function () {
                if (image.complete) {
                    var canvas = document.createElement("canvas");
                    canvas.width = image.width;
                    canvas.height = image.height;
                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(image, 0, 0, image.width, image.height);
                    ctx.font = "60px 黑体";
                    ctx.fillStyle = "black";
                    ctx.fillText(str1, 110, 760);
                    ctx.font = "60px 黑体";
                    ctx.fillStyle = "black";
                    ctx.fillText(str2, 720, 760);
                    ctx.font = "35px 黑体";
                    ctx.fillStyle = "black";
                    // ctx.fillText(str3, 50, 820);
                    var lineWidth = 0;
                    var canvasWidth = 850; //计算canvas的宽度
                    var initHeight = 860; //绘制字体距离canvas顶部初始的高度
                    var lastSubStrIndex = 0; //每次开始截取的字符串的索引
                    for (let i = 0; i < str3.length; i++) {
                        lineWidth += ctx.measureText(str3[i]).width;
                        if (lineWidth > canvasWidth) {
                            ctx.fillText(str3.substring(lastSubStrIndex, i), 40, initHeight); //绘制截取部分
                            initHeight += 35; //35为字体的高度
                            lineWidth = 0;
                            lastSubStrIndex = i;
                        }
                        if (i == str3.length - 1) { //绘制剩余部分
                            ctx.fillText(str3.substring(lastSubStrIndex, i + 1), 40, initHeight);
                        }
                    }

                    var ext = image.src.substring(image.src.lastIndexOf(".") + 1).toLowerCase();
                    //        var dataURL = canvas.toDataURL("image/"+ext);
                    var dataURL = canvas.toDataURL("image/png", 1.0);

                    var testDom = document.getElementById('test');
                    testDom.src = dataURL;
                    return dataURL;

                }
            }


    }

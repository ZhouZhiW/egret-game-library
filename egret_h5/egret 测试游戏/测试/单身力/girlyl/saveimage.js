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

function CanvasToimages_1(str) {
    // var testDom = document.getElementById('test');

    // var vanvas = document.getElementsByTagName("canvas")[0];
    // var canvasImg = convertCanvasToImage(vanvas);
    // var base64 = getBase64Image(canvasImg);

    var image = new Image();
    image.src = "./resource/" + str + ".jpg "
    image.onload = function() {
        if (image.complete) {
            var canvas = document.createElement("canvas");
            canvas.width = image.width;
            canvas.height = image.height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(image, 0, 0, image.width, image.height);
            var ext = image.src.substring(image.src.lastIndexOf(".") + 1).toLowerCase();
            //        var dataURL = canvas.toDataURL("image/"+ext);
            var dataURL = canvas.toDataURL("image/png", 1.0);
            var testDom = document.getElementById('test');
            testDom.src = dataURL;
            return dataURL;

        }
    }


}
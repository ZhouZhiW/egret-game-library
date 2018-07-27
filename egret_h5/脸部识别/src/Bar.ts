class Bar {
    public static create(smile: number, gender: string, age: number): egret.DisplayObjectContainer {
        console.log(smile,gender,age);

        let con: egret.DisplayObjectContainer = new egret.DisplayObjectContainer()

        let bar: egret.Bitmap = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes("bar")
        bar.texture = texture;
        con.addChild(bar);

        //根据smile评分显示不同头像
        let smileImg: egret.Bitmap = new egret.Bitmap();
        smileImg.x = 41;
        smileImg.y = 5;
        con.addChild(smileImg);

        if (smile >= 0 && smile < 0.1) {
            smileImg.texture = RES.getRes("s0");
        } else if (smile >= 0.1 && smile < 0.2) {
            smileImg.texture = RES.getRes("s1");
        } else if (smile >= 0.2 && smile < 0.3) {
            smileImg.texture = RES.getRes("s2");
        } else if (smile >= 0.3 && smile < 0.4) {
            smileImg.texture = RES.getRes("s3");
        } else if (smile >= 0.4 && smile < 0.5) {
            smileImg.texture = RES.getRes("s4");
        } else if (smile >= 0.5 && smile < 0.6) {
            smileImg.texture = RES.getRes("s5");
        } else if (smile >= 0.6 && smile <= 0.7) {
            smileImg.texture = RES.getRes("s6");
        } else if (smile >= 0.7 && smile < 08) {
            smileImg.texture = RES.getRes("s7");
        } else if (smile >= 0.8 && smile < 0.9) {
            smileImg.texture = RES.getRes("s8");
        } else if (smile >= 0.9 && smile <= 1) {
            smileImg.texture = RES.getRes("s9");
        }


        let genderImg: egret.Bitmap = new egret.Bitmap();
        let genderTexture: egret.Texture
        if (gender == "male") {
            genderTexture = RES.getRes("man")
        } else {
            genderTexture = RES.getRes("woman")
        }
        genderImg.texture = genderTexture;
        genderImg.x = 10;
        genderImg.y = 72;
        con.addChild(genderImg);

        let agetext: egret.BitmapText = new egret.BitmapText();
        agetext.font = RES.getRes("newnum_fnt");
        agetext.text = Math.ceil(age).toString();
        agetext.x = 46;
        agetext.y = 78;
        con.addChild(agetext);

        return con
    }
}
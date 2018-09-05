//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends eui.UILayer {


    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
            console.log('onPause')
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
              console.log('onResume')
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());


        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        //  var getLaunchOptionsSync = wx.getLaunchOptionsSync();
        // wx.onShow(function(){
        //     console.log("onShow")
        // });
        // wx.onHide(function(){
        //     console.log("onHide")
        // });
        // console.log("aaaaaa",getLaunchOptionsSync);
        await this.loadResource()
        this.createGameScene();

        const result = await RES.getResAsync("description_json")
        // this.startAnimation(result);
        // await platform.login();
        await platform.onShareAppMessage();
        this._userInfo = await platform.getUserInfo();
        console.log(this._userInfo);
        const _code = await platform.login();
        console.log(_code);
    }
    private async loadResource() {
        
        try {
            
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);

        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);
        })
    }
    private _code;
    private _userInfo
    private textfield: egret.TextField;
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected createGameScene(): void {

        console.log("v.0.01");
       
        if (!this._userInfo) {
            const userInfo = platform.getUserInfo();
            console.log("createGameScene", userInfo);
        }

        var wid = window.innerWidth;
        var hig = window.innerHeight;
        var gamePer = wid / hig;
        var per = 640 / 1136;


        console.log(wid, hig, gamePer, per);
        var scaleMode;
        // if (gamePer < per) {
            scaleMode = egret.StageScaleMode.FIXED_WIDTH;
        // } else {
        //     scaleMode = egret.StageScaleMode.FIXED_HEIGHT;
        // }
        this.stage.scaleMode = scaleMode;
        platform.showShareMenu();
        platform.onShareAppMessage();
        Data.mainlayer = this;
        // this.ceshi();
        var _gamestart = new gamestart();
        // var _gamestart = new overLayer(1000);
        // var _gamestart = new anginLife(1000);
        this.addChild(_gamestart);
    }
    private ceshi(){
        // var index=[2,0,3,2,4,0,1,3,2,3,3];
        // var arr=[8,2,1,0,3];
        // var str=''
        // for(var  i=0;i< index.length;i++){
        //     var a=index[i];
        //     str+=arr[a];
        // }
        // console.log(str);
    }






}

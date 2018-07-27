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

class Main extends egret.DisplayObjectContainer {
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

        this.runGame().catch(e => {
            console.log(e);
        })

    }

    private async runGame() {
        // await this.loadResource()
        // this.createGameScene();
        // const result = await RES.getResAsync("description_json")
        // this.startAnimation(result);
        console.log("22222222222222");
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);

        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onComplete, this);
        if (GameUtils.RELEASE_STAGE == 0) {
            console.log("444444444444444444444");
            RES.loadConfig(GameUtils.GAME_VERSION + "/resource/default.res.json", GameUtils.GAME_VERSION + "/resource/");
        } else {
            console.log("3333333333333333");
            RES.loadConfig("resource/default.res.json", "http://wres.miaoware.cn/game/cuojia/CuojiaWX_wxgame_remote/resource/");
        }
        GameUtils.SCREEN_W = this.stage.stageWidth;
        GameUtils.SCREEN_H = this.stage.stageHeight;
        GameUtils.getPlayerToken();
        GameUtils.GetIsShowMore();
    }
    private onComplete(eventP: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onLoadComplete, this);
        RES.loadGroup("loading");
    }
    private onLoadComplete(event: RES.ResourceEvent): void {
        if (event.groupName == "loading") {
            console.log("11111111111111111111");
            
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onLoadComplete, this);
            var cover: CoverScene = new CoverScene();
            this.addChild(cover);
        }
    }
}
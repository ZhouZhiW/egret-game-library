var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var JsCallBackEvent;
(function (JsCallBackEvent) {
    var CallBack = (function () {
        function CallBack() {
        }
        CallBack.prototype.shareTimelineCallBack = function () {
            var daterEvent = new EventData(EventData.DATA_TIME);
            GameUtils.dateEventSprite.dispatchEvent(daterEvent);
        };
        CallBack.prototype.shareFriendCallBack = function () {
            var daterEvent = new EventData(EventData.DATA_FRIEND);
            GameUtils.dateEventSprite.dispatchEvent(daterEvent);
        };
        CallBack.prototype.followCallBack = function (obj) {
            if (obj) {
                GameUtils.checkFollow = obj.follow;
            }
            if (GameUtils.checkFollowSceneType == 0) {
                var daterEvent = new EventData(EventData.DATA_GAMEFOLLOW);
                GameUtils.dateEventSprite.dispatchEvent(daterEvent);
            }
            else {
                var daterEvent = new EventData(EventData.DATA_LISTFOLLOW);
                GameUtils.dateEventSprite.dispatchEvent(daterEvent);
            }
        };
        CallBack.prototype.closeSaveImageCallBack = function () {
            var daterEvent = new EventData(EventData.DATA_CLOSESAVEIMAGE);
            GameUtils.dateEventSprite.dispatchEvent(daterEvent);
        };
        CallBack.prototype.adaptParamsCallBack = function (obj) {
            if (obj.data) {
                if (obj.data.adaptParams.length > 0) {
                    for (var i = 0; i < obj.data.adaptParams.length; i++) {
                        var str_key = obj.data.adaptParams[i].key;
                        var str_value = obj.data.adaptParams[i].value;
                        if (str_key == "invite.enable") {
                            if (str_value == "false") {
                                GameUtils.noYaoQing = true;
                            }
                        }
                        else if (str_key == "share.enable") {
                            if (str_value == "false") {
                                GameUtils.noShare = true;
                            }
                        }
                        else if (str_key == "follow.enable") {
                            if (str_value == "false") {
                                GameUtils.noGuanZhu = true;
                            }
                        }
                        else if (str_key == "qq_group.enable") {
                            if (str_value == "false") {
                                GameUtils.noqqQun = true;
                            }
                            else {
                                GameUtils.qqGroupNum = obj.data.adaptParams[i].description;
                            }
                        }
                        else if (str_key == "more_game.enable") {
                            if (str_value == "false") {
                                GameUtils.noMoreGame = true;
                            }
                        }
                        else if (str_key == "announcement.enable") {
                            if (str_value == "false") {
                                GameUtils.noGongGao = true;
                            }
                        }
                        else if (str_key == "friend_list.enable") {
                            if (str_value == "false") {
                                GameUtils.noFriend = true;
                            }
                        }
                        else if (str_key == "book_url.enable") {
                            if (str_value == "false") {
                                GameUtils.noBookurl = true;
                            }
                        }
                        else if (str_key == "dressing.enable") {
                            GameUtils.noDress = true;
                            GameUtils.dressUrl = str_value;
                        }
                        else if (str_key == "ranking_list.enable") {
                            if (str_value == "false") {
                                GameUtils.noRank = true;
                            }
                        }
                        else if (str_key == "addShortcut.enable") {
                            //快捷到桌面
                            if (str_value == "true") {
                                GameUtils.addShortcut = true;
                            }
                        }
                        else if (str_key == "addShortcutAuto.enable") {
                            if (str_value == "true") {
                                GameUtils.openShortCutTime = true;
                            }
                        }
                        else if (str_key == "show_off.enable") {
                            //炫耀功能
                            if (str_value == "true") {
                                GameUtils.show_off = true;
                            }
                        }
                        else if (str_key == "channel.info") {
                            //玩吧QQ视频
                            if (str_value == "玩吧QQ视频") {
                                GameUtils.isWanbaQQshipin = true;
                            }
                            GameUtils.channelStr = str_value;
                        }
                        else if (str_key == "recall.enable") {
                            //唤醒功能
                            if (str_value == "true") {
                                GameUtils.isShowRecallList = true;
                            }
                        }
                        else if (str_key == "face_merge.enable") {
                            //人脸融合
                            if (str_value == "true") {
                                GameUtils.noFacialRecognition = true;
                            }
                        }
                        else if (str_key == "sequel.enable") {
                            //跳转第二季或者跳转到其他游戏
                            GameUtils.sequelUrl = str_value;
                        }
                        else if (str_key == "cover.enable") {
                            //设置空间背景
                            if (str_value == "true") {
                                GameUtils.setQQbackground = true;
                            }
                        }
                        else if (str_key == "qqbuluo.enable") {
                            //兴趣部落跳转
                            GameUtils.isShowxingqubuluo = true;
                            GameUtils.xingqubuluoUrl = str_value;
                        }
                        else if (str_key == "qqcoin.enable") {
                            //Q币充值活动
                            if (str_value == "true") {
                                GameUtils.isQQcoin = true;
                            }
                        }
                    }
                }
            }
            if (!GameUtils.noYaoQing) {
                GameUtils.noShare = true;
            }
            // GameUtils.sequelUrl = "http://127.0.0.1:3007/index.html?_proxy=1&button=55d4fbe9fae219129e05f39c6f733fde";
            if (GameUtils.sequelUrl != "") {
                var buttonstr = GameUtils.sequelUrl.indexOf("button=");
                if (buttonstr != -1) {
                    GameUtils.gameoverAppKey = GameUtils.sequelUrl.substring(buttonstr + 7, GameUtils.sequelUrl.length);
                    GameUtils.sequelUrl = GameUtils.sequelUrl.substring(0, buttonstr - 1);
                    // console.log(GameUtils.gameoverAppKey);
                    // console.log(GameUtils.sequelUrl);
                }
            }
            // GameUtils.isShowRecallList = true;
            // GameUtils.noFacialRecognition = true;
            // GameUtils.channelStr = "玩吧";
            var daterEvent = new EventData(EventData.DATA_ADAPT_PARAMS);
            GameUtils.dateEventSprite.dispatchEvent(daterEvent);
        };
        CallBack.prototype.checkAdCallBack = function (obj) {
            if (obj.result == 0) {
                GameUtils.checkAd = false;
            }
            else {
                GameUtils.checkAd = true;
            }
            var daterEvent = new EventData(EventData.DATA_SHOWAD);
            GameUtils.dateEventSprite.dispatchEvent(daterEvent);
        };
        CallBack.prototype.playAdCallBack = function (obj) {
            if (obj.result == 1) {
                var daterEvent = new EventData(EventData.DATA_PLAYAD);
                GameUtils.dateEventSprite.dispatchEvent(daterEvent);
            }
        };
        CallBack.prototype.addshortcutCallBack = function () {
            var daterEvent = new EventData(EventData.DATA_ADDSHORTCUT);
            GameUtils.dateEventSprite.dispatchEvent(daterEvent);
        };
        CallBack.prototype.qqBackgroundCallBack = function () {
            var daterEvent = new EventData(EventData.DATA_QQBACKGROUND);
            GameUtils.dateEventSprite.dispatchEvent(daterEvent);
        };
        CallBack.prototype.authsucceedCallBack = function () {
            var daterEvent = new EventData(EventData.DATA_AUTH_SUCCEED);
            GameUtils.dateEventSprite.dispatchEvent(daterEvent);
        };
        CallBack.prototype.authfailedCallBack = function () {
            var daterEvent = new EventData(EventData.DATA_AUTH_FAILED);
            GameUtils.dateEventSprite.dispatchEvent(daterEvent);
        };
        CallBack.prototype.xuanyaoCallBack = function (result) {
            if (result == 1) {
                GameUtils.is_xuanyao_success = true;
            }
            else {
                GameUtils.is_xuanyao_success = false;
            }
            var daterEvent = new EventData(EventData.DATA_XUANYAO);
            GameUtils.dateEventSprite.dispatchEvent(daterEvent);
        };
        CallBack.prototype.onPaySucceedCallBack = function () {
            var daterEvent = new EventData(EventData.DATA_ONPAY_SUCCEED);
            GameUtils.dateEventSprite.dispatchEvent(daterEvent);
        };
        return CallBack;
    }());
    JsCallBackEvent.CallBack = CallBack;
    __reflect(CallBack.prototype, "JsCallBackEvent.CallBack");
})(JsCallBackEvent || (JsCallBackEvent = {}));
//# sourceMappingURL=JsCallBackEvent.js.map
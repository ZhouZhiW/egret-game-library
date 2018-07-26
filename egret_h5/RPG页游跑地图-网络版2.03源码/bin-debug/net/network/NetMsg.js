/**
 *
 * @author
 *
 */
var NetMsg = (function () {
    function NetMsg() {
        this.init();
    }
    var d = __define,c=NetMsg,p=c.prototype;
    p.init = function () {
        //连接服务器
        //NetMsg.serverConn.Connection("echo.websocket.org",80);
        NetMsg.serverConn.Connection("127.0.0.1", 5657);
        //侦听 服务器连接类Connection.ts 返回的消息
        NetMsg.serverConn.addEventListener(DateEvent.DATE, this.getDate, this);
    };
    /**发送消息*/
    p.pushMsg = function (msg) {
        if (NetMsg.isConnection) {
            NetMsg.serverConn.sendData(msg);
        }
    };
    /**获取消息*/
    p.getDate = function (evt) {
        var msg = evt.testTxt;
        //console.log("收到数据：" + msg);
        var sArray = new Array();
        var msgZu = msg.split("&"); //分割消息
        if (msgZu.length < 1)
            return;
        var state = msgZu[0];
        msg = msgZu[1];
        switch (state) {
            case MsgType.msgA:
                console.log(msg);
                this.msgState(msg);
                break;
            case MsgType.msgB:
                this.msgContent(msg);
                break;
        }
        //this.msgText.text += "\nServer:" + msg;
    };
    /** 处理 状态消息*/
    p.msgState = function (msg) {
        console.warn("状态消息：" + msg);
        switch (msg) {
            case MsgType.msgA_a:
                NetMsg.isConnection = true;
                console.log("状态：" + msg);
                this.pushMsg("Hello, world！");
                break;
            case MsgType.msgA_b:
                console.log("状态：" + msg);
                break;
            case MsgType.msgA_c:
                console.log("状态：" + msg);
                break;
        }
    };
    /** 处理 内容消息*/
    p.msgContent = function (msg) {
        //console.warn("内容消息：" + msg);
        //console.log("内容：" + msg);
        //var sArray = new Array();
        console.log("收到数据：" + msg);
        var Obj = JSON.parse(msg);
        var key;
        for (key in Obj) {
        }
        console.warn(key);
        switch (key) {
            case "login":
                //var login:Login = new Login();
                Main.login.login(Obj);
                break;
            case "move":
                Move.move(Obj);
                break;
        }
    };
    /**服务器连接*/
    NetMsg.serverConn = new Connection();
    /**是否已连接了服务器*/
    NetMsg.isConnection = false;
    return NetMsg;
})();
egret.registerClass(NetMsg,'NetMsg');
//# sourceMappingURL=NetMsg.js.map
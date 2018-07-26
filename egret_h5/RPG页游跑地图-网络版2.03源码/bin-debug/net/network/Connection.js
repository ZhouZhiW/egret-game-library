/**
 *
 * @author
 *
 */
var Connection = (function (_super) {
    __extends(Connection, _super);
    function Connection() {
        _super.call(this);
        /**是否已连接了服务器*/
        this.isConnection = false;
    }
    var d = __define,c=Connection,p=c.prototype;
    /**
     * 连接至服务器
     * sc:地址
     * d:端口
     * */
    p.Connection = function (sc, d) {
        if (this.webSocket) {
            if (this.webSocket.connected) {
                //console.log("已有连接，勿重复");
                this.messageEvent(MsgType.msgA + "&" + MsgType.msgA_c);
                return;
            }
        }
        /**
        * 简单注解：
        * 首先，创建一个 代表本次连接的唯一的 套接字。
        * 然后，侦听 套接字 有没有 连接到 服务器。
        * 再后，侦听 套接字 有没有 收到 服务器返回的数据。
        * 最后，用 套接字 尝试连接至 服务器。（本地的“功能”都准备完毕后，就可以去尝试连接服务器了）
        */
        //1
        //new一个套接字（唯一的连接标识）
        this.webSocket = new egret.WebSocket();
        //2
        //侦听 套接字 跟 服务器 的 连接事件（如果检测到 连接至服务器成功了，就 转向 成功后要执行的子程序 onSocketOpen）
        this.webSocket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        //3
        //侦听 套接字 的 收到数据事件（如果检测到 服务器返回了数据，就 转向 收到数据后要执行的子程序 onReceiveMessage）
        this.webSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        //4
        //用 套接字 去尝试连接至 服务器（服务器地址：echo.websocket.org  服务器端口：80）
        this.webSocket.connect(sc, d);
    };
    /**跟 服务器连接成功后 执行的子程序*/
    p.onSocketOpen = function () {
        //this.isConnection = true;
        console.log("连接至服务器成功");
        this.messageEvent(MsgType.msgA + "&" + MsgType.msgA_a);
    };
    /**收到 服务器发来数据 后 执行的子程序*/
    p.onReceiveMessage = function (e) {
        var byteArray = new egret.ByteArray();
        var msg = this.webSocket.readUTF();
        //console.log("收到数据：" + msg);
        this.messageEvent(MsgType.msgB + "&" + msg);
    };
    /**向 服务器 发送数据*/
    p.sendData = function (cmd) {
        if (!this.webSocket.connected) {
            //console.log("尚未建立连接");
            this.messageEvent(MsgType.msgA + "&" + MsgType.msgA_b);
            return;
        }
        /*this.webSocket.type = egret.WebSocket.TYPE_BINARY;
        var byteArray: egret.ByteArray = new egret.ByteArray();
        byteArray.writeUTF(cmd);
        this.webSocket.writeBytes(byteArray);
        this.webSocket.flush();*/
        //var json = {'msg': 'Hello Egret WebSocket','msa': 'Hello Egret WebSocket' };
        var json = {
            "ms": [{
                    "msa": "Hello Egret WebSocket", "msb": "Hello Egret WebSocket" }] };
        //var json = { "['ms'{'msg': 'Hello Egret WebSocket','msa': 'Hello Egret WebSocket' }]"};
        //this.webSocket.writeUTF(JSON.stringify(json));
        this.webSocket.writeUTF(JSON.stringify(cmd));
        this.webSocket.flush();
        /*this.webSocket.writeUTF(cmd);
        this.webSocket.flush();*/
    };
    /**调度事件 利用自定义事件类DateEvent.ts 在各类之间传递消息内容*/
    p.messageEvent = function (msg) {
        //生成约会事件对象
        var daterEvent = new DateEvent(DateEvent.DATE);
        //添加对应的约会信息
        daterEvent.testTxt = msg;
        //发送要求事件
        this.dispatchEvent(daterEvent);
    };
    return Connection;
})(egret.Sprite);
egret.registerClass(Connection,'Connection');
//# sourceMappingURL=Connection.js.map
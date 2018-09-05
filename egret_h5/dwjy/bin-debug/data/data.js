var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Data = (function () {
    function Data() {
    }
    Data.mainlayer = null;
    Data.playlayer = null;
    Data.shareNum = 0;
    Data.Max_row = 5; /*每一行有多少数字方块*/
    Data._width = 104; /*数字方块的宽度*/
    Data.start_x = 10; /*数字方块的起始X值*/
    Data.start_y = 400; /*数字方块的起始Y值*/
    Data._w = 20; /*数字方块的间隔距离为20像素*/
    Data.colorArr = ["sp1_png", "sp2_png", "sp3_png", "sp4_png", "sp5_png", "sp6_png", "sp7_png", "sp8_png", "sp9_png"];
    return Data;
}());
__reflect(Data.prototype, "Data");

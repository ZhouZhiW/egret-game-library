var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var configData = (function () {
    function configData() {
    }
    return configData;
}());
configData.titel = "看看你内心的女子力有多少";
configData.dsc = "        18世纪，曾有科学家提出双性别论，即每个人的内心深处都有两种性别，在不同场景中会暴露出不一样的男女倾向。现在，听完这五段音乐，只凭直觉选出答案，看看你内心的女子力量是多少！";
configData.data = [
    {
        // url: "g1_jpg",
        title: "听到这段音乐，你想到的画面是？",
        result: null,
        _music: "1_mp3",
        bg: [
            {
                _png: "dong1_png",
                _json: "dong1_json",
                x: 272,
                y: 605
            },
            {
                _png: "dong2_png",
                _json: "dong2_json",
                x: 808,
                y: 700
            },
            {
                _png: "dong3_png",
                _json: "dong3_json",
                x: 272,
                y: 1200
            },
            {
                _png: "dong4_png",
                _json: "dong4_json",
                x: 808,
                y: 1230
            }
        ]
    },
    {
        // url: "g2_jpg",
        title: "听到这段声音，你认为它表达的更贴切哪个词语？",
        bg: null,
        _music: "2_mp3",
        result: [
            "A  神秘",
            "B  振奋",
            "C  思念",
            "D  紧张",
        ]
    },
    {
        // url: "g3_jpg",
        title: "听到这段音乐你觉得喝哪种饮料更搭配",
        bg: null,
        _music: "3_mp3",
        result: [
            "A  威士忌",
            "B  可乐",
            "C  橙汁",
            "D  红酒",
        ]
    },
    {
        // url: "g4_jpg",
        title: "你觉得这首音乐想表达的是",
        bg: null,
        _music: "4_mp3",
        result: [
            "A  对命运不公的无奈",
            "B  对未来生活美好的期许",
            "C  对远方爱人的思念",
            "D  对远方亲人的思念",
        ]
    },
    {
        // url: "g5_jpg",
        title: "听到此段音乐，你觉得更符合哪个时间段",
        bg: null,
        _music: "5_mp3",
        result: [
            "A  明媚的正午",
            "B  雾霭的清晨",
            "C  宁静的夜晚",
            "D  日落的黄昏",
        ]
    },
];
configData.selectScore = [];
configData.MainLayer = null;
configData.gameLevel = 0;
configData.downUrl = [
    {
        img: "down1_jpg",
        url: "http://q.m1758.com/play/game/quickstart2/745126bf12ed93625c46f699f285862e?chn=quiz_foolish"
    },
];
__reflect(configData.prototype, "configData");

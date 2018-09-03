class _data {
    public static Main_layer=null;
    public static _title: string = "看看您的左右脑年龄"
    public static start_bgY: number = 200;
    public static game_num: number = 9;//表示的是选择题的数量
    public static game_index: number = 0;
    public static game_url="http://wx.wxhtml5.com/hlmy/quyouxi.htm"
    public static img_type = [

        {
            title: " 这个男人的眼睛是在一条直线上吗？",
            icon: ["img1_jpg"],
            text_color: "      1",
            text: "/" + _data.game_num,
            result: [
                "text",
                "是",
                "不是"
            ]
        },
        {
            title: " 立方体中的竖线和哪条横向垂直？",
            icon: ["img2_jpg"],
            text_color: "      2",
            text: "/" + _data.game_num,
            result: [
                "text",
                "上面的横线",
                "下面的横线",
                "都垂直",
                "都不垂直"
            ]
        },
        {
            title: " 你能看到图中的字母吗？",
            icon: ["img3_jpg"],
            text_color: "      3",
            text: "/" + _data.game_num,
            result: [
                "text",
                "能",
                "不能"
            ]
        },
        {
            title: " 你看到的图中的厨房用品是什么颜色？",
            icon: ["img4_jpg"],
            text_color: "      4",
            text: "/" + _data.game_num,
            result: [
                "text",
                "紫色的",
                "白色的",
                "白和紫都有",
                "都没有看到"
            ]
        },
        {
            title: " 图中哪个蒙娜丽莎是看向你的？",
            icon: ["img5_jpg"],
            text_color: "      5",
            text: "/" + _data.game_num,
            result: [
                "text",
                "左边的",
                "右边的",
                "都是看向我的",
                "都没有看向我"
            ]
        },
        {
            title: " 图中红色方块是朝上还是朝下？",
            icon: ["img6_jpg"],
            text_color: "      6",
            text: "/" + _data.game_num,
            result: [
                "text",
                "朝上",
                "朝下"
            ]
        },
        {
            title: " 图中你能看到几种动物？",
            icon: ["img7_png","img7_json"],
            text_color: "     7",
            text: "/" + _data.game_num,
            result: [
                "text",
                "一种",
                "两种",
                "三种",
                "四种"
            ]
        },
        {
            title: " 数数有多少个三角形？",
            icon: ["img8_jpg"],
            text_color: "   8",
            text: "/" + _data.game_num,
            result: [
                "text",
                "7",
                "9",
                "11",
                "13"
            ]
        },
        {
            title: " 图中展开的立方体上标注着a、b、c、d、e、f 六个字母，折成立方体后以下哪个选项字母排序是正确的？",
            icon: ["img9_jpg"],
            text_color: "    9",
            text: "/" + _data.game_num,
            result: [
                "text",
                "abc相邻",
                "acf相邻",
                "efa相邻",
                "adf相邻"
            ]
        }
    ]
    public static result_1: string = "   你的左脑里住着一个充满灵性的小孩，思维方式不走寻\n常路，常常能蹦出许多让别人意想不到又大呼惊艳的好\n主意，是好友圈里名副其实的点子王！而你主管感性的\n右脑则是正在由年轻迈向成熟的26岁，所以你的情感常\n常比较矛盾，有时充满冲劲有时又瞻前顾后，有时沉着\n理性有时又有点歇斯底里，总之是又复杂\n 的人呢！"
    public static result_2: string = "   你的左脑年龄是11岁，这导致你思考问题的方式和其他\n多数人不同，更侧重直觉和感知能力，充满灵性。身边\n许多人无法理解你为何不需要做缜密的推断就能得出解\n决方案，但事实证明你做事的方法往往最终能够奏效。\n而你的右脑则是成熟的33岁，因此那些以为你在任何方\n面都灵活变通的人往往大跌眼镜。理感性的事情时\n ，你反而会显得小心翼翼甚至有些畏首畏尾，也许是因\n为见得太多的缘故吧。这样的你十分优秀，但有时也让\n人心疼。"
    public static result_3: string = "   真令人惊讶！你的左脑和右脑一样都如此的年轻呢！因\n此，你的思维十分活跃， 更倾向于充满灵性的思考方式\n，随时能擦出睿智的火花，而在为人处世方面，你不喜\n欢太多的去揣测更深层的意思，情感表达上，你也总是\n喜欢流露出最自然真实的状态。真好！完全就是一个像\n朝阳一样活力满满的人呢！"
    public static result_4: string = "   实在是太完美了！你有一颗十分年轻且均衡的大脑！无\n论是逻辑理性方面还是艺术感性方面，你都像一个精力\n充沛的青年人一样无懈可击。不知道你的这种能力是注\n重自身的锻炼还是与生俱来，总之祝福你将这种状态一\n直持续下去！这样的你实在十分难得！"
    public static result_5: string = "   你的思维方式活跃又不失严谨，在任何时候都能做出成\n熟但不乏创新的决策，所以你注定是一个不可多得的成\n功者，恭喜你！而在情感和艺术层面，你却像一个年逾\n不惑的智者，相比较身边的其他人，你更能够用淡然的\n态度去理解身边的事物，欣赏的艺术层次也更高。这样\n的你真的很棒~"
    public static result_6: string = "   你的左脑像一个正值壮年的人，沉着，又有活力，你的\n思维随时可以迸发出令人惊奇的能量，但又出乎意料的\n稳定，所以，可以说生活中没有你拿不下的事情！而你\n的右脑则是要相对成熟许多，喜欢用更为内敛的方式表\n达情感和抒发情绪，喜欢的东西也比身边的其他人要有\n内涵和深度的多。感觉是一个十分了不起的人呐！"
    public static result_7: string = "   你的左脑如同中青年人一样，有着十分成熟的思考能力\n，你处理起问题来十分沉着，能够理性判断并找出最适\n合自己的解决方案，且有着同时着手整理好几件事的能\n力，可以说是一个完美的多面手角色。而你主管感性的\n右脑却像一个小孩子一样，不喜欢遵循规则，也不喜欢\n算计，更倾向于按着自己的喜恶办事，这么有能力又有\n性格的你，一定有着很棒的人缘吧！"
    public static result_8: string = "   你有着像中年人一样成熟理性的左脑，这让你在处理严\n肃事务时游刃有余，有着旁人很难企及的分析力和决断\n能力。不过你右脑中的感性思维却让你时不时的像个单\n纯的小孩子，除去生活中正经的要事，大多数时候你喜\n欢什么都不想，一切跟着感觉走，而你的感觉也是一直\n敏锐而充满灵性。这真是一种令人十分羡慕的状态呢！"
    public static result_9: string = "   也许你的年纪不大，可你的思维方式却是十分的老练。\n左脑的影响，你善于观察，长于分析，也有着超乎常人\n的专注力和耐心，极少做出一时冲动的决策，一切行事\n必然是仔细斟酌后的决定。但这不代表你就是一个老气\n横秋难以相处的人，因为你负责处理感受的右脑是22岁\n充满活力的状态！你可以很快的接受新事物，轻易的和\n别人产生共鸣，这使你无论到多大年纪都能保持鲜活的\n生命力！好羡慕你啊~"
    public static result_10: string = "  如同一个睿智的智者，你思考问题的方式老练，并且深\n刻，甚至远远超出了你真实年龄应该有的层次，身边的\n人经常会被你的见解震慑到。但在你的右脑中，其实还\n是住着一个热血的青年，依然会在遇到热爱的事物时抑\n制不住自我，贡献出自己所有的热情与能量。不得不说\n，这样的你真的很棒啊~"

    public static game_result = [
        { strleft: "9岁", strright: "26岁", str: _data.result_1 },
        { strleft: "11岁", strright: "33岁", str: _data.result_2 },
        { strleft: "19岁", strright: "20岁", str: _data.result_3 },
        { strleft: "25岁", strright: "27岁", str: _data.result_4 },
        { strleft: "27岁", strright: "43岁", str: _data.result_5 },
        { strleft: "30岁", strright: "49岁", str: _data.result_6 },
        { strleft: "33岁", strright: "5岁", str: _data.result_7 },
        { strleft: "35岁", strright: "8岁", str: _data.result_8 },
        { strleft: "39岁", strright: "22岁", str: _data.result_9 },
        { strleft: "46岁", strright: "19岁", str: _data.result_10 }
    ]
    public static downUrl=[
        {
            img:"down1_jpg",
            url:"http://q.m1758.com/play/game/quickstart2/745126bf12ed93625c46f699f285862e?chn=quiz_foolish"
        },
        {
            img:"down2_jpg",
            url:"http://q.m1758.com/play/game/quickstart2/ac0f51ce5d76e0c86c71a6b79860a270?chn=quiz_foolish"
        }
    ]
}






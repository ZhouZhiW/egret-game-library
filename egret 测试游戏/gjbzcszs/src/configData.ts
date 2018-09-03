class configData {
    public static titel = "国际标准测试智商!"
    public static dsc = "可能是最靠谱的智商测试，国际标准权威题目，全方位评测你的大脑各方面能力，专业的评分制为你测定出最准确的的智商分数！"

    public static data = [
        {
            url: "g1_jpg",
            title: "找出最与众不同的那一个",
            result: [
                "A",
                "B",
                "C",
                "D",
                "E"
            ]
        },
        {
            url: "g2_jpg",
            title: "全班学生排成一行，从左数和从右数小明都是第15名，全班共有学生多少人?",
            result: [
                "15",
                "25",
                "29",
                "30",
            ]
        },
        {
            url: "g3_jpg",
            title: "哪项是图中系列钟表的延续？",
            result: [
                "A",
                "B",
                "C",
                "D",
                "E",
                "F"
            ]
        },
        {
            url: "g4_jpg",
            title: "长跑比赛中，你超过了第二名，请问现在你是第几名？",
            result: [
                "第一名",
                "第二名",
                "第三名",
                "倒数第二"
            ]
        },
        {
            url: "g5_jpg",
            title: "找出与“确信”意义最相近的一个词",
            result: [
                "明确",
                "正确",
                "肯定",
                "真实"
            ]
        },
        {
            url: "g6_jpg",
            title: "如果所有的甲都是乙，没有一个乙是丙，那么，“一定没有一个丙是甲”。这句话是",
            result: [
                "正确的",
                "错误的",
                "不对也不错",
            ]
        },
        {
            url: "g7_jpg",
            title: "一本书的价格降低了50％。现在，如果按原价出售，提高了百分之几?",
            result: [
                "35%",
                "50%",
                "75%",
                "100%"
            ]
        },
        {
            url: "g8_jpg",
            title: "小明比小强大，小红比小明小。下列陈述中哪一句最正确?",
            result: [
                "小红比小强大",
                "小红比小强小",
                "小红和小强一样大",
                "无法确定谁大谁小"
            ]
        },
        {
            url: "g9_jpg",
            title: "把图中的各部分组合起来，可以得到哪个数字？",
            result: [
                "3",
                "4",
                "5",
                "6"
            ]
        },
    ]
    public static result = [
        [0, 0, 3, 0, 0],
        [0, 0, 1, 0],
        [0, 1, 0, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 1, 0],
        [0, 0, 0, 1],
        [0, 0, 0, 1],
        [0, 0, 0, 1],
    ];

    public static selectScore: number = null;
    public static MainLayer = null;
    public static gameLevel = 0;
    public static downUrl = [
        {
            img: "down_jpg",
            url: "http://wx.wxhtml5.com/hlmy/quyouxi.htm"
        }
       
    ]
}
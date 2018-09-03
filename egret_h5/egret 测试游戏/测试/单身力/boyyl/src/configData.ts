class configData {
    public static titel = "看看你的男友力有多少"
    public static dsc = "        男友力就是适合做男朋友的程度，简单来说可以理解为男人味，抽象一点就是男友指数，延伸一下就是很适合做男朋友，让女友产生少女心 ，是存在于情侣间的小粉红；还有升级版的就是“男友力max”，适合做男朋友的程度max（最大）"

    public static data = [
        {
            // url: "g1_jpg",
            title: "风景如画，姑娘让你帮她拍张照，你会选择哪个角度？",
            result: null,
            bg: [
                "game1_jpg",
                "game2_jpg",
                "game3_jpg",
                "game4_jpg",
            ]

        },
        {
            // url: "g2_jpg",
            title: "游戏打得正high，女友来电，你会等多久才接起电话？",
            bg: null,
            result: [
                "A  立即接",
                "B  躲到草丛再接",
                "C  回城再接",
                "D  挂掉",
            ]
        },
        {
            // url: "g3_jpg",
            title: "女友带着你，你带着钱，开开心心逛街，偶遇她前任，你会怎么",
            bg: null,
            result: [
                "A  马上带女友杀进最贵的店",
                "B  壁咚亲亲一条龙，怎么恩爱怎么来",
                "C  十指紧扣，上前打招呼",
                "D  冤家路窄，当没看见",
            ]
        },
        {
            // url: "g4_jpg",
            title: "给你前往另一个地球“开普勒-452b”开荒的机会，下列物品可以选一样带走，你选哪个？",
            bg: null,
            result: [
                "A  一只鸡",
                "B  一部能和地球通讯的手机",
                "C  游戏机",
                "D  你最爱的一本书",
                "E  宠物",
                "F  种子",
                "G  生活服务机器人",
                "H  一张最珍贵的照片",
            ]
        },
        {
            // url: "g5_jpg",
            title: "我们突破科学，突破性别，能让你和他们互换人生三天，你要和谁换？",
            bg: null,
            result: [
                "A  邓超",
                "B  郭敬明",
                "C  凤姐",
                "D  鹿晗",
                "E  范冰冰",
                "F  王思聪",
                "G  不想变"
            ]
        },
        {
            // url: "g6_jpg",
            title: "最后一个问题，你一般会选什么风格的图片做微信头像？",
            bg: null,
            result: [
                "A  自己的照片",
                "B  和女朋友的合影",
                "C  网络表情",
                "D  抽象图或者偶像",
                "E  随意,看心情"

            ]
        },

    ]
    public static result = [
        [3, 0, 2, 1],
        [3, 2, 1, 0],
        [3, 0, 1, 2],
        [1, 5, 0, 2, 4, 3, 1, 6],
        [2, 0, 1, 5, 1, 4, 3],
        [2, 4, 0, 1, 3],
    ];

    public static selectScore = [];
    public static MainLayer = null;
    public static gameLevel = 0;
    public static downUrl = [
        {
            img: "down1_jpg",
            url: "http://q.m1758.com/play/game/quickstart2/745126bf12ed93625c46f699f285862e?chn=quiz_foolish"
        },
        // {
        //     img: "down2_jpg",
        //     url: "http://q.m1758.com/play/game/quickstart2/ac0f51ce5d76e0c86c71a6b79860a270?chn=quiz_foolish"
        // }
    ]

    /*
    http://www.miaobaicai.me/quiz/5?from=singlemessage&isappinstalled=0
    1 67>3 65>4 60>2 56
    1 67>2 65>3 60>4 56
    1 67>4 65>3 60>2 56
    8 89>2 81>5 80>6 77>4 74>3 65>1 67>==7 67
    4 80>6 77>7 74>1 67>3 65>==5 65>2 60
    2 77>5 74>1 67>4 65>3 60
min 7
max 122


			
				
					
	

			


    */
}
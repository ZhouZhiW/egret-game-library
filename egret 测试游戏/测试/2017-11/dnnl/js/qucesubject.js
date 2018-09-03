/**
 * Created by delan on 2015/10/17.
 */
var quceSubject = (function(){
    var that;
    var gamedata1={
        author: "86",
        cid: "6",
        desc: "大脑是我们的智力库，决定着我们能否当个聪明人。随着年龄的增长，大脑的年龄也随着变化，你的大脑现在处于什么年龄段？快来测测吧~",
        id: "5489",
        img: "quce/1512554724ZJ9AZ.jpg",
        is_game: "0",
        like_num: "0",
        logo: "quce/1512554731ztOfl.jpg",
        question
            : [{
            "img": ""
            , "question": "你觉得以下哪一套衣服最能展现女生的魅力？", "audio": "", "answer": { "a": { "title": "比基尼", "weight": "4", "img": "" }, "b": { "title": "婚纱", "weight": "3", "img": "" }, "c": { "title": "校服", "weight": "2", "img": "" }, "d": { "title": "礼服", "weight": "5", "img": "" }, "e": { "title": "运动装", "weight": "1", "img": "" } }, "weight": "1"
        },

            { "img": "", "question": "当你十分气愤，必须要砸坏一样东西才能缓解的时候，你会选择砸什么？", "audio": "", "answer": { "a": { "title": "遥控器", "weight": "1", "img": "" }, "b": { "title": "水杯", "weight": "4", "img": "" }, "c": { "title": "碗", "weight": "2", "img": "" }, "d": { "title": "手机", "weight": "3", "img": "" } }, "weight": "1" }, { "img": "", "question": "以下节日你最喜欢哪一个？", "audio": "", "answer": { "a": { "title": "中秋节", "weight": "2", "img": "" }, "b": { "title": "元宵节", "weight": "3", "img": "" }, "c": { "title": "圣诞节", "weight": "5", "img": "" }, "d": { "title": "春节", "weight": "1", "img": "" }, "e": { "title": "情人节", "weight": "4", "img": "" } }, "weight": "1" },
            { "img": "", "question": "以下哪一个人最容易成为你的朋友？", "audio": "", "answer": { "a": { "title": "成绩超好，为人高冷的男同学", "weight": "1", "img": "" }, "b": { "title": "阳光帅气，热爱运动的男同学", "weight": "3", "img": "" }, "c": { "title": "喜欢时尚，爱聊八卦的女同学", "weight": "4", "img": "" }, "d": { "title": "温柔体贴，性格单纯的女同学", "weight": "2", "img": "" } }, "weight": "1" },
            { "img": "", "question": "去吃西餐你会先吃什么？", "audio": "", "answer": { "a": { "title": "肉类", "weight": "3", "img": "" }, "b": { "title": "沙拉", "weight": "1", "img": "" }, "c": { "title": "甜品", "weight": "4", "img": "" }, "d": { "title": "面包", "weight": "2", "img": "" } }, "weight": "1" },
            { "img": "", "question": "不管是看书、看视频、还是玩手机，如果在床上你会采取什么样的姿势？", "audio": "", "answer": { "a": { "title": "趴着看", "weight": "4", "img": "" }, "b": { "title": "侧卧看", "weight": "3", "img": "" }, "c": { "title": "背后垫着东西靠着看", "weight": "2", "img": "" }, "d": { "title": "端坐着看", "weight": "1", "img": "" } }, "weight": "1" }
        ],
        new_plan: "2",
        original: "1",
        share_url: "http://mp.weixin.qq.com/s/BIsc795IhMcVcfbz1zct-g",
        status: "1",
        subscribe: "16",
        title: "你的大脑处于什么年龄段？",
        tpl_id: "11",
        type: "2",
        utime: "1512727801",
        view: "74700",
    }
    function quceSubject(gameData, resPath){

        this.allData = eval(gamedata1);
        // this.title = eval(this.allData['title']);
        this.logo = this.allData['logo'];
        this.questions = eval(this.allData['question']);
       /* this.result = eval(this.allData['result'])*/
        this.length = this.questions.length;
        this.type =  this.allData.type;
        this.resPath = resPath + '/';
        this.preLoadImg = [];
        this.preLoadAudio = [];
        this._init();
        that = this;
    }

    quceSubject.prototype._init= function(){
        var questions = this.questions;
        for(var i=0; i<this.length; i++){
            if(questions[i].img && !(questions[i].img.indexOf("http://") > -1)){
                questions[i].img = this.resPath  +　questions[i].img;
                this.preLoadImg.push(questions[i].img);
            }
            if(questions[i].audio){
                if(!(questions[i].audio.indexOf("http://") > -1)){
                    questions[i].audio = this.resPath  +　questions[i].audio;
                }
                this.preLoadAudio.push(questions[i].audio);
            }
            var answer = questions[i].answer;
            for(var key in answer){
                if(answer[key].img){
                    answer[key].img = this.resPath  +  answer[key].img;
                    this.preLoadImg.push(answer[key].img);
                }
            }
        }
/*        var result = this.result;
        for(var i =0; i< result.length;i++ ){
            if(result[i].img && !(result[i].img.indexOf("http://") > -1)){
                result[i].img = this.resPath  +　result[i].img;
            }
        }*/
        this.questions = questions;
       /* this.result = result;*/
    };

    quceSubject.prototype.getBaseInfo = function(){
        var questionInfo = {};
        questionInfo['title'] =  this.allData.title;
        questionInfo['desc'] =  this.allData.desc;
        questionInfo['id'] =  this.allData.id;
        questionInfo['shareImg'] = this.resPath + this.allData.img;
        questionInfo['shareUrl'] = this.allData['share_url'];
        if(this.allData['logo']){
        	questionInfo['logo'] = this.resPath + this.allData['logo'];
        }else{
        	questionInfo['logo'] = this.allData['logo'];
        }
        return questionInfo;

    };

    quceSubject.prototype.getShareImg = function(){
        var shareImg = this.resPath + this.allData.img;
        return shareImg;

    };

    /*获取题目数量*/
    quceSubject.prototype.getQuestionNum = function(){
        return this.length;
    };

    /* 获取某道题的问题 */
    quceSubject.prototype.getNthQuestion = function( index ){
        if(index >= 0 && index < this.length)
            return this.questions[index]['question'];
        else
            return false;
    };

    quceSubject.prototype.getNthQuestionImg = function( index ){
        if(index >= 0 && index < this.length)
            return this.questions[index]['img'];
        else
            return false;
    };

    quceSubject.prototype.getNthQuestionAudio = function( index ){
        if(index >= 0 && index < this.length)
            return this.questions[index]['audio'];
        else
            return false;
    };

    /* 获取某道题的选项 只提供index则返回整个选项， 若提供optIndex， 则返回具体选项内容*/
    quceSubject.prototype.getNthQuestionOpt = function( index, optIndex){
        if(index >= 0 && index < this.length){
            var option = optIndex?(this.questions[index]['answer'][optIndex]):(this.questions[index]['answer']);
            return option;
        }
        else
            return false;
    };


    quceSubject.prototype.getCommonResult = function(level){
        var answer = this.result;
        for(var i=0; i< answer.length; i++){
            if(answer[i].threshold == level){
                return answer[i];
            }
        }
        return false;
    };

    quceSubject.prototype.getMultipleResult = function(score){
        var answer = this.result;
        for(var i=0; i< answer.length; i++){
            if(score >= answer[i].threshold){
                return answer[i];
            }
        }
        return false;
    }

    /* 获取所有正确答案 或 某道题正确选项 */
    quceSubject.prototype.getRightAnswer = function( index ){
        var isMul =  this.type == "2";
        
        if(!isMul) return false;
        if(index){
            var answerIndex = this.getNthQuestionOpt(index);
            var maxOption = getRightAnswer(answerIndex);
            return maxOption;
        }

        var rightAnswer = [];

        var questions = this.questions;
        for(var i in questions){
            var answerIndex = questions[i]['answer'];
            var maxOption = getRightAnswer(answerIndex);
            rightAnswer[i] = [];
            rightAnswer[i]['title'] = questions[i]['question'];
            rightAnswer[i]['id'] = maxOption;
            rightAnswer[i]['text'] = questions[i]['answer'][maxOption]['title'];
        }
        return rightAnswer;
    };

    function getRightAnswer(answerIndex){
        var maxScore = 0, maxOption;
        for(var j in answerIndex){
            var itemWeight = answerIndex[j]['weight'];
            if(itemWeight >= maxScore){
                maxScore = itemWeight;
                maxOption = j;
            }
        }
        return maxOption;
    }

    return quceSubject;
}());





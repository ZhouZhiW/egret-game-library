/**
 * Created by delan on 2015/10/17.
 */
var quceSubject = (function(){
    var that;
    function quceSubject(gameData, resPath){
        this.allData = eval(gameData);
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





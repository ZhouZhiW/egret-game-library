/**
 * Created by anbin on 2017/3/28.
 */
var quceSubject = new quceSubject(gameData, adminPath);
var baseInfo = quceSubject.getBaseInfo();
var total = quceSubject.length; // 总题数
var score = 0;
var quizType = parseInt(quceSubject.type);
var current = 1;
var next = 0;
var finish = 0;
var selectflag = true;
var preLoadImg = quceSubject.preLoadImg;
var preLoadAudio = quceSubject.preLoadAudio;
//var audiobtn = document.getElementById('audiobtn');
var result;
var gettjflag = true;
var quizaudio = document.getElementById('quizaudio');
quizaudio.loop = false;
var audioloadflag = false;
var allowaudioplay = false;
var audioindex = 0;
var audioreadyStates = [];
var appendFlag = true;

var u = navigator.userAgent, app = navigator.appVersion;
var isIphone = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

var Questiontemp = $('#temp_question').html();
var answertemp = $('#temp_answer').html();
var Imagetemp = $('#temp_image').html();
var ResultImagetemp = $('#temp_result_image').html();
var btntemp = $('#temp_btn').html();
var Audiotemp = $('#temp_audio').html();
var append_timer;
var resultTjFlag = true;

String.prototype.wreplace = function(obj) {
    return this.replace(/\##\w+\##/gi, function(matchs) {
        var returns = obj[matchs.replace(/\##/g, "")];
        return (returns + "") == "undefined" ? "" : returns;
    });
};
function initQuceTest(){
    //$('.page_header').html(baseInfo['title']);
    var dom_arr = new Array();
    var btn_arr = new Array();
    var desc = getQuestionDom(baseInfo['desc']);
    dom_arr.push(desc);
    if(baseInfo['logo']){
        var logo = getImageDom(baseInfo['logo']+'?imageView2/2/w/480');
        dom_arr.push(logo);
    }
    btn_arr.push(getBtnDom('start'));
    appendHtmltoList(dom_arr,btn_arr);
    $('#load_mask').hide();
}
function getQuestionDom( contetn ){
    var data = new Array();
    data['content'] = contetn;
    var html = Questiontemp.wreplace(data);
    return html;
}
function getAnswerDom( contetn ){
    var data = new Array();
    data['answer'] = contetn;
    if(usericon){
        data['usericon'] = usericon;
    }
    var html = answertemp.wreplace(data);
    return html;
}
function getImageDom( src ){
    var data = new Array();
    data['src'] = src;
    var html = Imagetemp.wreplace(data);
    return html;
}
function getResultImageDom( src ){
    var data = new Array();
    data['src'] = src;
    var html = ResultImagetemp.wreplace(data);
    return html;
}
function getAudioDom( src ){
    var data = new Array();
    data['audio'] = src;

    var html = Audiotemp.wreplace(data);
    return html;
}
function getBtnDom(question){
    var data = new Array();
    if(question == 'start'){
        data['btn_title'] = '开始';
        data['btn_id'] = 'start_game';
        data['btn_onclick'] = 'setQuestion(0);';
    }else if(question == 'result'){
        data['btn_title'] = '再测一次';
        data['btn_id'] = 'start_game';
        data['btn_onclick'] = 'playAgain();';
    }else{
        data['btn_title'] = question['key'];
        data['btn_id'] = question['key'];
        data['btn_value'] = question['value'];
        data['btn_onclick'] = "check('"+data['btn_value']+"')";
    }
    var html = btntemp.wreplace(data);
    return html;
}
function appendHtmltoList(dom_array,btn_arr){
    if(appendFlag){
        appendFlag = false;
        var length = dom_array.length;
        var i = 0;
        append_timer = setInterval(function(){
            if( i < length ){
                $('#xb_chat_content').append(dom_array[i++]);
                scroll();
                if(i == length){
                    appendFlag = true;
                    clearInterval(append_timer);
                    $('#xb_btn_field').empty();
                    if(btn_arr.length > 4){
                        try {
                            var morebtnprompt = localStorage.getItem('quiz_morebtnprompt_flag');
                            if(!morebtnprompt){
                                $('#morebtn_prompt').addClass('morebtn_prompt_show');
                                localStorage.setItem('quiz_morebtnprompt_flag', '1');
                                setTimeout(function(){
                                    $('#morebtn_prompt').removeClass('morebtn_prompt_show');
                                },2000);
                            }
                        }catch(e){

                        }
                        $('#xb_btn_field').css('display','block');
                        $('#xb_btn_field').css('overflow-x','auto');
                        $('.xb_btn_container').css('min-width','90px');
                    }else{
                        $('#xb_btn_field').css('display','table');
                    }
                    for(var j = 0; j < btn_arr.length; j++){
                        $('#xb_btn_field').append(btn_arr[j]);
                    }
                }
            }
        },500);
    }
}
function scroll() {
   /* var div = document.getElementById('msg_end');
    div.click();*/
    //$('#xb_page_body').scrollTop($('#xb_chat_content').height());
    $('#xb_page_body').animate({scrollTop:$('#xb_chat_content').height()},450);
}
function playAgain(){
    selectOption = [];
    score=0;
    current = 1;
    finish = 0;
    next = 0;
    num = 0;
    audioindex = 0;
    setQuestion(0);
}

function check(value){
    if(!quizaudio.paused){
        quizaudio.pause();
        document.getElementsByClassName('audio_playing')[0].setAttribute('class', 'xb_conv_left audio_pause');
    }
    paduan(value);
}
function paduan(selected) {
    if (quizType == 1) {
        selectOption.push(selected);
        showResult();
    } else if (quizType == 2) {
        selected = parseInt(selected);
        score += selected;
        selectOption.push(selected);
        if (total == current) {
            showResult();
        } else {
            setQuestion(current);
            current += 1;
        }
    } else if (quizType == 3) {
        var answer = quceSubject.getNthQuestionOpt(finish);
        for(var key in answer){
            if(answer[key].next == selected){
                next = answer[key].next;
                selectOption.push(next);
                if(checking(next)){
                    showResult(next);
                    current = total;
                    return;
                }else{
                    current = next;
                }
                break;
            }
        }
        next = next -1;
        finish = next;
        setQuestion(next);
    }
}
function checking(s) {
    var regexp = /^[a-zA-Z]+$/;
    if(regexp.test(s)){return true;}
    else {return false;}
}
function showResult(){
    $('#xb_chat_content').append(getQuestionDom('正在为你分析结果...'));
    scroll();
    getResult(resultServer, baseInfo['id'], selectOption, getResultCallback);
}
function getResultCallback(response, gResult, waittime){
    result = response;
    gameresult = gResult;
    attentioncid = result['attention']['account'];
    qrcodelink =  './' + result['attention']['qrcode'];
    if(isLowVersion && attentioncid != '61' && attentioncid != 44 && attentioncid != 18){
        attentioncid = 32;
    }
    getResulttj();


    var resultimg = new Image();
    resultimg.crossOrigin = '';
    resultimg.onload = function(){
        drawCanvas(resultimg, function(resultimage){
            var resultdom = getResultImageDom(resultimage);
            waittime = waittime-2;
            if(waittime > 0){
                setTimeout(function(){
                    $('#xb_chat_content').append(resultdom);
                    scroll();
                    setTimeout(function(){
                        $('#xb_chat_content').append(getQuestionDom('长按上方图片保存你的结果卡片'));
                        scroll();
                        $('#xb_btn_field').empty();
                        $('#xb_btn_field').css('display','table');
                        $('#xb_btn_field').append(getBtnDom('result'));
                    },2000);
                },waittime*1000);
            }else{
                $('#xb_chat_content').append(resultdom);
                scroll();
                setTimeout(function(){
                    $('#xb_chat_content').append(getQuestionDom('长按上方图片保存你的结果卡片'));
                    scroll();
                    $('#xb_btn_field').empty();
                    $('#xb_btn_field').css('display','table');
                    $('#xb_btn_field').append(getBtnDom('result'));
                },2000);
            }
        });
    }
    resultimg.src = result['img'];



    var answerTitle = result['title'];
    if(result['sharetitle']){
        shareConfig.title = shareData.title = result['sharetitle'];
    }else if(answerTitle){
        shareConfig.title = shareData.title = "我在《" + baseInfo.title + "》中测试结果是：" + answerTitle + "。你也来试试";
    }
}
function getResulttj(){
    if(resultTjFlag){
        resultTjFlag = false;
        $.ajax({
            type: 'POST',
            url: resultTjurl,
            data: {id: gid, acid: acid, account: attentioncid},
            success: function(data){
                resultTjFlag = false;
            },
            error: function(){
                resultTjFlag = true;
            }
        })
    }
}

function drawCanvas(bgimg, callback){
    if(isLowVersion || attentioncid == 61 || attentioncid == 1001 || attentioncid == 1002){
        callback(bgimg.src);
        return false;
    }

    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    var qrcode = new Image();
    qrcode.crossOrigin = '';
    qrcode.onload = function(){
        canvas.width = bgimg.width;
        canvas.height = bgimg.height;
        ctx.drawImage(bgimg, 0, 0);
        ctx.drawImage(qrcode, 0, 0, qrcode.width, qrcode.height, 0, bgimg.height - qrcode.height, qrcode.width, qrcode.height);
        callback(canvas.toDataURL());
        return false;
    }
    qrcode.src = qrcodelink;
}

function setQuestion(qNum){
    var question = quceSubject.getNthQuestion(qNum);
    var answer = quceSubject.getNthQuestionOpt(qNum);
    var questionImg = quceSubject.getNthQuestionImg(qNum);
    var questionAudio = quceSubject.getNthQuestionAudio(qNum);
    var dom_arr = new Array();
    var btn_arr = new Array();
    dom_arr.push(getQuestionDom(question));
    if(questionImg){
        dom_arr.push(getImageDom(questionImg+'?imageView2/2/w/480'));
    }
    console.log(questionAudio)
    if(questionAudio){
        dom_arr.push(getAudioDom(questionAudio));
    }
    var answerTemp;
    var hasimage = false;
    for(var key in answer){
        answerTemp = answer[key];
        if (quizType == 1) {
            answerTemp['value'] = key.toUpperCase();
        } else if (quizType == 2) {
            answerTemp['value'] = answerTemp['weight'];
        } else if (quizType == 3) {
            answerTemp['value'] = answerTemp['next'];
        }
        answerTemp['num'] = key;
        answer[key]['key'] = key;
        if(answer[key]['img']){
            hasimage = true;
        }
        btn_arr.push(getBtnDom(answerTemp));
    }
    var questionOption = '';
    for(var key in answer){
        answer[key]['key'] = key;
        if(!hasimage){
            questionOption += getQuestionDom(key+ '. ' + answer[key]['title']);
        }else{
            var optemp = '';
            optemp = getQuestionDom(key+ '. ' + answer[key]['title']);
            if(answer[key]['img']){
                optemp += getImageDom(answer[key]['img']);
            }
            dom_arr.push(optemp);
        }
    }
    if(questionOption != ''){
        dom_arr.push(questionOption);
    }
    appendHtmltoList(dom_arr,btn_arr);
}

function showError(errorcode){
    window.location = resultPage+"/id/"+baseInfo.id+"/tpl/v8/option/"+selectOption+"/errorcode/"+errorcode;
}

function playAudio(that, src){
    that.children[1].style.display = 'none';
    allowaudioplay = true;
    that.setAttribute('class', 'xb_conv_left audio_playing');
    quizaudio.setAttribute('src', src);
    if(isIphone){
        quizaudio.play();
    }else{
        if(audioloadflag){
            quizaudio.play();
        }
    }
}

quizaudio.addEventListener('canplaythrough', function () {
    audioloadflag = true;
    if(allowaudioplay){
        quizaudio.play();
    }
}, false);

quizaudio.addEventListener('ended', function () {
    document.getElementsByClassName('audio_playing')[0].setAttribute('class', 'xb_conv_left audio_pause');
}, false);

$('#morebtn_prompt').click(function(){
    try {
        localStorage.setItem('quiz_morebtnprompt_flag', '1');
        $('#morebtn_prompt').removeClass('morebtn_prompt_show');
    }catch(e){

    }
});
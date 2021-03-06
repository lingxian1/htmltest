//题目数量
var questionCount = 10;
//当前题目指针
var questionIndex = 0;

//问题ID
var questionID="";
//题目类型
// var questionType = "multiple";
var questionType = "signal";
//问题
var question = "题目获取中...";
//选项数量
var selectCount = 4;
//具体选项
var answerA = "问题获取中...";
var answerB = "问题获取中...";
var answerC = "问题获取中...";
var answerD = "问题获取中...";

//临时答案计数数组
var count=new Array(0,0,0,0);
var answerStr="";
//保存题目数据（临时）
var data;

//初始化
$(function(){
    //获取考试信息
    $.get('./exam.json',function (result) {
        //考试时间
        var sumtime=result.answer_time;
        questionCount=result.question_count;
        setTime(sumtime);
    }),
    $.get('./question.json',function (datas) {  //获取全部题目信息
        data=datas;
        setAnswer(0);
        setQuestion();
        setSelects();
    }),
        initAnswer()
});

//初始化选项选中标志
function initAnswer(){
    $('#OK_A,#OK_B,#OK_C,#OK_D').addClass('hide');
}

//设置答案
function setAnswer(index) {
    questionID=data[index].question_ID;
    question=data[index].question_text;
    questionType=data[index].question_type;
    selectCount=data[index].question_choose_count;
    answerA=data[index].question_chooseA;
    answerB=data[index].question_chooseB;
    answerC=data[index].question_chooseC;
    answerD=data[index].question_chooseD;
    // console.log(questionIndex);
}
//计时器
function setTime(sumtime){
    /**
     * 注意：
     * localStorage保存时长为永久，必须自己removeItem
     * 所以建议使用sessionStorage(关闭会话自动清除)
     * 也可以先检测一下然后手动removeItem毕竟sessionStorage关了会话就没了也有弊端
     * 所以用哪个视情况而定
     */
    //localStorage获取
    var starttime = localStorage.getItem('starttime');
    if(!starttime){ //没有就new一个并扔进去(Date会自动toString)
        starttime = new Date();
        localStorage.setItem('starttime',starttime);
    }else{ //有就把字符串转成Date
        starttime = new Date(starttime);
    }
    var interval = setInterval(function () {
        var newtime = new Date();
        var seconds = (newtime - starttime) / 1000;
        var time = secondstotime(parseInt(sumtime - seconds));
        $('#time').text(time);
    }, 100);//0.1s刷新1次
    setTimeout(function () {
        clearInterval(interval);
        localStorage.removeItem('starttime'); //清除本地数据
        saveAnswer();
    }, sumtime * 1000)
}

//秒数转换
function secondstotime(seconds) {
    var hours = parseInt(seconds / 3600);
    seconds %= 3600;
    var minutes = parseInt(seconds / 60);
    seconds %= 60;
    return hours + ':' + minutes + ':' + seconds;
}

//下一题
function after() {
    //保存答案
    createAnswer(answerStr);
    questionIndex++;
    if(questionIndex>=questionCount){
        submitAnswer();
        console.log("done");
    }else {
        if(questionIndex==questionCount-1){
            $("#after").html("提交");
        }
        initAnswer();
        setAnswer(questionIndex);
        setQuestion();
        setSelects();
    }
}

//todo 上一题
function before() {

}

//设置问题及其类型
function setQuestion() {
    var index=questionIndex+1;
    $("#questionType").html(questionType + "(" + index + "/" + questionCount + ")");
    $("#question").html(index + ")." + question);
}

//设置选项
function setSelects() {
    $("#answerA").html(answerA);
    $("#answerB").html(answerB);
    $("#answerC").html(answerC);
    $("#answerD").html(answerD);
    $("#selectC,#selectD").show();
    if (selectCount == 3) {
        $("#selectD").hide();
    }
    if (selectCount == 2) {
        $("#selectC").hide();
        $("#selectD").hide();
    }
}

//被选中效果 questionType全局
function isSelected(e) {
    if (questionType == "signal") {
        $('[id^="OK_"]').addClass('hide');
        $('#OK_'+e.id.substr(e.id.length-1,1)).removeClass('hide');
        answerStr=e.id.substr(e.id.length-1,1);
    }else if(questionType == "multiple"){
        $('#OK_'+e.id.substr(e.id.length-1,1)).toggleClass('hide');
        var choose=e.id.substr(e.id.length-1,1);
        count[choose.charCodeAt()-65]++;//保存临时答案计数数组
    }
}

//生成考生答案_每道题
function createAnswer(answerStr) {
    if(questionType == "multiple"){//多选答案生成
        var answerStr="";
        for(var i=0;i<4;i++){
            if(count[i]%2==1){
                answerStr+=String.fromCharCode(65+i);
            }
            count[i]=0;//重置临时答案计数数组
        }
    }
    console.log(questionID+"- "+answerStr);
    localStorage.setItem(questionID,answerStr);
}

//递交答案
function submitAnswer() {
    var msg = "确定提交";
    if (confirm(msg)==true){
        saveAnswer();
    }else{
        return false;
    }
}


//答案包装为JSON
function ansToJson() {
    var json = {}, json_sorted = {}, keys = [];
    localStorage.removeItem("starttime")
    for(var k in localStorage) {
        keys.push(k);
        json[""+k] = localStorage[k];
    }
    console.log(json);
    json_sorted = JSON.stringify(json);
    return json_sorted;
}
//上传答案
function saveAnswer() {
    ansToJson();
    //todo ajax上传服务器
    console.log("上传成功");
    localStorage.clear();//清空本地存储
    //todo 结果界面
}

//退出答题
function exit(){
    var msg = "退出时将提交数据且不可再次进入！";
    if (confirm(msg)==true){
        saveAnswer();
    }else{
        return false;
    }
}

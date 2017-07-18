//选项数量
var selectCount = 4;
//题目数量
var questionCount = 100;
//当前题目指针
var questionIndex = 0;
//题目类型
var questionType = "multiple";
var questionType = "signal";
//问题
var question = "jijkhdiokfv利用CSS进行元素的水平居中，比较简单，行级元素设置其父元素的text-align center，块级元素设置其本身的left 和 right margins为auto即可。本文收集了六种利用css进行元素的垂直居中的方法，每一种适用于不同的情况，在实际的使用过程中选择某一种方法即可";
//具体选项
var answerA = "1234";
var answerB = "2344";
var answerC = "0987";
var answerD = "73468";

//临时答案计数数组
var count=new Array(0,0,0,0);
var answerStr="";

var data;

//初始化
$(function(){
    $.get('./exam.json',function (result) {
        //考试时间
        var sumtime=result.answer_time;
        questionCount=result.question_count;
        setTime(sumtime);
    }),
    $.get('./question.json',function (datas) {
        data=datas;
        setAnswer(0);
        setQuestion();
        setSelects();
    }),
        initAnswer()
});

//初始化
function initAnswer(){
    $('#OK_A,#OK_B,#OK_C,#OK_D').addClass('hide');
}

function setAnswer(index) {
    question=data[index].question_text;
    console.log(question);
    questionType=data[index].question_type;
    selectCount=data[index].question_choose_count;
    answerA=data[index].question_chooseA;
    answerB=data[index].question_chooseB;
    answerC=data[index].question_chooseC;
    answerD=data[index].question_chooseD;
    questionIndex++;
    console.log(questionIndex);
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
    initAnswer();
    setAnswer(questionIndex);
    setQuestion();
    setSelects();
    //todo 保存答案
    //console.log(getAnswer());
}

//上一题
function before() {

}

//设置问题及其类型
function setQuestion() {
    $("#questionType").html(questionType + "(" + questionIndex + "/" + questionCount + ")");
    $("#question").html(questionIndex + ")." + question);
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
        // switch(e.id){
        //     case "selectA":
        //         $('#OK_B,#OK_C,#OK_D').addClass('hide');
        //         $('#OK_A').removeClass('hide');
        //         break;
        //     case "selectB":
        //         $('#OK_A,#OK_C,#OK_D').addClass('hide');
        //         $('#OK_B').removeClass('hide');
        //         break;
        //     case "selectC":
        //         $('#OK_B,#OK_A,#OK_D').addClass('hide');
        //         $('#OK_C').removeClass('hide');
        //         break;
        //     case "selectD":
        //         $('#OK_B,#OK_C,#OK_A').addClass('hide');
        //         $('#OK_D').removeClass('hide');
        //         break;
        //     default:
        // }
        $('[id^="OK_"]').addClass('hide');
        $('#OK_'+e.id.substr(e.id.length-1,1)).removeClass('hide');
        answerStr=e.id.substr(e.id.length-1,1);
    }else if(questionType == "multiple"){
        $('#OK_'+e.id.substr(e.id.length-1,1)).toggleClass('hide');
        var choose=e.id.substr(e.id.length-1,1);
        count[choose.charCodeAt()-65]++;//保存临时答案计数数组
    }
}

//生成考生答案
function getAnswer() {
    if(questionType == "multiple"){//多选答案生成
        answerStr="";
        for(var i=0;i<4;i++){
            if(count[i]%2==1){
                answerStr+=String.fromCharCode(65+i);
            }
            count[i]=0;//重置临时答案计数数组
        }
    }
    return answerStr;
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

//上传答案
function saveAnswer() {
    //todo 上传服务器
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
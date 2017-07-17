//选项数量
var selectNum = 3;
//题目数量
var questionNum = 100;
//当前题目指针
var questionIndex = 1;
//题目类型
var questionType = "signal";
//问题
var question = "jijkhdiokfv利用CSS进行元素的水平居中，比较简单，行级元素设置其父元素的text-align center，块级元素设置其本身的left 和 right margins为auto即可。本文收集了六种利用css进行元素的垂直居中的方法，每一种适用于不同的情况，在实际的使用过程中选择某一种方法即可";
//具体选项
var answerA = "1234";
var answerB = "2344";
var answerC = "0987";
var answerD = "73468";
//考试时间
var sumtime=7200;
$(document).ready(
    init(),
   setTime(sumtime)
);

//初始化
function init(){
    $('#OK_A,#OK_B,#OK_C,#OK_D').addClass('hide')
}
//计时器
function setTime(sumtime){
    var starttime = new Date();
    var interval = setInterval(function () {
        var newtime = new Date();
        var seconds = (newtime - starttime) / 1000;
        var time = secondstotime(parseInt(sumtime - seconds));
        $('#time').text(time);
    }, 100);//0.1s刷新1次
    setTimeout(function () {
        clearInterval(interval);
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

//上一题
function after() {
    $("#answerA").html(answerB);
}
//下一题
function before() {
    $("#answerA").html(answerC);
}

//设置问题及其类型
function setQuestion() {
    $("#questionType").html(questionType + "(" + questionIndex + "/" + questionNum + ")");
    $("#question").html(questionIndex + "." + question);
}

//设置选项
function setSelects(selectNum) {
    $("#selectC,#selectD").show();
    if (selectNum == 3) {
        $("#selectD").hide();
    }
    if (selectNum == 2) {
        $("#selectC").hide();
        $("#selectD").hide();
    }
}

//被选中效果 questionType全局
function isSelected(e) {
    if (questionType == "signal") {
        switch(e.id){
            case "selectA":
                $('#OK_B,#OK_C,#OK_D').addClass('hide');
                $('#OK_A').removeClass('hide');
                break;
            case "selectB":
                $('#OK_A,#OK_C,#OK_D').addClass('hide');
                $('#OK_B').removeClass('hide');
                break;
            case "selectC":
                $('#OK_B,#OK_A,#OK_D').addClass('hide');
                $('#OK_C').removeClass('hide');
                break;
            case "selectD":
                $('#OK_B,#OK_C,#OK_A').addClass('hide');
                $('#OK_D').removeClass('hide');
                break;
            default:
        }
        // $().addClass('isSelected');
    }
}
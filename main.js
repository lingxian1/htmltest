//选项数量
var selectNum = 3;
//题目数量
var questionNum = 100;
//当前题目指针
var questionIndex = 1;
//题目类型
var questionType = "multiple";
//问题
var question = "jijkhdiokfv利用CSS进行元素的水平居中，比较简单，行级元素设置其父元素的text-align center，块级元素设置其本身的left 和 right margins为auto即可。本文收集了六种利用css进行元素的垂直居中的方法，每一种适用于不同的情况，在实际的使用过程中选择某一种方法即可";
//具体选项
var answerA = "1234";
var answerB = "2344";
var answerC = "0987";
var answerD = "73468";
//考试时间
var sumtime=7200;
//答题计数数组
var count=new Array(0,0,0,0);

$(function(){
    init(),setTime(sumtime)
});

//初始化
function init(){
    setQuestion();
    $('#OK_A,#OK_B,#OK_C,#OK_D').addClass('hide')
    setSelects(4);

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
        alert("timeout");
        //todo 提交
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
    var answerStr="";
    for(var i=0;i<4;i++){
        if(count[i]%2==1){
            answerStr+=String.fromCharCode(65+i);
        }
        count[i]=0;//重置计数数组
    }
    console.log(answerStr);
}

//上一题
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
        console.log(e.id.substr(e.id.length-1,1))
    }else if(questionType == "multiple"){
        $('#OK_'+e.id.substr(e.id.length-1,1)).toggleClass('hide');
        var choose=e.id.substr(e.id.length-1,1);
        count[choose.charCodeAt()-65]++;
    }
}

function exit(){
    var msg = "退出将提交数据且不可再次进入";
    if (confirm(msg)==true){
        //todo 保存
        console.log("ddd");
    }else{
        return false;
    }
}
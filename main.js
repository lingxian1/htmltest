var selectNum=3;
var questionNum=100;
var questionIndex=1;
var questionType="signal";
var question="jijkhdiokfv利用CSS进行元素的水平居中，比较简单，行级元素设置其父元素的text-align center，块级元素设置其本身的left 和 right margins为auto即可。本文收集了六种利用css进行元素的垂直居中的方法，每一种适用于不同的情况，在实际的使用过程中选择某一种方法即可";
var answerA="1234";
var answerB="2344";
var answerC="0987";
var answerD="73468";

$(document).ready(

    setQuestion()
);
//上一题
function after() {
    $("#answerA").html(answerB);
}
//下一题
function before() {
    $("#answerA").html(answerC);
}
function setQuestion() {
    $("#questionType").html(questionType+"("+questionIndex+"/"+questionNum+")");
    $("#question").html(questionIndex+"."+question);
    $("#answerA").html(answerA);
}
function setSelects(selectNum){
    $("#selectC,#selectD").show();
    if(selectNum==3){
        $("#selectD").hide();
    }
    if(selectNum==2){
        $("#selectC").hide();
        $("#selectD").hide();
    }
}

function isSelect(questionType) {
    if(questionType=="signal"){

    }
}
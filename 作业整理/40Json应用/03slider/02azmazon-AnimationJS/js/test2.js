// //找元素的四种方法
// var images1 = document.querySelector('#images a:nth-child(4)');//通过css选择器--document.querySelector()
// var images1 = document.getElementById('images').children[4];//ID--document.getElementById()
// var images1 = document.getElementsByClassName('hiddenImg')[4];//类名--document.getElementsByClassName()
// var images1 = document.getElementsByTagName('a')[4];//标签名--getElementsByTagName()


// console.log(images1);
// images1.style.display="block";//显示图片出来



//获取一组图像
var imagesA = document.getElementById("images").children;
// console.log(imagesA);
//获取一组li文本
var txtList = document.querySelectorAll(".txt-box>li");
console.log(txtList);

//通过行内样式实现换样式
//将第一个元素设置为隐藏
// imagesA[0].style.display='none';
// //显示
// imagesA[4].style.display='block';



//通过更换类名来实现更换样式
//将第一个元素设置为隐藏
// imagesA[0].className="hiddenImg";
// //显示
// imagesA[4].className="displayImg";


//利用计时器间隔1S,显示一张图像，其余图像隐藏
var currentNo = 0;//当前图像为第0张

function changeImg() {
    //获取图片/文本总数量
    var nodeLength = txtList.length;
    //排他原理，先去掉同类
    for (var i = 0; i <nodeLength; i++) {
        //同类图片
        imagesA[i].className = "hiddenImg";
        txtList[i].className = "txtItem normalColor";
        // console.log(imagesA[i]);
    }

    //或者
    // for (const item of imagesA) {
    //     item.className = "hiddenImg";
    // }

    // 再突出自己
    imagesA[currentNo].className = "displayImg";
    txtList[currentNo].className ="txtItem heighlightColor";
    //换个元素，为下一次计时器调用做准备
    if (currentNo < 7) { currentNo++; }
    else { currentNo = 0; }
}





// //鼠标移到图片上时停止，移出鼠标时开始轮播
// //获取控制按钮
// var imagesB = document.querySelector('#images');
// console.log(imagesB);
// //定义启动定时器函数，函数功能为启动定时器
// function startChange() {
//     timer=window.setInterval(changeImg,1000);
// }
// //定义停止定时器函数，函数功能为停止定时器
// function stopChange() {
//     timer=window.clearInterval(timer);
// }

// //为按钮添加鼠标移入移出事件
// imagesB.addEventListener('mouseover', stopChange);//移入
// imagesB.addEventListener('mouseout', startChange);//移出








//或者
// var timer=window.setInterval(changeImg,1000);

//鼠标移出后移出定时器
function stopChange() {
    window.clearInterval(timer);
}
//鼠标移入后重设定时器
function startChange() {
    timer = window.setInterval(changeImg, 1000);
}
//获取DIV以注册移入移出事件
var sliderDiv = document.querySelector('.slider');
// console.log(imagesDiv);


// //为按钮添加鼠标移入移出事件
sliderDiv.addEventListener('mouseover', function(){window.clearInterval(timer);});//移入
sliderDiv.addEventListener('mouseout', startChange);//移出


//箭头函数
sliderDiv.addEventListener('mouseout',()=>{clearInterval(timer);} );



var timer = window.setInterval(changeImg, 1000);//设置间隔器
//为所有的li注册鼠标移入移出事件,移入之后,当前li高亮,跳到对应的图片
for(var i=0;i<txtList.length;i++){
    txtList[i].addEventListener("mouseover",gotoImg);
    //添加自定义属性no,记录当前li的编号
    txtList[i].no=i;
    // console.log(txtList[i].no);
}
function gotoImg(){
    // console.log(txtList[i]);
    //获得当前显示图像的编号/文本编号,this是当前发生的本体编号
    console.log(this.no);
    currentNo=this.no;
    changeImg();
}

var btnLeft=document.querySelector('.leftButton');
var btnRight=document.querySelector('.rightButton');
// console.log(btnLeft);
// console.log(btnRight);
btnLeft.addEventListener('click',leftImg);
btnRight.addEventListener('click',rightImg);

function leftImg(){
    if(currentNo>0){currentNo--;}
    else{
        currentNo=6;
    }

}
function rightImg(){
    if(currentNo<7){currentNo++;}
    else{
        currentNo=7;
    }
    console.log(currentNo);
    changeImg();
}
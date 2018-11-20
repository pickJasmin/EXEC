

// var img4=document.queryCommandState('#images a:nth-child(4)');
// var img4=document.getElementById('images').children[4];
// var img4=document.getElementsByClassName('ihddenImg')[3];
// var img4=document.getElementsByName('a')[4];
// img4[0].style.display="block";

// 获取一组带图像的超链接
var imagesA=document.getElementById('images').children;

// imagesA[0].style.display="none";
// imagesA[4].style.display="block";

// imagesA[0].className="hiddenImg";
// imagesA[4].className="displayImg";
//获取一组li文本
var txtboxA=document.querySelectorAll('.txt-box>li')

//初始化当前显示的图片/文本编号
var currentNo=0;
function changeImg(){
    //将图片清除  让图片在if下可以重新循环
    //  for (const item of imagesA) {
    //      item.className="hiddenImg";

    //      console.log(item);
    // }
    var nodeLength=txtboxA.length
        for(var i=0;i<nodeLength;i++){
            imagesA[i].className="hiddenImg";
            txtboxA[i].className="txtItem normalColor"
       }

    imagesA[currentNo].className="displayImg";
    txtboxA[currentNo].className="txtItem heighlightColor";
    if(currentNo<7){currentNo++;}
    else{currentNo=0;}
    //让图片不断循环
}

function stopChange()
{
    window.clearInterval(timer);
}
function startChange()
{
    timer=window.setInterval(changeImg,1000);
}
var sliderdiv=document.querySelector('.slider');
// console.log(imagesdiv)
sliderdiv.addEventListener('mouseover',stopChange);
sliderdiv.addEventListener('mouseout',startChange);

var timer=window.setInterval(changeImg,1000);


for(var i=0;i<txtboxA.length;i++){
    txtboxA[i].addEventListener('mouseover',gotoImg)
    txtboxA[i].no=i;
    console.log(txtboxA.no);
}
function gotoImg(){
    console.log(this.no);
    currentNo=this.no;
    changeImg();
}


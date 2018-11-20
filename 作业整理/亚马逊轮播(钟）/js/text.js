var timer;

// function startTimer(speed){
//    timer=window.setInterval(changeNum,speed);
// }

timer=window.setInterval(changeNum,1000);

// startTimer(100);

var images1=document.querySelector('#images');
var images2=document.getElementById('images');
console.log(images1);
console.log(images2);
// console.log(images2.children[]);

var currentNo=1;
//var flag=true;s
function changeNum(){
    if(currentNo<8) currentNo++;
    else currentNo=1;
    //h20bj.textContent=currentNo;//(currentNo)时间
    //h20bj.innerHTML='<img src="images/0'+currentNo+'.jpg" alt=""></img>';//将JS元素放到HTML文本框内
  //console.log(currentNo);

// if(flag)
// {
//     if(currentNo<9) currentNo++;
//     else flag=false;
// }
// else
// {
//     if(currentNo>0) currentNo--;
//     else flag=true;
// }
}
//console.log(timer);

var btnObj=document.getElementById('btnOjb')
//console.log(btnObj);
function startChange()
{
     startTimer(500);
     btnObj.textContent="停止";
}
function stopChange()
{
     window.clearInterval(timer);
     btnObj.textContent="启动";
}
btnObj.addEventListener('mouseover',stopChange);
btnObj.addEventListener('mouseout',startChange);

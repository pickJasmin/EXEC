var timer;//设计定时器b变量

//启动定时器函数定义--若在启动定时器时有很多附加操作可以一并写入该函数
//若启动定时器动作单一，可以直接调用Window定时器
function startTimer(Time) {
    timer = window.setInterval(changeNum, Time);
}

//调用定时器，使程序一开始执行变化
startTimer(100);


//获取div#div元素
var images1 = document.querySelector('#images');
var images2 = document.getElementById('images');
console.log(images1);
console.log(images2);
console.log(images2.children[3]);


//设置当前变化的号码变量及初值
var currentNo = 0;


// var flag = true;
//定义变化数字函数，0--9，到达9后变到0
function changeNum() {
    if (currentNo <= 8) currentNo++;
    else currentNo = 1;

    // h2Obj.innerHTML='<img src="images/0'+currentNo+'.jpg" alt=""></img>'
    // h2Obj.textContent = currentNo;
    // if (flag) {
    //     if (currentNo <= 9) currentNo++;
    //     else flag = false;
    // }
    // else {
    //     if (currentNo > 0) currentNo--;
    //     else flag = true;
    // }
}
// console.log(timer);




// console.log(btnObj);
// btnObj.addEventListener('click', ChangeNum);


// function ChangeNum() {
//     if (flag) {
//         window.clearInterval(timer);
//         btnObj.textContent = "启动";
//         flag = false;
//     }
//     else {
//         // timer=window.setInterval(changeNum, 1000);
//         // startTimer(500);
//         // btnObj.textContent = "停止";
//         startChange()
//         flag = true;
//     }
// }

//获取控制按钮
var btnObj = document.getElementById('btnObj');


//定义启动定时器函数，函数功能为启动定时器的同时改变按钮显示文本
function startChange() {
    startTimer(500);
    btnObj.textContent = "停止";
}
//定义停止定时器函数，函数功能为停止定时器的同时改变按钮显示文本
function stopChange() {
    window.clearInterval(timer);
    btnObj.textContent = "启动";
}

//为按钮添加鼠标移入移出事件
btnObj.addEventListener('mouseover', stopChange);//移入
btnObj.addEventListener('mouseout', startChange);//移出

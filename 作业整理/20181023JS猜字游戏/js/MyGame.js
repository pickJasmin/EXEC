var randomNumber = Math.floor(Math.random() * 101);//初值设置随机数
console.log(randomNumber);// 向控制台输出

var guessFnield = document.querySelector('.guessField');//把他的属性值抓出来
console.log(guessField);
// console.log(guessField.value);
var guesses = document.querySelector('.guesses');
console.log(guesses);
// console.log(guesses.value);
var lastResult = document.querySelector('.lastResult');
// console.log(lastResult);
// console.log(lastResult.value);
var lowOrHi = document.querySelector('.lowOrHi');
var guessSubmit = document.querySelector('.guessSubmit');


var guessCount = 1;//设置猜测次数为1
var resetButton;//设置重置按钮变量
guessFnield.focus();//使得猜数文本区获得焦点

// function checkGuess()//声明一个函数
// {
//     console.log('我是函数体');//输出这个函数
// }
// checkGuess();//调用这个函数
// function checkGuess(a,b){
//     console.log('我是函数体');
//     console.log(a+b);
// }
// checkGuess(6,10);
// checkGuess('sdfd','dffsf');
// checkGuess(6,'10');

function checkGuess()//声明一个函数
{
    // document.write('我是结论');
    var userGuess = Number(guessFnield.value);//获取用户输入的数据，并将其转换为数字
    console.log(typeof userGuess);
    console.log(userGuess);
    // guesses.textContent+=userGuess+" ";//将用户输入的猜数接入猜数历史中，并用空格隔开
    // guesses.style.backgroundColor="red";//添加背景颜色



    if (guessCount === 1) {
        guesses.textContent = '上次猜的数：';
    }
    guesses.textContent += userGuess + ' ';

    if (userGuess === randomNumber) {
        lastResult.textContent = '恭喜你！猜对了！';
        lastResult.style.backgroundColor = 'blue';
        lowOrHi.textContent = '';
        setGameOver();
    }
    else if (guessCount === 10) {
        lastResult.textContent = '!!!GAME OVER!!!';
        lowOrHi.textContent = '';
        setGameOver();
    }
    else {
        lastResult.textContent = '你猜错了！';
        lastResult.style.backgroundColor = 'red';
        if (userGuess < randomNumber) {
            //小了提示
            lowOrHi.textContent = '刚才你猜低了！';
        }
        else if (userGuess > randomNumber) {
            //大了提示
            lowOrHi.textContent = '刚才你猜高了！';
        }
    }
    guessCount++;
    guessField.value = '';
    guessField.focus();
}
// checkGuess();//调用这个函数
guessSubmit.addEventListener('click', checkGuess);//增加事件侦听器
function setGameOver() {
    //- 阻止玩家继续猜测
    //- 显示控件允许玩家重新开始游戏。
    // var resetButtonP=document.querySelector("div.resultParas p:last-child");
    // console.log(resetButtonP);
    // resetButtonP.style.display="block";
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement('button');
    resetButton.textContent = '开始新游戏';
    document.body.appendChild(resetButton);
    resetButton.addEventListener('click', resetGame);
}




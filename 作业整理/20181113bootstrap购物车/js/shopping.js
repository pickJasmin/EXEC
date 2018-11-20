//抓取元素
//加号
var add = document.getElementsByName('increase');
//减号
var sub = document.getElementsByName('decrease');
//购物车
var shopping = document.getElementsByName('addToCart');

//注册事件
//加号
for (var i = 0; i < add.length; i++) {
    add[i].addEventListener('click', increaseValue);
}
//减号
for (var i = 0; i < sub.length; i++) {
    sub[i].addEventListener('click', decreaseValue);
}
//购物车
for (var i = 0; i < shopping.length; i++) {
    shopping[i].addEventListener('click', addToCart);
}


// var btnList=document.querySelectorAll('.btn-group .btn');
var totalQty = document.getElementsByName('totalQty')[0];
function increaseValue(e) {
    var qtyObj = e.target.nextElementSibling;
    var qty = parseInt(qtyObj.innerText);
    qty++;
    qtyObj.innerText = qty;
    console.log(qty);
}
function decreaseValue(e) {
    var qtyObj = e.target.previousElementSibling;
    var qty = parseInt(qtyObj.innerText);
    if (qty > 1) qty--;
    else qty = 0;
    qtyObj.innerText = qty;
    console.log(qty);
}

function addToCart(e) {
    var qtyObj = e.target.previousElementSibling.previousElementSibling;
    var qty = parseInt(qtyObj.innerText);
    var total = parseInt(totalQty.innerText);
    total += qty;
    totalQty.innerText = total;
}
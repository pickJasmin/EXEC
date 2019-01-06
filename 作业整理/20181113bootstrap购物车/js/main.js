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


// 获取增加按并添加单击事件
var increaseBtns = document.querySelectorAll('[data-operator="increase"]');
for (const i in increaseBtns) {
    increaseBtns[i].onclick = increaseValue;
}

//增加按钮触发事件函数
function increaseValue(e) {
    var qtyObj = e.target.nextElementSibling;
    var qty = parseInt(qtyObj.innerText);
    qty++;
    qtyObj.innerText = qty;
    console.log(qty);
}


// 获取减少按钮并添加单击事件
var decreaseBtns = document.querySelectorAll('[data-operator="decrease"]');
for (const i in decreaseBtns) {
    decreaseBtns[i].onclick = decreaseValue;
}

// 减少按钮事件触发函数
function decreaseValue(e) {
    var qtyObj = e.target.previousElementSibling;
    var qty = parseInt(qtyObj.innerText);
    if (qty > 1) qty--;
    else qty = 0;
    qtyObj.innerText = qty;
    console.log(qty);
}


//获取加入购物车按钮并添加单击事件
var addToCartBtns = document.querySelectorAll('[data-operator="addToCart"]');
for (const i in addToCartBtns) {
    addToCartBtns[i].onclick = addToCart;
}

//加入购物按钮事件触发函数
function addToCart(e) {

// 获取当前单击商品的数量
let qty = parseInt((e.target.parentNode).querySelector('[data-name="qty"]').textContent);
//获取当前点击商品的id
let id = e.target.getAttribute("data-id");
//从数据列表中获取商品信息并存入product
// let productList = productsJson.productList;
// let product;
// for (const i in productList) {
//     if (id == productList[i].id) {
//         product = productList[i]; break;
//     }
// }
let order = new Order(product, qty,true);

//创建购物车对象实例
let cart_index = new ShoppingCart();
//将选中商品写入购物车
cart_index.addToCart(order);
displayData();

// 更新页面商品总数量
displayData();

    // 获取当前单击商品的数量
    // var qtyObj=  e.target.previousElementSibling.previousElementSibling;
    // var qty=parseInt(qtyObj.innerText);
    // var total=parseInt(totalQty.innerText);
    // total+=qty;
    // totalQty.innerText=total;  

}

function displayData() {
    // 获取商品总数量节点
    let totalQty = document.querySelector('[data-name="totalQty"]');

    //创建购物车对象实例
    let cart_index = new ShoppingCart();

    // 更新页面商品总数量
    totalQty.textContent = cart_index.getDataFromLocalStorage().totalQty;
}


function init() {
    displayData();
}

init();
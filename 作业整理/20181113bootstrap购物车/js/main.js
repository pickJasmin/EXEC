// // 创建变量用于存储商品数据
// var productsList;
// // 1.0创建请求对象
// var request = new XMLHttpRequest();
// // 2.0设置请求对象
// // 2.1用open() 方法来指定从网络请求资源的 HTTP request method , 以及URL。
// request.open('GET', 'productsList.json');
// // 2.2设置响应类型 （返回什么类型的数据）
// request.responseType = 'json';


// request.onload = function () {
//     if (request.status === 200) {
//         productsList = request.response;

//         // 调用初始化函数
//         displayProducts();
//     } else {
//         //  如果获取文件失败，则向控制台提供错误信息
//         console.log('网络请求carts.json失败，响应吗' + request.status + ': ' + request.statusText)
//     }
// };
// //发送请求
// request.send();




// 使用json变量存储数据(后续可以从服务器端获得)
var productsJson = {
    "productList": [{ "id": "01", "title": "30片巨补水 秋冬新款面膜", "imgSrc": "01.jpg", "price": 99.50 },
    { "id": "02", "title": "新西兰进口白金版婴幼儿奶粉", "imgSrc": "02.jpg", "price": 80.50 },
    { "id": "03", "title": "卡耐基经典 人性的弱点", "imgSrc": "03.jpg", "price": 50.00 },
    { "id": "04", "title": "海淘耳机", "imgSrc": "04.jpg", "price": 33.50 }
    ]
}




// // var btnList=document.querySelectorAll('.btn-group .btn');
// var totalQty = document.getElementsByName('totalQty')[0];




// 获取增加按并添加单击事件
var add = document.getElementsByName('increase');
for (var i = 0; i < add.length; i++) {
    add[i].addEventListener('click', increaseValue);
}
//增加按钮触发事件函数
function increaseValue(e) {
    // DOM nextElementSibling属性，返回元素的下一个兄弟元素
    var qtyObj = e.target.nextElementSibling;
    // 利用JavaScript parseInt()函数返回整数
    var qty = parseInt(qtyObj.textContent);
    qty++;
    qtyObj.textContent = qty;
    console.log(qty);
}


// 获取减少按钮并添加单击事件
var sub = document.getElementsByName('decrease');
for (var i = 0; i < sub.length; i++) {
    sub[i].addEventListener('click', decreaseValue);
}
// 减少按钮事件触发函数
function decreaseValue(e) {
    // DOM nextElementSibling属性，返回元素的下一个兄弟元素
    var qtyObj = e.target.previousElementSibling;
    // 利用JavaScript parseInt()函数返回整数
    var qty = parseInt(qtyObj.textContent);
    if (qty > 1) qty--;
    else qty = 0;
    // 更改商品数量
    qtyObj.textContent = qty;
    console.log(qty);
}




//获取加入购物车按钮并添加单击事件
var shopping = document.getElementsByName('addToCart');
for (var i = 0; i < shopping.length; i++) {
    shopping[i].addEventListener('click', addToCart);
}






//加入购物按钮事件触发函数
function addToCart(e) {


    //获取商品数量节点（DOM previousElementSibling属性，返回元素的前一个兄弟元素）
    var qtyObj = e.target.previousElementSibling.previousElementSibling;
    // 商品数量（利用JavaScript parseInt()函数返回整数）
    var qty = parseInt(qtyObj.innerText);
    // var total = parseInt(totalQty.innerText);
    // total += qty;
    // totalQty.innerText = total;

    //获取当前点击商品的id
    let id = e.target.getAttribute("data-id");
    //从数据列表中获取商品信息并存入product
    let productList = productsJson.productList;
    let product;
    for (const i in productList) {
        if (id == productList[i].id) {
            product = productList[i]; break;
        }
    }
    // 实例化Order并存入变量order中
    let order = new Order(product, qty, true);

    //创建购物车对象实例
    let cart_index = new ShoppingCart();
    console.log(cart_index);
    //将选中商品写入购物车
    cart_index.addToCart(order);
    displayData();

    // 更新页面商品总数量
    displayData();
}

// 显示加入购物车的商品的总数量
function displayData() {
    // 获取商品总数量节点
    var totalQty = document.getElementsByName('totalQty')[0];

    //创建购物车对象实例
    let cart_index = new ShoppingCart();

    // 更新页面商品总数量
    totalQty.textContent = cart_index.getDataFromLocalStorage().totalQty;
}

function init() {
    displayData();
}

init();
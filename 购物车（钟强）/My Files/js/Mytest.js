
//引用ShoppingCart.js的方法/函数
var cart = new ShoppingCart();
//抓订单列表的父亲
var cartList = document.getElementById('cartList')

 //03--全选按钮抓取
 var selectAll = document.querySelectorAll("[data-operator='selectAll']");
 console.log(selectAll);
//下通栏的--多少商品标签抓取     与checkedapproach函数关联
 var selectedQty = document.querySelector('[data-name="selectedQty"]');
  console.log(selectedQty);
//下通栏的--总价标签抓取         与checkedapproach函数关联
  var selectedAmount = document.querySelector('[data-name="selectedAmount"]');
  console.log(selectedAmount);

  var checkItem = document.querySelectorAll('[data-operator="checkItem"]');
  console.log(checkItem);

function databaseaccess() {
  var cartData = cart.getDataFromLocalStorage();
  // console.log(cartData);
  var orderList = cartData.orderList;
  // console.log(orderList);

  for (let i = 0; i < orderList.length; i++) {
    var order = orderList[i];
    // console.log(order);
    //儿子
    var a = document.querySelectorAll('#orderExample')[0];
    // console.log(a);

    // console.log(cartList);
    //克隆-儿子
    var cln = a.cloneNode(true);

    cartList.appendChild(cln);
    // document.getElementById('cartList').appendChild(cln);
    cln.id = order.ID;

    var imgNode = cln.querySelector('[data-name="imgSrc"]');
    console.log(imgNode);
    imgNode.src = '../' + 'My Files/' + 'images/' + order.imgSrc;

    var selectStatus = cln.querySelector('[data-operator="checkItem"]');
    // console.log(selectStatus);
      selectStatus.checked = order.selectStatus;
   
   

    var title = cln.querySelector('[data-name="title"]');
    console.log(title);
    title.innerHTML = order.title;

    var qty = cln.querySelector('[data-name="qty"]');
    console.log(qty);
    qty.innerHTML = order.qty;

    var price = cln.querySelector('[data-name="price"]');
    console.log(price);
    price.textContent = order.price;

    var subPrice = cln.querySelector('[data-name="subPrice"]');
    console.log(subPrice);
    subPrice.textContent = (order.qty * order.price).toFixed(2);

    cln.classList.remove('d-none');
    console.log(cln);

    cln.querySelector('[data-operator="deleteItem"]').setAttribute('data-id', order.ID);
    cln.querySelector('[data-operator="checkItem"]').setAttribute('data-id', order.ID)
  }
}

function checkedapproach() {
  //调用函数方法将---总商品数量---显示
  selectedQty.innerHTML = cart.getSelectedQty()
  ////调用函数方法将-总价--显示
  selectedAmount.innerHTML = (cart.getSelectedAmount()).toFixed(2);
}
//注册事件
function regEvent() {
  //01--清空购物车
  //抓取   清空清空购物车的HTML
  var clearAll = document.querySelector('[data-operator="clearAll"]');
  console.log(clearAll);
  //注册单击事件
  clearAll.onclick = clearAllEventFun;

  //02--删除
  var deleteItem = document.querySelectorAll("[data-operator='deleteItem']");
  // console.log(deleteItem);
  //  //注册单击事件
  for (let i = 0; i < deleteItem.length; i++) {
    deleteItem[i].onclick = deleteItemEventFun;
  }
  //03--全选
  for (let i=0;i<selectAll.length;i++) {
    selectAll[i].onclick=controlEventFun;
  }
  //04--删除选中的商品
  var deleteSelected = document.querySelector("[data-operator='deleteSelected']");
  console.log(deleteSelected);
    deleteSelected.onclick=electdeleteEventFun;
   //复选框
   var checkItem = document.querySelectorAll('[data-operator="checkItem"]');
    console.log(checkItem);
    for (let i=0;i<checkItem.length;i++) {
      checkItem[i].onclick=selectionStateEventFun;
    }
}
//01--清空购物车函数
function clearAllEventFun() {
  cart.clearCart();
  location.reload();
  checkedapproach();
}
//02--删除订单函数
function deleteItemEventFun(e) {
  var sst = e.target;
  console.log(sst);
  var newid = sst.getAttribute('data-id');
  console.log(newid);
  cart.deleteItem(newid);
  var orderNode = document.getElementById(newid);
  cartList.removeChild(orderNode);
  checkedapproach();
}
//复选框事件
function selectionStateEventFun(e){
  // var sst = e.target;
  // console.log(sst);
  var checkItem = document.querySelectorAll('[data-operator="checkItem"]');
  console.log(checkItem);
    for (let i = 0; i < checkItem.length; i++) {
       if (checkItem[i].checked===true) {
        selectAll[i].checked=true;
       }
       else if(checkItem[i].checked===false){
        selectAll[i].checked=false;
       }
      
    }
}
//----------------------全选函数
function controlEventFun(e){
  var selectStatus = document.querySelectorAll('[data-operator="checkItem"]');
  // console.log(selectStatus);
}
//删除选中商品单击事件
function electdeleteEventFun(e){
  var sst = e.target;
  console.log(sst);
  var checkItem = document.querySelectorAll('[data-operator="checkItem"]');
  console.log(checkItem);
  for (let i = 0; i < checkItem.length; i++) {
    if (checkItem[i].checked==true) {
      var newid = checkItem[i].getAttribute('data-id');
      cart.deleteItem(newid);
      var orderNode = document.getElementById(newid);
      cartList.removeChild(orderNode);
      checkedapproach();
    }
    
  }
 
}
// 方法或函数的实现
function init() {
  databaseaccess();
  checkedapproach();
  regEvent();
}
init();
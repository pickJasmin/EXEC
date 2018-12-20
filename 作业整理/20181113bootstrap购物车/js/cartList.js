// 购物车实例化
var cart = new ShoppingCart();
// 获取购物车根节点
var cartRoot = document.querySelector('#cartRoot');
//找到订单列表的父元素
var cartList = document.querySelector('#cartContent');


const dataNameJson = {
    "price": "[data-name='price']",
    "qty": "[data-name='qty']",
    "imgSrc": '[data-name="imgSrc"]',
    "subPrice": '[data-name="subPrice"]',
    "selectedQty": '[data-name="selectedQty"]',
    "selectedAmount": '[data-name="selectedAmount"]',
    "units": '[data-name="units"]'
};

const operatorNameJson = {
    "checkItem": "[data-operator='checkItem']",
    "increase": "[data-operator='increase']",
    "decrease": "[data-operator='decrease']",
    "deleteItem": "[data-operator='deleteItem']"

};
// 全局操作
const operatorGlobal = {
    "clearAll": "[data-operator='clearAll']",
    "selectAll": "[data-operator='selectAll']"
}



//显示购物车所有的订单列表
function displayOrderList() {
    //获取购物车的数据
    let cartData = cart.getDataFromLocalStorage();
    //获取购物车数据的订单列表
    let orderList = cartData.orderList;

    //找到订单列表的父元素
    let cartList = document.querySelector('#cartContent');
    //找到样本节点
    let exampleNode = document.querySelector('#orderExample');


    //遍历订单列表
    for (const i in orderList) {

        //当前订单数据
        let order = orderList[i];
        // 克隆样本节点形成当前订单节点
        var node = exampleNode.cloneNode(true);
        //挂接到父元素
        cartList.appendChild(node);


        //设置数据
        //节点id
        node.id = order.id;


        //找图像节点
        let imgNode = node.querySelector('[data-name="imgSrc"]');
        //图像地址
        imgNode.src = 'images/' + order.imgSrc;

        //设选中状态
        //找选中节点
        let selectNode = node.querySelector('[data-operator="checkItem"]')
        selectNode.checked = order.selectStatus;

        //找到文本节点
        let titleNode = node.querySelector('[data-name="title"]');
        titleNode.innerHTML = order.title;

        //设置订单单价
        let priceNode = node.querySelector('[data-name="price"]');
        priceNode.textContent = order.price;

        //设置数量
        let qtyNode = node.querySelector('[data-name="qty"]');
        qtyNode.textContent = (order.qty);
        //或者
        // qtyNode.innerHTML= order.qty;


        //设置小计
        let subPriceNode = node.querySelector('[data-name="subPrice"]');
        subPriceNode.textContent = (order.price * order.qty).toFixed(2);

        // 移除新节点到隐藏属性 d-none
        node.classList.remove('d-none');

        //给删除按钮设计一个data-id属性
        element = node.querySelector("[data-operator='deleteItem']");
        element.setAttribute('data-id', order.id);





        // 为加号按钮注册单击事件
        let increaseBtns = document.querySelectorAll('[data-operator="increase"]');
        // console.log(increaseBtns);
        for (const key in increaseBtns) {
            increaseBtns[key].onclick = changeQtyEventFun;
        }

        // 为减号按钮注册单击事件
        let decreaseBtns = document.querySelectorAll('[data-operator="decrease"]');
        // console.log(decreaseBtns);
        for (const key in decreaseBtns) {
            decreaseBtns[key].onclick = changeQtyEventFun;
        }

        //获取选择框设置转态
        let checkboxNew = node.querySelector('[data-operator="checkItem"]');
        //   console.log(checkboxNew);
        checkboxNew.checked = order.selectStatus;



    }
}

//显示商品样本总数
//显示已选中商品到总件数和总价格
function displaySelectedTotal() {


    let totalNode = cartRoot.querySelector("[data-name='units']");
    totalNode.textContent = cart.getTotalUnits();


    //获取总数相关节点
    let selectedQtyNode = document.querySelector('[data-name="selectedQty"]');
    selectedQtyNode.textContent = cart.getSelectedQty();



    //获取总价格
    let selectedAmountNode = document.querySelector('[data-name="selectedAmount"]');
    selectedAmountNode.textContent = (cart.getSelectedAmount()).toFixed(2);

}



// 为相关节点注册事件
function regEvent() {
    // 获取清空购物车节点
    let element = cartRoot.querySelector("[data-operator='clearAll']");
    console.log(element);
    // 注册单击事件触发函数
    element.onclick = clearAllEventFun;


    //获取删除节点
    element = cartRoot.querySelectorAll("[data-operator='deleteItem']");
    console.log(element);
    for (const key in element) {
        //注册订单删除按钮单击事件

        element[key].onclick = deleteItemEventFun;
    }


}



// 清空事件触发函数
function clearAllEventFun() {
    cart.clearCart();
    // 获取订单根节点
    // let cartList = document.querySelector('#cartContent');
    //保留样本节点
    let Example = (document.querySelector('#orderExample')).cloneNode(true);
    //清除订单根节点的所有元素
    cartList.innerHTML = '';
    //将样本节点挂接回列表根节点
    cartList.appendChild(Example);
    // 更新商品总数据
    displaySelectedTotal();
}


//删除事件触发函数
function deleteItemEventFun(e) {
    //获取当前被单击的删除按钮
    let button = e.target;
    //
    let id = button.getAttribute('data-id');
    //删除购物车数据
    cart.deleteItem(id);


    //移除节点
    let orderNode = document.getElementById(id);
    // let currenItemNode = cartListNode.querySelector('[id="' + id + '"]');
    cartList.removeChild(orderNode);

    //设置总数
    displaySelectedTotal();
}
















// 初始化函数
function init() {
    // 显示订单列表
    displayOrderList();
    // 显示总数据
    displaySelectedTotal();
    // 为所有操作节点注册事件
    regEvent();
}

//调用初始化函数
init();
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






    }
}

//显示商品样本总数
//显示已选中商品到总件数和总价格
function displaySelectedTotal() {


    let totalNode = cartRoot.querySelector("[data-name='units']");
    totalNode.textContent = cart.getTotalUnits();
    // totalNode.textContent = cart.units;


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
    // console.log(element);
    // 注册单击事件触发函数
    element.onclick = clearAllEventFun;


    //获取删除节点
    element = cartRoot.querySelectorAll("[data-operator='deleteItem']");
    // console.log(element);
    for (const key in element) {
        //注册订单删除按钮单击事件
        element[key].onclick = deleteItemEventFun;
    }



    // 为加号按钮注册单击事件
    elment = document.querySelectorAll(operatorNameJson.increase);
    console.log(elment);
    for (const i in elment) {
        elment[i].onclick = changeQtyEventFun;
    }

    // 为减号按钮注册单击事件
    elment = document.querySelectorAll(operatorNameJson.decrease);
    console.log(elment);
    for (const i in elment) {
        elment[i].onclick = changeQtyEventFun;
    }


    // 获取所有订单复选框节点
    element = document.querySelectorAll(operatorNameJson.checkItem);
    // 为每个订单复选框节点注册单机事件,事件触发函数
    for (const i in element) {
        element[i].onclick = checkItemEventFun;
    }

    // 为全选框注册单击事件
    let checkboxSelectAlls = document.querySelectorAll('[ data-operator="selectAll"]');
    for (const key in checkboxSelectAlls) {
        //onchange 事件也可用于单选框与复选框改变后触发的事件。
        checkboxSelectAlls[key].onchange = checkAllEventFun;
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




// 增加减少按钮触发函数
function changeQtyEventFun(e) {

    //获取获取当前订单节点
    let node = this.parentNode.parentNode.parentNode;
    //获取购物车订单列表根元素
    let cartListNode = document.querySelector('#cartContent');
    // 获取当前订单数量节点
    let qtyNode = node.querySelector(dataNameJson.qty);
    //let qtyNode = cartListNode.querySelector('[data-name="qty"]');

    // 获取当前订单数量
    let qty = parseInt(qtyNode.textContent);

    // 获取当前操作是+号还是-号
    let AddOrMinus = this.textContent;

    // 获取当前订单的id
    let id = node.id;


    // 获取当前订单的小计
    let subPriceNode = node.querySelector('[data-name="subPrice"]');
    // 获取当前订单的单价
    let PriceNode = node.querySelector(dataNameJson.price);
    // 订单数量加或减
    if (AddOrMinus == '+') {
        qty++;
    } else {
        qty--;
        if (qty <= 0) {
            qty = 1;
            return;
        }
    }
    // 修改页面订单数量
    qtyNode.textContent = qty;
    // 调用指定某个订单数量加1/减1的方法
    cart.changeQty(id, AddOrMinus);
    // 修改小计
    subPriceNode.textContent = (qtyNode.textContent * PriceNode.textContent).toFixed(2);

    // 修改商品的总数和总价格
    displaySelectedTotal();
}

// 订单项复选框按钮触发函数
function checkItemEventFun() {
    // 获取“全选复选框”节点
    let cheselectAlls = document.querySelectorAll('[data-operator="selectAll"]');

    // 获取当前订单节点
    let node = this.parentNode.parentNode;

    // 获取当前订单id
    let id = node.id;
    // 获取当前订单的选择状态
    let selectStatus = this.checked;

    // 调用“设置购物订单项选择状态”方法
    cart.setItemSelectedStatus(id,selectStatus);

    // 设置全选状态
    if (selectStatus == false) {
        for (const key in cheselectAlls) {
            cheselectAlls[key].checked = false;
        }
    } else {
        // 当选中商品的总数量=购物车数据的总件数时，“全选”复选框状态为选中
        if (cart.getSelectedQty() == cart.getDataFromLocalStorage().totalQty) {
            for (const key in cheselectAlls) {
                cheselectAlls[key].checked = true;
            }
        }
    }
    // 修改商品的总数和总价格
    displaySelectedTotal();
}



// 订单项全选复选框按钮触发函数
function checkAllEventFun(e) {
    let currentNode = e.target;
    // 获取“全选复选框”节点
    let checkboxSelectAlls = document.querySelectorAll('[ data-operator="selectAll"]');
    for (const i in checkboxSelectAlls) {
        checkboxSelectAlls[i].checked = currentNode.checked;
    }
    let cart = new ShoppingCart();
    cartData = cart.getDataFromLocalStorage();

    // 获取“单选复选框”节点
    let checkboxItems = document.querySelectorAll('[ data-operator="checkItem"]');
    for (let i = 1; i < checkboxItems.length; i++) {
        let id = checkboxItems[i].getAttribute('data-id');
        checkboxItems[i].checked = currentNode.checked;
        // 调用“设置购物订单项选择状态”方法
        cart.setItemSelectedStatus(id, currentNode.checked);
    }

    // 修改商品的总数和总价格
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
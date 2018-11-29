var cart = new ShoppingCart();







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
    }
}

//显示商品样本总数
//显示已选中商品到总件数和总价格
function displaySelectedTotal() {



    //获取总数相关节点
    let selectedQtyNode = document.querySelector('[data-name="selectedQty"]');
    selectedQtyNode.textContent = cart.getSelectedQty();



    //获取总价格
    let selectedAmountNode = document.querySelector('[data-name="selectedAmount"]');
    selectedAmountNode.textContent = (cart.getSelectedAmount()).toFixed(2);

}


//为相关节点注册事件
function regEvent(){
    //获取购物车节点

}

//事件触发函数

//初始化事件
function into() {
    displaySelectedTotal();
    displayOrderList();
}
into();
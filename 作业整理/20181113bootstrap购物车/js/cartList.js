var cart = new ShoppingCart();
console.log(cart);


//显示购物车所有的订单列表
function displayOrderList() {
    //获取购物车的数据
    let cartData = cart.getDataFromLocalStorage();
    console.log(cartData);
    //获取购物车数据的订单列表
    let orderList = cartData.orderList;
    // console.log(orderList);

    //找到订单列表的父元素
    let cartList = document.querySelector('#cartContent');
    //找到样本节点
    let exampleNode = document.querySelector('#orderExample');



    //遍历订单列表
    for (const i in orderList) {
        //当前订单数据
        let order = orderList[i];
        // console.log(order);
        // 克隆样本节点形成当前订单节点
        node = exampleNode.cloneNode(true);
        //挂接到父元素
        cartList.appendChild(node);


        //设置数据
        //节点id
        node.id = order.id;

        //图像地址
        //找图像节点
        let imgNode = document.querySelectorAll('[data-name="imgSrc"]')[0];
        imgNode.src = 'images/' + order.imgSrc;
        console.log(imgNode);
        //移除d-none属性
        node.classList.remove('d-none');
        //设选中状态
        //找选中节点
        let selectNode = node.querySelector('[data-operator="checkItem"]')
        selectNode.checked = order.selectStatus;
        // console.log(selectNode);
        // console.log(node);

        //找到文本节点
        let titleNode = document.querySelectorAll('[data-name="title"]')[0].textContent;
        titleNode = order.title;
        console.log(titleNode);

        //找到单价节点
        let priceNode = document.querySelectorAll('[data-name="price"]');
        priceNode = order.price;
        console.log(priceNode);

        //找到数量节点
        let qtyNode = document.querySelectorAll('[data-name="qty"]');
        qtyNode = order.qty;
        console.log(qtyNode);

        //找到小计节点
        let subPriceNode = document.querySelectorAll('[data-name="subPrice"]');
        subPriceNode = order.price * order.qty;
        console.log(subPriceNode);

        // 设置一个新id
        // 挂接到父元素
        // 获取所有到数据节点data-name 依次将对应到数据送入节点对应属性
        // 移除新节点到隐藏属性 d-none
    }
}
displayOrderList();
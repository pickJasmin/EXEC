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
    let exampleNode = document.querySelectorAll('#orderExample')[0];



    //遍历订单列表
    for (const i in orderList) {

        //当前订单数据
        let order = orderList[i];
        // console.log(order);
        // 克隆样本节点形成当前订单节点
        var node = exampleNode.cloneNode(true);
        //挂接到父元素
        cartList.appendChild(node);


        //设置数据
        //节点id
        node.id = order.id;

        //图像地址
        //找图像节点
        let imgNode = document.querySelector('[data-name="imgSrc"]');
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
        let titleNode = document.querySelector('[data-name="title"]');
        titleNode.innerHTML = order.title;
        console.log(titleNode);

        //找到单价节点
        let priceNode = document.querySelector('[data-name="price"]');
        priceNode.innerHTML = order.price;
        console.log(priceNode);

        //找到数量节点
        let qtyNode = document.querySelector('[data-name="qty"]');
        qtyNode.innerHTML = order.qty;
        console.log(qtyNode);

        //找到小计节点
        let subPriceNode = document.querySelector('[data-name="subPrice"]');
        subPriceNode.innerHTML = order.price * order.qty;
        console.log(subPriceNode);

        //已选几件商品
        let selectedQtyNode = document.querySelector('[data-name="selectedQty"]');
        selectedQtyNode.innerHTML = cartData.totalQty;
        console.log(selectedQtyNode);

        //总价节点
        let selectedAmountNode = document.querySelector('[data-name="selectedAmount"]');
        selectedAmountNode.innerHTML = cartData.totalAmount;
        console.log(selectedAmountNode);

        // 设置一个新id
        // 挂接到父元素
        // 获取所有到数据节点data-name 依次将对应到数据送入节点对应属性
        // 移除新节点到隐藏属性 d-none
    }
}
displayOrderList();
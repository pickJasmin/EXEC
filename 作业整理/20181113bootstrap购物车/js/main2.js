


//显示商品数据
function displayProducts() {
    // 获取商品列表父节点
    let productListNode = document.querySelector('#productList');

    // 获取商品样本节点
    let productExampleNode = document.querySelector('#productExample');
    console.log(productExampleNode);

    for (const test in carts) {
        // 当前商品数据
        let product = carts[test];
        // 克隆样本节点形成当前商品节点
        let node = productExampleNode.cloneNode(true);
        // 将商品节点挂接到父节点下
        productListNode.appendChild(node);

        // 设置数据
        // 商品节点id
        node.id = product.id;
        // 商品标题
        let example = node.querySelector('[data-name="title"]');
        example.textContent = product.Sname;

        // 商品单价
        example = node.querySelector('[data-name="unitPrice"]');
        example.textContent = "¥ " + product.price;

        // 图像地址
        example = node.querySelector('[data-name="imgSrc"]');
        example.src = "images/" + product.imgSRC


        // 去除隐藏
        node.classList.remove('d-none');
    }
    // 给各个按钮添加事件
    addEvent();
}


// 显示加入购物车的商品的总数量
function displayTotal() {
    // 获取购物车旁边的徽标
    var totalQty = document.getElementsByName('totalQty')[0];
    console.log(totalQty);

    // 更改徽标数据
    totalQty.textContent = cart.getDataFromLocalStorage().totalQty;
}

// 给各个按钮添加事件
function addEvent() {

    // 获取各个按钮节点 
    var totalQty = document.getElementById('cart');
    var totalQty = document.querySelector('.badge');

    // 获取增加按并添加单击事件
    var increase = document.getElementsByName('increase')
    for (let i = 0; i < increase.length; i++) {
        increase[i].addEventListener('click', increaseValue);
    }



    //获取减少按并添加单击事件
    var decrease = document.getElementsByName('decrease');
    for (let i = 0; i < decrease.length; i++) {
        decrease[i].addEventListener('click', decreaseValue);
    }

    //获取加入购物车按钮并添加单击事件
    var add = document.getElementsByName('addToCartNum');
    for (let i = 0; i < add.length; i++) {
        add[i].addEventListener('click', addToCartNum);
    }

}



// “+”按钮触发函数
function increaseValue(e) {
    // DOM nextElementSibling属性，返回元素的下一个兄弟元素
    var qtyObj = e.target.previousElementSibling;
    // 利用JavaScript parseInt()函数返回整数
    var qty = parseInt(qtyObj.textContent);
    qty++;
    // 更改商品数量
    qtyObj.textContent = qty;     
}

// “-”按钮触发函数
function decreaseValue(e) {
    // DOM nextElementSibling属性，返回元素的下一个兄弟元素
    var qtyObj = e.target.nextElementSibling;
    // 利用JavaScript parseInt()函数返回整数
    var qty = parseInt(qtyObj.textContent);
    if (qty > 1) qty--;
    else qty = 0;
    // 更改商品数量
    qtyObj.textContent = qty;     
}


// “加入购物车”按钮触发函数
function addToCartNum(e) {
    // 获取商品数量节点（DOM previousElementSibling属性，返回元素的前一个兄弟元素）
    let qtyObj = e.target.previousElementSibling.previousElementSibling;
    // 商品数量（利用JavaScript parseInt()函数返回整数）
    let qty = parseInt(qtyObj.textContent);

    // 获取当前商品的的id
    let productionId = (e.target.parentNode.parentNode.parentNode.parentNode.parentNode).getAttribute("id");
    // 定义变量product用于储存商品的数据
    var product;
    // 遍历所有商品数据products，与当前id相同的商品数据存入变量product
    for (const i in carts) {
        if (productionId == carts[i].id) {
            product = carts[i];
            break;
        }
    }
    // 实例化Order并存入变量order中
    var order = new Order(product, qty, true);

    cart.addToCart(order);
    displayTotal();
}
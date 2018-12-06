
// // 使用json变量存储数据(后续可以从服务器端获得)
// var productsJson = {
//     "productList": [{ "id": "01", "title": "30片巨补水 秋冬新款面膜", "imgSrc": "01.jpg", "price": 99.50 },
//     { "id": "02", "title": "新西兰进口白金版婴幼儿奶粉", "imgSrc": "02.jpg", "price": 80.50 },
//     { "id": "03", "title": "卡耐基经典 人性的弱点", "imgSrc": "03.jpg", "price": 50.00 },
//     { "id": "04", "title": "海淘耳机", "imgSrc": "04.jpg", "price": 33.50 }
//     ]
// }
// 产品列表
var productList;
var productsRootNode = document.querySelector('#productsRoot');
// 将值设置到结点中
function setValueToNode(product,productNode) {
    for (const key in product) {
        if (product.hasOwnProperty(key)) {
            let qstr = '[data-name="' + key + '"]';
            let elementNode = productNode.querySelector(qstr);
            switch (key) {
                case 'title': elementNode.textContent = product[key]; break;
                case 'price': elementNode.textContent = product[key].toFixed(2); break;
                case 'imgSrc': elementNode.src = "images/" + product[key]; break;
                case 'id': {
                    // 当前订单节点根元素、+号.减号、删除按钮设计data-id属性
                    let idAttrNodes = new Array();
                    idAttrNodes.push(productNode);
                    idAttrNodes.push(productNode.querySelector('[data-operator="increase"]'));
                    idAttrNodes.push(productNode.querySelector('[data-operator="decrease"]'));
                    idAttrNodes.push(productNode.querySelector('[data-operator="addToCart"]'));
                    idAttrNodes.forEach(element => { element.setAttribute("data-id", product[key]); });
                }
            }
        }
    }
}
//为某个结点的各种按钮设计事件
function regEvent(productNode) {    
    // 获取增加按并添加单击事件
    let increaseBtn = productNode.querySelector('[data-operator="increase"]');
    increaseBtn.onclick = increaseQty;
    // 获取减少按钮并添加单击事件
    let decreaseBtn = productNode.querySelector('[data-operator="decrease"]');
    decreaseBtn.onclick = decreaseQty;
    //获取加入购物车按钮并添加单击事件
    let addToCartBtn = productNode.querySelector('[data-operator="addToCart"]');
    console.log(addToCartBtn);
    addToCartBtn.onclick = addToCart;
}
//显示产品列表并注册事件
function dispalyProducts() {

    if (productList.length == 0) return;
    let parentNode;
    //将订单列表数据置入新节点
    for (const i in productList) {

        if (i % 4 == 0) {
            let rowNode = document.createElement('div');
            rowNode.className = "row";
            productsRootNode.appendChild(rowNode);
            parentNode = rowNode;
        }

        // 为缩短引用当前商品，设置一个变量product替代当前商品的数组描述
        let product = productList[i]; 

        //拷贝样本节点形成当前商品节点
        let productNode = (document.querySelector('#productExample')).cloneNode(true);

        // 将商品节点挂接到父节点下
        parentNode.appendChild(productNode);

        //将当前商品的值设置到到到页面对应节点中
        setValueToNode(product,productNode);

        // 移除隐藏属性
        productNode.classList.remove('d-none');
        if (parentNode != productsRootNode) parentNode.classList.remove('d-none');

        //为各种按钮设置事件
        regEvent(productNode);
    }
}
//显示总数
function displayTotalQty() {
    // 获取购物车商品总数量节点
    let totalQty = document.querySelector('[data-name="totalQty"]');
    //创建购物车对象实例
    let cart_index = new ShoppingCart();
    // 更新页面商品购物车总数量
    totalQty.textContent = cart_index.getDataFromLocalStorage().totalQty;
}

// 显示所有数据
function displayData() {
    dispalyProducts();
    displayTotalQty();    
}


//增加按钮触发事件函数
function increaseQty(e) {
    let qtyObj = e.target.nextElementSibling;
    let qty = parseInt(qtyObj.textContent);
    qty++;
    qtyObj.textContent = qty;
}


// 减少按钮事件触发函数
function decreaseQty(e) {
    let qtyObj = e.target.previousElementSibling;
    let qty = parseInt(qtyObj.textContent);
    if (qty > 1) qty--;
    else qty = 0;
    qtyObj.textContent = qty;
}


//加入购物按钮事件触发函数
function addToCart(e) {
    // 获取当前单击商品的数量
    let qty = parseInt((e.target.parentNode).querySelector('[data-name="qty"]').textContent);
    //获取当前点击商品的id
    let id = e.target.getAttribute("data-id");
    //从数据列表中获取商品信息并存入product
    let product;
    for (const i in productList) {
        if (id == productList[i].id) {
            product = productList[i]; break;
        }
    }

    let order = new Order(product, qty, true);

    //创建购物车对象实例
    let cart_index = new ShoppingCart();
    //将选中商品写入购物车
    cart_index.addToCart(order);

    // 更新页面商品总数量
    displayTotalQty();


}

// 从json文件中获取productList--ajax
// function getProducts(){
//     //ajax
//     let xhr=new XMLHttpRequest();
//     xhr.open('GET','data/products.json');
//     xhr.responseType='json';
//     xhr.send();
//     xhr.onreadystatechange=function(){
//         if(xhr.readyState === 4 && xhr.status === 200){
//             productList=xhr.response;
//             console.log(productList);
//             init();
//         }
//         else {
//             console.log(xhr.readyState);
//             console.log(xhr.status);
//             console.log('文件请求失败');
//         }   
//     }   
// }


//从json文件中获取productList--fetch
function getProducts() {
    //fetch
    fetch('data/products.json').then(function (response) {
        if (response.ok) {
            response.json().then(function (jsonData) {
                productList = jsonData;
                displayData();
            })
        }
        else {
            console.log('网络请求products.json 失败，响应信息：' + response.status + ': ' + response.statusText);

        }
    })
}
getProducts();












// 商品类
class Product {
    constructor(id, title, imgSrc, price) {
        this.id = id;
        this.title = title;
        this.imgSrc = imgSrc;
        this.price = price;
    }
}


//订单类
class Order {
    constructor(product, qty, selectStatus) {
        this.id = product.id;
        this.title = product.title;
        this.imgSrc = product.imgSrc;
        this.price = product.price;
        this.qty = qty;
        this.selectStatus = selectStatus;
    }
};

// -----------------
// 购物车数据类,用于记录购物车数据。
// 包括订单列表、总计商品数量、总计商品样本数、总价格
// 订单列表项包括：某类商品、商品数量小计
// 商品包括：商品id、图片、名称、单价
class CartData {
    constructor() {
        this.orderList = new Array();
        this.totalQty = 0;
        this.totalAmount = 0;
        this.units = 0;
    }
}

//购物车操作类
class ShoppingCart {

    // 清空购物车（移除本地存储购物车项）
    clearCart() {
        localStorage.removeItem('lzzyCart');
    }
    // 从本地存储中获取购物车数据
    getDataFromLocalStorage() {
        let lzzyCart = localStorage.getItem('lzzyCart');
        // 判断购物车是否为空
        if (lzzyCart == null || lzzyCart == '') {
            return new CartData();
        } else {
            return JSON.parse(lzzyCart);
        }
    }
    // 将购物车数据写入本地存储中
    setDataToLocalSatorge(cartData) {
        //清除原有存储写入新列表
        localStorage.removeItem('lzzyCart');
        //写入本地存储
        localStorage.setItem('lzzyCart', JSON.stringify(cartData));
    }
    // 加入购物车（写入localStorage)
    addToCart(order) {
        // 从本地存储中获取购物车的数据
        let cartData = this.getDataFromLocalStorage();
        // 获取购物车json数据中的订单列表            
        let orderList = cartData.orderList;
        //设置标志位判断是否为购物车新商品，默认为是新商品
        let isNewProduct = true;
        // 遍历订单列表，判断新加入商品是否在购物车中

        for (let i in orderList) {
            if (order.id == orderList[i].id) {
                // 若新加入订单商品已经在购物车中，则变更订单列表中对应商品数量，且变更新商品标志位
                orderList[i].qty += order.qty;
                isNewProduct = false;
                break;
            }
        }
        //如果是新商品
        if (isNewProduct) {
            // 购物车总样本+1
            cartData.units++;
            // 导入新商品置入购物车
            orderList.push(order);
        }

        //修改购物车总金额及商品总数量
        cartData.totalAmount += order.qty * order.price;
        cartData.totalQty += order.qty;

        // 写入localStorage
        this.setDataToLocalSatorge(cartData);
    }
    // 获取购物车中的订单列表
    getSelectedList() {
        // 从本地存储中获取购物车的数据
        let cartData = this.getDataFromLocalStorage();
        let selectArray = new Array();
        let orderList = cartData.orderList;
        for (const key in orderList) {
            const order = orderList[key];
            if (order.selectStatus) {
                selectArray.push(order);
            }

        }
        return selectArray;
    }
    // 获取选中商品的总数量
    getSelectedQty() {
        let cartData = this.getDataFromLocalStorage();       
        let orderList = cartData.orderList;
        let selectedQty = 0;
        for (const key in orderList) {
            if (orderList[key].selectStatus) {
                selectedQty += orderList[key].qty;
            }
        }
        return selectedQty;
    }
    // 获取选中商品的总价格
    getSelectedAmount() {
        let cartData = this.getDataFromLocalStorage();       
        let orderList = cartData.orderList;
        let selectedAmount = 0;

        for (const key in orderList) {
            if (orderList[key].selectStatus) {
                selectedAmount += orderList[key].qty * orderList[key].price;
            }
        }
        return selectedAmount;
    }   
}
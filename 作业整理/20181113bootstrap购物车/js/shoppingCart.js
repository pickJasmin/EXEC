//商品类
class Product {
    constructor(id, title, price, imgSrc) {
        //商品类成员
        this.id = id;//商品编号
        this.title = title;//商品名称
        this.price = price;//商品价格
        this.imgSrc = imgSrc;//商品图片地址
    }
}

//订单类
class Order {
    constructor(product, qty, selectStatus) {
        //订单类成员
        this.id = product.id;//商品编号
        this.title = product.title;//商品名称
        this.price = product.price;//商品价格
        this.imgSrc = product.imgSrc;//商品图片地址
        this.qty = qty;//数量
        this.selectStatus = selectStatus;//选择状态
    }
}


//购物车数据类，用于记录购物车数据
//包括订单列表、总计商品数量、总计商品样本数、总价格
//订单列表项包括：某类商品、商品数量小计
//商品包括：商品id、图片、名称、单价

//购物车数据类---确定格式
class CartData {
    //数据成员
    constructor() {
        this.orderList = new Array();//订单列表
        this.units = 0;//总样本数
        this.totalQty = 0;//总件数
        this.totalAmount = 0;//总金额
    }
}

class ShoppingCart {
    //将购物车数据写入本地存储中
    setDataToLocalStorage(cartData) {
        //清除原有存储写入新列表
        localStorage.removeItem('lzzyCart');
        //写入本地存储
        localStorage.setItem('lzzyCart', JSON.stringify(cartData));
    }
    //从本地存储中获取购物车数据
    getDataFromLocalStorage() {
        let lzzyCart = localStorage.getItem('lzzyCart');
        // 判断购物车是否为空
        if (lzzyCart == null || lzzyCart == '') {
            return new CartData();
        }
        else {
            return JSON.parse(lzzyCart);
        }

    }

    //获取选中对象的订单列表
    getSelectedList() { }
    //加入购物车（写入localStorage）
    addToCart(order) {

    }
}
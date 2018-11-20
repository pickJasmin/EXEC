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
        var cartDataString = JSON.stringify(cartData);
        localStorage.setItem("shopp", cartDataString);//存储变量名为shopp，值为value的变量
    }
    //从本地存储中获取购物车数据
    getDataFromLocalStorage() {
        return localStorage.getItem("shopp");
    }

    //获取选中对象的订单列表
    getSelectedList() { }
}
//商品类
class Product {
    constructor(id, title, price, imgSrc) {
        //商品类成员
        this.id = id; //商品编号
        this.title = title; //商品名称
        this.price = price; //商品价格
        this.imgSrc = imgSrc; //商品图片地址
    }
}

//订单类
class Order {
    constructor(product, qty, selectStatus) {
        //订单类成员
        this.id = product.id; //商品编号
        this.title = product.title; //商品名称
        this.price = product.price; //商品价格
        this.imgSrc = product.imgSrc; //商品图片地址
        this.qty = qty; //数量
        this.selectStatus = selectStatus; //选择状态
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
        this.orderList = new Array(); //订单列表
        this.units = 0; //总样本数
        this.totalQty = 0; //总件数
        this.totalAmount = 0; //总金额
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
        } else {
            return JSON.parse(lzzyCart);
        }
    }

    // //获取选中对象的订单列表
    // getSelectedList() { }


    //加入购物车（写入localStorage）
    addToCart(order) {
        let cartData = this.getDataFromLocalStorage();

        var flag = true; //假设当前是新商品
        for (var i = 0; i < cartData.orderList.length; i++) {
            if (order.id == cartData.orderList[i].id) {
                flag = false; //修改状态，是老商品
                //新增对应qty
                cartData.orderList[i].qty += order.qty;
                break;
            }
        }
        if (flag) {
            //orser是购物车的新商品，给样本数++
            cartData.orderList.push(order);
            cartData.units++;
        }

        cartData.totalQty += order.qty;
        cartData.totalAmount += order.price * order.qty;



        //将新购物车数据写入本地存储
        this.setDataToLocalStorage(cartData);
    }
    //清除购物车
    clearCart() {
        // localStorage.clear();
        localStorage.removeItem('lzzyCart');
    }
    //获取选中的商品的总数量
    getSelectedQty() {
        //获取购物车的数据
        let cartData = this.getDataFromLocalStorage();
        //获取购物车数据的订单列表
        let orderList = cartData.orderList;
        let selectedQty = 0

        for (let i in orderList) {
            //selectStatus判断真假状态，默认为真
            if (orderList[i].selectStatus) {
                selectedQty += orderList[i].qty;
            }
        }
        return selectedQty;
    }
    //获取选中商品的总价格
    getSelectedAmount() {
        //获取购物车的数据
        let cartData = this.getDataFromLocalStorage();
        //获取购物车数据的订单列表
        let orderList = cartData.orderList;
        let selectedAmount = 0;

        for (let i in orderList) {
            //selectStatus判断真假状态，默认为真
            if (orderList[i].selectStatus) {
                selectedAmount += orderList[i].qty * orderList[i].price;
            }
        }
        return selectedAmount;
    }
    //设置购物车订单项选择状态
    setItemSelectedStatus(id, selectStatus) {
        //获取购物车的数据
        let cartData = this.getDataFromLocalStorage();
        //获取购物车数据的订单列表
        let orderList = cartData.orderList;
        let flag = false;
        for (let i in orderList) {
            if (id == orderList[i].id) {
                orderList[i].selectStatus = selectStatus;
                flag = true;
            }
        }
        if (flag) this.setDataToLocalStorage(cartData);
    }
    //查找指定id的订单
    find(id, orderList) {
        for (const i in orderList) {
            if (id == orderList[i].id) {
                return orderList[i];
            }
        }
        return null;

    }
    //删除指定ID商品
    deleteItem(id) {
        // 获取购物车数据
        let cartData = this.getDataFromLocalStorage();
        // 获取订单列表
        let orderList = cartData.orderList;
        // 获取指定id的订单(要删除的订单)
        let order = this.find(id, orderList);

        //定位要删除的订单在数组中的位置
        let index = orderList.indexOf(order, 0);

        if (index == -1) {
            // 找不到需要删除的订单
            console.log('订单id有误');
        } else {
            // 删除当前订单
            orderList.splice(index, 1);
            // 变更总商品总件数
            cartData.totalQty -= order.qty;
            //变更商品总价格
            cartData.totalAmount -= order.qty * order.price;
            // 变更总商品件数
            cartData.units--;
            //数据回写购物车
            this.setDataToLocalStorage(cartData);
        }

    }

}
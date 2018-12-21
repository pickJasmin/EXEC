// localStorage.setItem("key","value");//存储变量名为key，值为value的变量 
// localStorage.key = "value"//存储变量名为key，值为value的变量 
// localStorage.getItem("key");//获取存储的变量key的值
// localStorage.key;//获取存储的变量key的值 
// localStorage.removeItem("key")//删除变量名为key的存储变量

// 商品类
class product {
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

    // 从本地存储中获取购物车数据
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

    // 将购物车数据写入本地存储中
    setDataToLocalSatorge(cartData) {
        //清除原有存储写入新列表
        localStorage.removeItem('lzzyCart');
        //写入本地存储
        localStorage.setItem('lzzyCart', JSON.stringify(cartData));
    }

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

    getSelectedQty() {
        let selectedQty = 0;
        let selectArray = this.getSelectedList();
        for (const key in selectArray) {
            if (selectArray.hasOwnProperty(key)) {
                const element = selectArray[key];
                selectedQty += element.qty;
            }
        }
        return selectedQty;
    }

    getSelectedAmount() {
        let selectedAmount = 0;
        let selectArray = this.getSelectedList();
        for (const key in selectArray) {
            if (selectArray.hasOwnProperty(key)) {
                const element = selectArray[key];
                selectedAmount += element.qty * element.price;
            }
        }
        return selectedAmount;
    }
    // 设置购物车订单项选择状态
    setItemSelectStatus(id, selectStatus) {
        let cartData = this.getDataFromLocalStorage();
        let orderList = cartData.orderList;
        let index = this.find(id);
        if (index == null) { console.log('订单id有误'); return; }
        else {
            orderList[index].selectStatus = selectStatus;
        }
        this.setDataToLocalSatorge(cartData);
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

    // 清空购物车（移除本地存储购物车项）
    clearCart() {
        localStorage.removeItem('lzzyCart');
    }

    find(id) {
        let cartData = this.getDataFromLocalStorage();
        let orderList = cartData.orderList;
        let index = -1;
        for (const i in orderList) {
            if (id == orderList[i].id) {
                index = i;
                break;
            }
        }
        if (index >= 0) {
            return index;
        }
        else {
            return null;
        }
    }

    // 删除指定ID商品
    deleteItem(id) {
        let cartData = this.getDataFromLocalStorage();
        let orderList = cartData.orderList;
        let index = this.find(id);
        if (index == null) { console.log('订单id有误'); }
        else {
            // 变更总商品总件数
            cartData.totalQty -= orderList[index].qty;
            cartData.totalAmount -= orderList[index].qty * orderList[index].price;
            // 删除当前订单
            orderList.splice(index, 1);
            // 变更总商品件数
            cartData.units = orderList.length;
            //数据回写购物车
            this.setDataToLocalSatorge(cartData);
        }

    }

    // 减少/增加指定商品的数量
    changeQty(id, op) {
        let cartData = this.getDataFromLocalStorage();
        let orderList = cartData.orderList;
        let index = this.find(id);
        console.log(index);

        if (index == null) {
            console.log('订单id有误');
            return;
        }
        else {
            if (op == '+') {
                //改变当前订单数量                                
                orderList[index].qty++;
                // 变更总商品总数
                cartData.totalQty++;
                //变更商品总价格
                cartData.totalAmount += orderList[index].price;
            }
            else if (op == '-') {
                //改变当前订单数量
                orderList[index].qty--;
                // 变更总商品总数
                cartData.totalQty--;
                //变更商品总价格
                cartData.totalAmount -= orderList[index].price;
            }

            //数据回写购物车
            this.setDataToLocalSatorge(cartData);
        }
    }

}


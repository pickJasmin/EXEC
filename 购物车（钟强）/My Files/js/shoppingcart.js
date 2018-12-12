localStorage.setItem("key", "value");//存储变量名为key，值为value的变量 

localStorage.getItem("key");//获取存储的变量key的值

localStorage.removeItem("key")//删除变量名为key的存储变量




//商品类   商品ID，图片，名称，单价
class Product {
  constructor(ID, title, imgSrc, price) {
    this.ID = ID;
    this.title = title;
    this.imgSrc = imgSrc;
    this.price = price;
  }
}
//订单类  某类商品，商品数量小计
class Order {
  constructor(product, qty, selectStatus) {
    this.ID = product.ID;
    this.title = product.title;
    this.imgSrc = product.imgSrc;
    this.price = product.price;
    this.qty = qty;
    this.selectStatus = selectStatus; //选择状态
  }
}
//购物车数据类
class CartData {
  constructor() {
    this.orderList = new Array();  //订单列表
    this.totalQty = 0;    //总样本数
    this.totalAmount = 0;//总件数 
    this.units = 0;   //总价格
  }
}
//购物车数据操作
//购物车类
class ShoppingCart {
  //从本地存储中获取购物车数据
  getDataFromLocalStorage() {
    var text = localStorage.getItem('inner')//获取本地存储key
    if (text == "" || text == null) {
      return new CartData();  //如果没有  创建一个购物车数据类
    }
    else {
      return JSON.parse(text);  //如果有  输出
    }
  }
  //将购物车数据写入本地存储中
  setDataToLocalStorage(cartData) {
    //清除原有的存储过程
    localStorage.removeItem('inner');
    //将购物车数据类  转为JSON
    var Datastring = JSON.stringify(cartData);
    //将数据存储到localStorage
    localStorage.setItem('inner', Datastring);
  }

  //获取选中商品的总数量
  getSelectedQty() {
    let cartData = this.getDataFromLocalStorage();
    var newqty = 0;
    for (var i = 0; i < cartData.orderList.length; i++) {
      if (cartData.orderList[i].selectStatus) { //选择状态
        newqty += cartData.orderList[i].qty;
      }
    }
    return newqty;

  }
  //获取选中商品的总价格
  getSelectedAmount() {
    let cartData = this.getDataFromLocalStorage();
    var newunits = 0;
    for (var i = 0; i < cartData.orderList.length; i++) {
      if (cartData.orderList[i].selectStatus) { //选择状态
        newunits += cartData.orderList[i].qty * cartData.orderList[i].price;
      }
    }
    return newunits;
  }
  //加入购物车
  addToCart(order) {
    let cartData = this.getDataFromLocalStorage();

    var flag = true;//假设当前是新商品
    for (var i = 0; i < cartData.orderList.length; i++) {
      if (order.ID == cartData.orderList[i].ID) {
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

  clearCart() {
    //清除购物车
    localStorage.clear();
    localStorage.removeItem('inner');
  }
  //设置某个订单（id）的选择状态
  srtItemSelectStatus(ID, selectStatus) {
    let cartData = this.getDataFromLocalStorage();
    for (var i = 0; i < cartData.orderList.length; i++) {
      if (cartData.orderList[i].ID == ID) {
        cartData.orderList[i].selectStatus = selectStatus;
      }
      else {
        console.log('没有找到ID');
        return;
      }
    }
    this.setDataToLocalStorage(cartData);
  }

  //删除某个指定（id）订单
  deleteItem(ID) {
     // 获取购物车数据
    let cartData = this.getDataFromLocalStorage();
    // 获取订单列表
    let orderList = cartData.orderList;
    // 获取指定id的订单(要删除的订单)
    let order = this.find(ID, orderList);
    //定位要删除的订单在数组中的位置
    let index = orderList.indexOf(order, 0);
    if (index == 1) {
      console.log('您的ID不正确');
    }
    else {
      orderList.splice(index, 1);
      cartData.totalQty -= order.qty;
      cartData.totalAmount -= order.qty * order.price;
      cartData.units--;
      this.setDataToLocalStorage(cartData);
    }
  }
  //查找ID
  find(ID) {
    //   let cartData = this.getDataFromLocalStorage();
    //   let orderList = cartData.orderList;
    //   let index = null;
    //   for (var i = 0; i < orderList.length; i++) {
    //     if (ID == orderList[i].ID) {
    //       index = 1;
    //       break;
    //     }
    //   }
    //   if (index != null) {
    //     return orderList[index];
    //   }
    //   else {
    //     return null;
    //   }
    // }
    let cartData = this.getDataFromLocalStorage();
    let orderList = cartData.orderList;
    for (var i = 0; i < orderList.length; i++) {
      if (ID == orderList[i].ID) {
        return orderList[i];
      }
    }
  }



  }



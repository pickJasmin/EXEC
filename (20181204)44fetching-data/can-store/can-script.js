
// 创建变量products用于存储商品数据
var products;

//使用fetch技术，获取本站产品json文件
fetch('products.json').then(function (response) {
  if (response.ok) {//如果获取文件成功
    //则将改文件内容格式化为json对象
    response.json().then(function (json) { //若json数据转换成功，结果将存入json变量
      //将json变量结果存入全局变量products
      products = json;
      //调用初始化函数
      initialize();
    });
  } else {
    //若获取文件失败，则向控制台提供报错信息
    console.log('网络请求products.json 失败，响应信息：' + response.status + ': ' + response.statusText);
  }
});


// 设置app逻辑，定义需要的变量，包括所有别的的函数
function initialize() {

  //获取所有需要的UI元素
  // 类别下拉式列表
  var category = document.querySelector('#category');
  // 搜索文本框
  var searchTerm = document.querySelector('#searchTerm');
  // 过滤按钮
  var searchBtn = document.querySelector('button');
  //主内容区
  var main = document.querySelector('main');

  // 最近一次搜索的类别
  var lastCategory = category.value;
  // 最近一次搜索关键字（初值为空串）
  var lastSearch = '';

  //设计类别数组存放属于该类的商品
  var categoryGroup;
  // 设计最终数组存放最后搜索结果（某类下某个关键字）
  var finalGroup;
  // 初始状态下最终结果就是所有商品
  finalGroup = products;

  // 调用更新显示函数
  updateDisplay();

  //在页面更新后设置两个数组为空
  categoryGroup = [];
  finalGroup = [];

  // 为搜索按钮设计单击事件
  searchBtn.onclick = selectCategory;
  // 搜索按钮被单击后触发函数
  function selectCategory(e) {
    // 阻止按钮的默认事件行为
    e.preventDefault();

    // 清空类别数组和最终数组
    categoryGroup = [];
    finalGroup = [];


    if (category.value === lastCategory && searchTerm.value.trim() === lastSearch) {
      // 如果最后一次搜索下拉列表值和文本框搜索关键字值相等则返回函数
      return;
    } else {
      // 更新类别和关键字
      lastCategory = category.value;
      lastSearch = searchTerm.value.trim();

      if (category.value === 'All') {
        // 如果类别==全部 则将类别数组设计为所有商品调用selectProducts();
        categoryGroup = products;

      } else {
        // 遍历produtcs数据
        for (var i = 0; i < products.length; i++) {
          // 挑选适合的类别数组
          if (products[i].type === category.value) {
            categoryGroup.push(products[i]);
          }
        }
      }
      selectProducts();
    }
  }

  // 选择商品
  function selectProducts() {
    // 如果关键字为空
    if (searchTerm.value.trim() === '') {
      // 最终数组就是类别数组
      finalGroup = categoryGroup;
    } else {
      // 否则按关键字在对应类别下挑选合适的数据
      let searchTerm = searchTerm.value.trim();
      for (let i = 0; i < categoryGroup.length; i++) {
        if (categoryGroup[i].name.indexOf(searchTerm) !== -1) {
          finalGroup.push(categoryGroup[i]);
        }
      }
    }
    // 调用更新显示函数
    updateDisplay();
  }

  // 
  function updateDisplay() {
    //移除之前的内容
    while (main.firstChild) {
      main.removeChild(main.firstChild);
    }

    if (finalGroup.length === 0) {
      // 没有符合条件的结果
      var para = document.createElement('p');
      para.textContent = '没有符合条件的结果';
      main.appendChild(para);

    } else {
      // 遍历结果数组
      for (var i = 0; i < finalGroup.length; i++) {
        // 显示内容
        fetchBlob(finalGroup[i]);
      }
    }
  }

  function fetchBlob(product) {
    // 拼接图片地址
    var url = 'images/' + product.image;
    // 向服务器请求图片文件
    fetch(url).then(function (response) {
    // 如果服务器相应后执行函数
      if (response.ok) {
        // 从响应状态中读取二进制对象
        response.blob().then(function (blob) {
        // 创建二进制对象的显示地址          
          var objectURL = URL.createObjectURL(blob);
          // 调用显示函数
          showProduct(objectURL, product);
        });
      } else {
        console.log('请求图片 "' + product.name + '" 失败 ' + response.status + ': ' + response.statusText);
      }
    });
  }

  //显示一个商品
  function showProduct(objectURL, product) {
    // 创建相关结点
    var section = document.createElement('section');
    var heading = document.createElement('h2');
    var para = document.createElement('p');
    var image = document.createElement('img');


    // 为相关结点设计z自定义属性
    section.setAttribute('data-type', product.type);

    //设计标题值
    heading.textContent = product.name

  // 设计价格
    para.textContent = '$' + product.price.toFixed(2);

   //设计图像地址
    image.src = objectURL;
    image.alt = product.name;

    // 添加一个商品
    main.appendChild(section);
    section.appendChild(heading);
    section.appendChild(para);
    section.appendChild(image);
  }
}

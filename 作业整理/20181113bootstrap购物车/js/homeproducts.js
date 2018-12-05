//创建一个变量来存储产品“数据库”,存储homeproducts.json
var products;
//使用XHR检索，将responseType设置为json，并报告错误
//发生在XHR操作中。如果复制成功，则将产品设置为相等
//请求。响应，然后运行initialize()函数

var request = new XMLHttpRequest();
request.open('GET', 'homeproducts.json');
request.responseType = 'json';

request.onload = function () {
  if (request.status === 200) {
    products = request.response;
    console.log(products);
    //调用函数
    initialize();
  } else {
    console.log('Network request for products.json failed with response ' + request.status + ': ' + request.statusText)
  }
};

request.send();

function initialize(){}
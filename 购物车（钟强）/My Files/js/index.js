
var products;
//这里引用JSON里的数据

//父亲
var signFathe = document.getElementById('signFathe');
console.log(signFathe);
//儿子
var signSon = document.getElementById('signSon');
console.log(signSon);


//请求数据
var request = new XMLHttpRequest();
request.open('GET', '../My Files/index.json');
request.responseType = 'json';

request.onload = function () {
  if (request.status === 200) {
    products = request.response;
    console.log(products);
    initialize(products);
  } else {
    console.log('Network request for products.json failed with response ' + request.status + ': ' + request.statusText)
  }
};

request.send();

function initialize(products) {
  for (let i = 0; i < products.length; i++) {
    var jsonarray = products[i];
    // 克隆
    var cln = signSon.cloneNode(true);
    // 把 克隆的结果 放到 父亲下
    signFathe.appendChild(cln);
    //加ID
    cln.id = jsonarray.ID;
    //商品名称
    var title = cln.querySelector('#title');
    // console.log(title);
    title.textContent = jsonarray.title;
    //图片
    var imgSrc=cln.querySelector('#imgSrc');
    // console.log(imgSrc);
    imgSrc.src=jsonarray.imgSrc; 
    //价格
    var price=cln.querySelector('#price');
    console.log(price);
    price.textContent=(jsonarray.price).toFixed(2);
  }

}
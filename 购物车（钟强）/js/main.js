// var btnList = document.querySelectorAll('.btn-group .btn');
var totalQty=document.getElementsByName('totalQty')[0];

var add = document.getElementsByName("increase");
console.log(add);

var reduce = document.getElementsByName("decrease");
console.log(reduce);

var shop = document.getElementsByName("addToCart");
console.log(shop);

var deletenew = document.getElementsByName("deleteevent");
console.log(deletenew);

var lists=document.getElementById("myList");
console.log(lists);


// for (const key in btnList) {
//     if (btnList.hasOwnProperty(key)) {
//         const element = btnList[key];
//         switch(element.name){
//             case 'increase':element.addEventListener('click',increaseValue);break;
//             case 'decrease':element.addEventListener('click',decreaseValue);break;
//             case 'addToCart':element.addEventListener('click',addToCart);break;
//         }        
//     }
// }
 for(let i=0;i<deletenew.length;i++){
       deletenew[i].addEventListener('click',deleteevent);
}

for (let i =0;i< add.length;i++){
    add[i].addEventListener('click',increaseValue);
}
for (let i =0;i< reduce.length;i++){
    reduce[i].addEventListener('click',decreaseValue);
}
for (let i =0;i< shop.length;i++){
    shop[i].addEventListener('click',addToCart);
}
 function deleteevent(e){
    lists.removeChild(lists.childNodes[0]);
}

function increaseValue(e) {
    var qtyObj = e.target.nextElementSibling;    //属性返回指定元素之后的下一个兄弟元素（相同节点树层中的下一个元素节点）。
    var qty = parseInt(qtyObj.innerText);
    qty++;
    qtyObj.innerText = qty;
    console.log(qty);
}

function decreaseValue(e) {
    var qtyObj = e.target.previousElementSibling;
    var qty = parseInt(qtyObj.innerText);
    if (qty > 1) qty--;
    else qty = 0;
    qtyObj.innerText = qty;
    console.log(qty);
}

function addToCart(e) {
    var qtyObj = e.target.previousElementSibling.previousElementSibling;
    var qty = parseInt(qtyObj.innerText);
    var total = parseInt(totalQty.innerText);
    total += qty;
    totalQty.innerText = total;
}
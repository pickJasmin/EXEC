

var sliderData = {
    "imageList": [
        { "itemId": "first", "itemClassName": "firstanimation", "aHref": "#", "imgSrc": "images/img_1.jpg", "imgAlt": "美洲狮", "h1Content": "美洲狮" },
        { "itemId": "second", "itemClassName": "secondanimation", "aHref": "#", "imgSrc": "images/img_2.jpg", "imgAlt": "雄狮", "h1Content": "雄狮" },
        { "itemId": "third", "itemClassName": "thirdanimation", "aHref": "#", "imgSrc": "images/img_3.jpg", "imgAlt": "天行者", "h1Content": "天行者" },
        { "itemId": "fourth", "itemClassName": "fourthanimation", "aHref": "#", "imgSrc": "images/img_4.jpg", "imgAlt": "怒吼", "h1Content": "怒吼" },
        { "itemId": "fifth", "itemClassName": "fifthanimation", "aHref": "#", "imgSrc": "images/img_5.jpg", "imgAlt": "晒太阳", "h1Content": "晒太阳暖洋洋" }
    ]
}

// console.log(sliderData.imageList[1].imgSrc);
for (var i = 0; i < 5; i++) {
    console.log(sliderData.imageList[i].imgSrc);
}

var ulObj = document.querySelector('#mask>ul');
console.log(ulObj);
var str = '';
for (i in sliderData.imageList) {
    //字符串连接
    str += '<li id="' + sliderData.imageList[i].itemId + '" class="' + sliderData.imageList[i].itemClassName + '">' +
        '<a href="' + sliderData.imageList[i].aHref + '">' +
        '<img src=' + sliderData.imageList[i].imgSrc + ' alt="' + sliderData.imageList[i].imgAlt + '">' +
        '</a>' +
        '<div class="tooltip">' +
        '<h1>' + sliderData.imageList[i].h1Content + '</h1>' +
        '</div></li>'

}
ulObj.innerHTML = str;
// var jsonDemo = {
//     "name": "张三",
//     "age": 18,
//     "leader":{
//         "grade":"校级",
//         "deptment":"宣传部"
//     },
//     "friend":["a","b","c"]
// }
// console.log(jsonDemo);
// console.log(jsonDemo.name);
// console.log(jsonDemo.age)
// console.log(jsonDemo.leader.grade);
// console.log(jsonDemo.friend.pop());

// var book=new Array("book1","book2","book3");
// var pen=[];
// pen[0]="pen1";
// pen.push("pen2");
// pen.push("pen3");
// var price=[12.3,12,55,88];
// console.log(book);
// console.log(pen);
// console.log(price);

// for(var i=0;i<price.length;i++){
//     console.log(price[i]);
// }
// for(x in book){
//     console.log(book[x]);
// }

// console.log(jsonDemo.friend[2]);
// //动态添加轮播图列表区的列表元素
// function addImageList(imageList) {
//     var imageListNode = document.querySelector('#slider ul');
//     console.log(imageListNode);
//     var str = '';
//     //一条li的格式
//     // <li id="first" class="firstanimation">
//     // <a href="#">
//     //     <img src="images/img_1.jpg" alt="Cougar">
//     // </a>
//     // <div class="tooltip">
//     //     <h1>Cougar</h1>
//     // </div>
//     // </li>
//     for (var i in imageList) {
//         str += '<li id="' + imageList[i].itemId + '" class="' + imageList[i].itemClassName + '">' +
//             '<a href="' + imageList[i].aHref + '#">' +
//             '<img src="' + imageList[i].imgSrc + '" alt="' + imageList[i].imgAlt + '">' +
//             '</a>' +
//             ' <div class="tooltip">' +
//             '<h1>' + imageList[i].h1Content + '</h1>' +
//             '</div>' +
//             '</li>';
//     }
//     //追加行内元素
//     imageListNode.innerHTML += str;
// }
// //函数调用
// addImageList(sliderData.imageList);;

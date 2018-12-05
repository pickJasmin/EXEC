// create a variable to store the products 'database' in
//创建一个变量来存储产品“数据库”,存储products.json
var products;

// use XHR to retrieve it, setting the responseType as json, and report any errors
// that occur in the XHR operation. If the respnse is successful, set products to equal
// request.response, then run the initialize() function
//使用XHR检索，将responseType设置为json，并报告错误
//发生在XHR操作中。如果复制成功，则将产品设置为相等
//请求。响应，然后运行initialize()函数
var request = new XMLHttpRequest();
request.open('GET', 'products.json');
request.responseType = 'json';

request.onload = function () {
  if (request.status === 200) {
    products = request.response;
    //调用函数
    initialize();
  } else {
    console.log('Network request for products.json failed with response ' + request.status + ': ' + request.statusText)
  }
};

request.send();

// sets up the app logic, declares required variables, contains all the other functions
//设置app逻辑，声明所需变量，包含所有其他函数
function initialize() {
  // grab the UI elements that we need to manipulate
  //获取我们需要操作的节点
  var category = document.querySelector('#category');
  var searchTerm = document.querySelector('#searchTerm');
  var searchBtn = document.querySelector('button');
  var main = document.querySelector('main');

  // keep a record of what the last category and search term entered were
  //记录下最后一个类别和搜索词是什么
  var lastCategory = category.value;
  // no search has been made yet
  //目前还没有找到
  var lastSearch = '';

  // these contain the results of filtering by category, and search term
  // finalGroup will contain the products that need to be displayed after
  // the searching has been done. Each will be an array containing objects.
  // Each object will represent a product
  //其中包含按类别过滤的结果，以及搜索词
  // finalGroup将包含需要显示的产品
  //搜寻工作已经完成了。每个都是一个包含对象的数组。
  //每个对象代表一个产品
  var categoryGroup;
  var finalGroup;

  // To start with, set finalGroup to equal the entire products database
  // then run updateDisplay(), so ALL products are displayed initially.
  //首先，设置finalGroup等于整个产品数据库
  //然后运行updateDisplay()，以便最初显示所有产品。
  finalGroup = products;
  updateDisplay();

  // Set both to equal an empty array, in time for searches to be run
  //设置两个值等于一个空数组，以便及时执行搜索
  //放分类商品
  categoryGroup = [];
  finalGroup = [];

  // when the search button is clicked, invoke selectCategory() to start
  // a search running to select the category of products we want to display
  //当单击search按钮时，调用selectCategory()启动
  //搜索正在运行，以选择要显示的产品类别
  //为单击按钮做触发事件
  searchBtn.onclick = selectCategory;
  //e为单击事件
  function selectCategory(e) {
    // Use preventDefault() to stop the form submitting — that would ruin
    // the experience
    //使用preventDefault()来阻止表单提交——这样会破坏表单
    //对点击的默认事件进行阻止
    e.preventDefault();

    // Set these back to empty arrays, to clear out the previous search
    //将这些设置为空数组，以清除前面的搜索
    categoryGroup = [];
    finalGroup = [];

    // if the category and search term are the same as they were the last time a
    // search was run, the results will be the same, so there is no point running
    // it again — just return out of the function
    //如果类别和搜索词与上次相同，a
    //搜索被运行了，结果会是一样的，所以没有运行的意义
    //再次-从函数中返回，trim()去掉前后空格
    if (category.value === lastCategory && searchTerm.value.trim() === lastSearch) {
      return;
    } else {
      // update the record of last category and search term
      //更新上一个类别和搜索词的记录
      lastCategory = category.value;
      lastSearch = searchTerm.value.trim();
      // In this case we want to select all products, then filter them by the search
      // term, so we just set categoryGroup to the entire JSON object, then run selectProducts()
      //在这种情况下，我们希望选择所有产品，然后通过搜索过滤它们
      // term，因此我们将categoryGroup设置为整个JSON对象，然后运行selectProducts()
      if (category.value === 'All') {
        categoryGroup = products;
        selectProducts();
        // If a specific category is chosen, we need to filter out the products not in that
        // category, then put the remaining products inside categoryGroup, before running
        // selectProducts()
        //如果选择了特定的类别，我们需要过滤掉不属于该类别的产品
        // category，然后将剩余的产品放入categoryGroup，然后运行
        // selectProducts()
      } else {
        // the values in the <option> elements are uppercase, whereas the categories
        // store in the JSON (under "type") are lowercase. We therefore need to convert
        // to lower case before we do a comparison
        // <option>元素中的值是大写的，而类别是大写的
        //JSON中的存储(在“type”下)是小写的。因此，我们需要转换
        //在进行比较之前，我们先来看看小写字母
        var lowerCaseType = category.value.toLowerCase();
        for (var i = 0; i < products.length; i++) {
          // If a product's type property is the same as the chosen category, we want to
          // dispay it, so we push it onto the categoryGroup array
          //如果产品的type属性与选择的类别相同，我们希望
          //取消它，因此我们将它推送到categoryGroup数组中
          if (products[i].type === lowerCaseType) {
            categoryGroup.push(products[i]);
          }
        }

        // Run selectProducts() after the filtering has bene done
        //过滤完成后，运行selectProducts()
        selectProducts();
      }
    }
  }

  // selectProducts() Takes the group of products selected by selectCategory(), and further
  // filters them by the tnered search term (if one has bene entered)
  // selectProducts()获取由selectCategory()选择的产品组，并进一步
  //用有礼貌的搜索词过滤它们(如果已经输入了)
  function selectProducts() {
    // If no search term has been entered, just make the finalGroup array equal to the categoryGroup
    // array — we don't want to filter the products further — then run updateDisplay().
    //如果没有输入搜索词，就使finalGroup数组等于categoryGroup
    // array—我们不想进一步筛选产品—然后运行updateDisplay()。
    if (searchTerm.value.trim() === '') {
      finalGroup = categoryGroup;
      updateDisplay();
    } else {
      // Make sure the search term is converted to lower case before comparison. We've kept the
      // product names all lower case to keep things simple
      //在进行比较之前，请确保将搜索词转换为小写字母。我们已经保留了
      //为了简单起见，产品名称都要小写
      var lowerCaseSearchTerm = searchTerm.value.trim().toLowerCase();
      // For each product in categoryGroup, see if the search term is contained inside the product name
      // (if the indexOf() result doesn't return -1, it means it is) — if it is, then push the product
      // onto the finalGroup array
      //对于目录组中的每个产品，查看搜索词是否包含在产品名称中
      //(如果indexOf()结果不返回-1，说明它不返回-1)-如果返回-1，则推送产品
      //进入finalGroup数组
      for (var i = 0; i < categoryGroup.length; i++) {
        if (categoryGroup[i].name.indexOf(lowerCaseSearchTerm) !== -1) {
          finalGroup.push(categoryGroup[i]);
        }
      }

      // run updateDisplay() after this second round of filtering has been done
      //在第二轮过滤完成后运行updateDisplay()
      updateDisplay();
    }

  }

  // start the process of updating the display with the new set of products
  //用新的产品集开始更新显示的过程
  function updateDisplay() {
    // remove the previous contents of the <main> element
    //删除<main>元素之前的内容

    while (main.firstChild) {
      //removeChild从子节点列表中删除某个节点
      //把原有的内容清空
      main.removeChild(main.firstChild);
    }
    // main.innerHTML="";

    // if no products match the search term, display a "No results to display" message
    //如果没有产品匹配搜索词，则显示“没有结果显示”消息
    if (finalGroup.length === 0) {
      var para = document.createElement('p');
      para.textContent = 'No results to display!';
      main.appendChild(para);
      // for each product we want to display, pass its product object to fetchBlob()
      //对于要显示的每个产品，将其产品对象传递给fetchBlob()
    } else {
      for (var i = 0; i < finalGroup.length; i++) {
        fetchBlob(finalGroup[i]);
      }
    }
  }

  // fetchBlob uses XHR to retrieve the image for that product, and then sends the
  // resulting image display URL and product object on to showProduct() to finally
  // display it
  // fetchBlob使用XHR检索该产品的图像，然后发送
  //生成的图像显示URL和产品对象，最后显示产品()
  //显示它
  function fetchBlob(product) {
    // construct the URL path to the image file from the product.image property
    //构造从产品到图像文件的URL路径。图像属性
    var url = 'images/' + product.image;
    // Use XHR to fetch the image, as a blob
    // Again, if any errors occur we report them in the console.
    //使用XHR获取图像，作为一个blob
    //同样，如果出现错误，我们将在控制台报告它们。
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.responseType = 'blob';

    request.onload = function () {
      if (request.status === 200) {
        // Convert the blob to an object URL — this is basically an temporary internal URL
        // that points to an object stored inside the browser
        //将blob转换为对象URL——这基本上是一个临时的内部URL
        //指向存储在浏览器中的对象
        var blob = request.response;
        var objectURL = URL.createObjectURL(blob);
        // invoke showProduct
        //调用showProduct
        showProduct(objectURL, product);
      } else {
        console.log('Network request for "' + product.name + '" image failed with response ' + request.status + ': ' + request.statusText);
      }
    };

    request.send();
  }

  // Display a product inside the <main> element
  //在<main>元素中显示产品
  function showProduct(objectURL, product) {
    // create <section>, <h2>, <p>, and <img> elements
    //创建<section>， <h2>， <p>， <img>元素
    var section = document.createElement('section');
    var heading = document.createElement('h2');
    var para = document.createElement('p');
    var image = document.createElement('img');

    // give the <section> a classname equal to the product "type" property so it will display the correct icon
    //给<section>一个类名，这个类名等于product "type"属性，这样它就会显示正确的图标
    section.setAttribute('class', product.type);

    // Give the <h2> textContent equal to the product "name" property, but with the first character
    // replaced with the uppercase version of the first character
    //赋予<h2>文本内容等于产品的“name”属性，但使用第一个字符
    //用第一个字符的大写形式替换
    heading.textContent = product.name.replace(product.name.charAt(0), product.name.charAt(0).toUpperCase());

    // Give the <p> textContent equal to the product "price" property, with a $ sign in front
    // toFixed(2) is used to fix the price at 2 decimal places, so for example 1.40 is displayed
    // as 1.40, not 1.4.
    //赋予<p> textContent等于product "price"属性，前面有$符号to fixed(2)用于将价格固定
    //在小数点后两位，例如1.40显示为1.40，而不是1.4。
    para.textContent = '$' + product.price.toFixed(2);

    // Set the src of the <img> element to the ObjectURL, and the alt to the product "name" property
    //将<img>元素的src设置为ObjectURL，将alt设置为product“name”属性
    image.src = objectURL;
    image.alt = product.name;

    // append the elements to the DOM as appropriate, to add the product to the UI
    //将元素追加到DOM中，以便将产品添加到UI中
    main.appendChild(section);
    section.appendChild(heading);
    section.appendChild(para);
    section.appendChild(image);
  }
}
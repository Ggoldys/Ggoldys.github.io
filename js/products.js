function updCtg(ctg)
{
    var newUrl = "index.html" + '?ctg=' + ctg;
    
    window.location.href = newUrl;
}

function clearBreadcrumbs() {
    var breadcrumbs = document.getElementById('breadcrumbs');

    while (breadcrumbs.firstChild) {
        breadcrumbs.removeChild(breadcrumbs.firstChild);
    }
}

function addBreadcrumbItem(categoryName) {
    var breadcrumbs = document.getElementById('breadcrumbs');
    
    var newItem = document.createElement('li');
    newItem.className = 'breadcrumb-item';

    var newLink = document.createElement('a');
    switch (categoryName) {
        case 'Электроника':
            newLink.onclick= function() {
                updCtg('electr');
            };
            break;
        case 'Смартфоны':
            newLink.onclick= function() {
                updCtg('smartphones');
            };
            break;
        case 'Ноутбуки':
            newLink.onclick= function() {
                updCtg('laptops');
            };
            break;
        case 'Книги':
            newLink.onclick= function() {
                updCtg('books');
            };
            break;
        default:
            newLink.classList.add('disabled')
            break;
    }
    newLink.textContent = categoryName;
    newItem.appendChild(newLink);
    breadcrumbs.appendChild(newItem);
}

var urlParams = new URLSearchParams(window.location.search);
var id = parseInt(urlParams.get('product')) || 1;

var products = smartphones.concat(notebooks).concat(books);
console.log(products)
var product = products.find(cartItem => cartItem.id === id);

var names = document.getElementById('name');
names.textContent = product.title
var price = document.getElementById('price');
price.textContent = "Цена - " + product.discountedPrice + "руб"
var discription = document.getElementById('discription');
discription.textContent = product.discription

var btnProdAdd = document.getElementById('btnProdAdd');
btnProdAdd.onclick = function() {
    addProduct(product);
};

var img = document.getElementById('img1');
img.src = product.imgs[0]
var img = document.getElementById('img2');
img.src = product.imgs[1]
var img = document.getElementById('img3');
img.src = product.imgs[2]

clearBreadcrumbs()

switch (product.ctg) {
    case 'smartphones':
        selectCtg = smartphones;
        bc = ['Электроника', 'Смартфоны']
        break;
    case 'laptops':
        selectCtg = notebooks;
        bc = ['Электроника', 'Ноутбуки']
        break;
    case 'books':
        selectCtg = books;
        bc = ['Книги']
        break;
    default:
        selectCtg = smartphones;
        bc = ['Электроника', 'Смартфоны']
        break;
}
bc.forEach(name => {addBreadcrumbItem(name) })
addBreadcrumbItem(product.title)
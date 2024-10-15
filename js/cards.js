const cardsContainer = document.getElementById('ctgs-container');
const urlParams = new URLSearchParams(window.location.search);
const count = parseInt(urlParams.get('count')) || 5;
const itemsPerPage = count;
let currentPage = 1; 

let selectCtg = []


function openModal(product) {
    document.getElementById('productModalLabel').textContent = product.title;
    document.getElementById('name').textContent = product.title;
    document.getElementById('price').textContent = `Цена - ${product.discountedPrice}руб.`;

    document.getElementById('img1').src = product.imgs[0];
    document.getElementById('img2').src = product.imgs[1];
    document.getElementById('img3').src = product.imgs[2];
  
    document.getElementById('btnProdAdd').onclick = function() {
        addProduct(product);
    };

    var modal = new bootstrap.Modal(document.getElementById('productModal'));
    modal.show();
  }
  
function closeModal() {
    var modal = document.querySelector('.modal');
    if (modal) {
      modal.style.display = 'none'; 
      document.body.removeChild(modal);
    }
  }

function GetCart() {
    var cart = localStorage.getItem('products')
    if (cart === null) {
        cart = []; 
    } else {
        try {
            cart = JSON.parse(cart);
            if (!Array.isArray(cart)) {
                throw new Error("Parsed cart is not an array");
            }
        } catch (error) {
            console.error("Error parsing cart from localStorage:", error);
            cart = []; 
        }
    }
    return cart
}

function getLen(cart)
{
    var col = 0
    cart.forEach(product => {
        col += product.count
    });
    return col
}

function addProduct(product) {
    var cart = GetCart();
    //cart.push(product);

    var existingProduct = cart.find(cartItem => cartItem.title === product.title);

    if (existingProduct) {
        existingProduct.count += 1;
    } else {
        product.count = 1;
        cart.push(product);

    }
    var cartNumElements = document.querySelectorAll('.cart__num');
    var currentNum = getLen(cart);
    cartNumElements.forEach(function (cartNumElement) {
        cartNumElement.innerText = currentNum;
    });
    localStorage.setItem('products', JSON.stringify(cart));
}


function createProductCard(product) {
    var card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
    <div class="card__top">
        <a class="card__image">
        <img src="${product.image}" alt="${product.title}">
        </a>
        <div class="card__label">${product.label}</div>
        <button class="modal-button" onclick='openModal(${JSON.stringify(product)})'>
            🔍
        </button>
    </div>
    <div class="card__bottom">
        <div class="card__prices">
        <div class="card__price card__price--discount">${product.discountedPrice}</div>
        <div class="card__price card__price--common">${product.originalPrice}</div>
        </div>
        <a href="product.html?product=${product.id}" class="card__title">${product.title}</a>
        <button class="card__add" onclick='addProduct(${JSON.stringify(product)})'>В корзину</button>
    </div>
  `;
    return card;
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
            newLink.onclick= function() {
                updCtg('smartphones');
            };
            break;
    }
    newLink.textContent = categoryName;
    newItem.appendChild(newLink);
    breadcrumbs.appendChild(newItem);
}

function renderCards() {
    clearBreadcrumbs()
    cardsContainer.innerHTML = '';

    const ctg = urlParams.get('ctg') || "smartphones";
    switch (ctg) {
        case 'electr':
            selectCtg = smartphones.concat(notebooks);
            bc = ['Электроника']
            break;
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

    const startIndex = (currentPage-1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentItems = selectCtg.slice(startIndex, endIndex);

    currentItems.forEach(product => {
        const productCard = createProductCard(product);
        cardsContainer.appendChild(productCard);
    });

    var cart = GetCart();

    var cartNumElements = document.querySelectorAll('.cart__num');
    var currentNum = parseInt(getLen(cart));
    cartNumElements.forEach(function (cartNumElement) {
        cartNumElement.innerText = currentNum;
    });
}
renderCards()

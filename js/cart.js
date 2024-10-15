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

function createProductCard(product) {
    const card = document.createElement('div');
    card.classList.add('cart_product', 'flex', 'border', 'row', 'mx-0'); 
    card.innerHTML = `
        <div class='col-5'>
            <div class="card__top" style="display: flex; align-items: center;">
                <img src="${product.image}" alt="${product.title}" style="height: 100px; width: auto; margin-right: 10px;">
                <div class="card__label">${product.label}</div>
                <button class="modal-button" onclick='openModal(${JSON.stringify(product)})'>
                    🔍
                </button>
            </div>
            <div class="card__bottom" style="margin-top: 10px;">
                <div class="card__price">${product.discountedPrice}</div>
                <a class="card__title" href="product.html?product=${product.id}">${product.title}</a>          
            </div>
        </div>
        <div class='col-7 row align-items-center justify-items-center'>
            <div class='d-flex justify-content-between align-items-center'>
                <button class="card__pl" onclick='minusProduct(${JSON.stringify(product)})'>-</button>
                <h3 class="text-center">${product.count}шт</h3>
                <button class="card__pl" onclick='addProduct(${JSON.stringify(product)})'>+</button>
            </div>
            <div class='d-flex justify-content-between'>
                <button class="card__del" onclick='delProduct(${JSON.stringify(product)})'>Удалить</button>
            </div>
        </div>
    `;
    return card;
}

function getLen(cart)
{
    var col = 0
    cart.forEach(product => {
        col += product.count
    });
    return col
}

function renderCards(currentItems) {
    cardsContainer.innerHTML = '';

    currentItems.forEach(product => {
        const productCard = createProductCard(product);
        cardsContainer.appendChild(productCard);
    });
}

function drawCart()
{
    var cart = GetCart()
    renderCards(cart)

    var countP = getLen(cart)
    var sumP = 0;

    cart.forEach(product => {
        sumP = sumP + parseInt(product['discountedPrice']) * parseInt(product['count']);
    });

    var countEl = document.getElementById('count');
    var sumEl = document.getElementById('sum');

    countEl.textContent = "Товаров в корзине: " + countP;
    sumEl.textContent = "Итоговая сумма: "+sumP+"руб";


    var cartNumElements = document.querySelectorAll('.cart__num');
    var currentNum = parseInt(countP);
    cartNumElements.forEach(function (cartNumElement) {
        cartNumElement.innerText = currentNum;
    });

    if (countP === 0)
    {
        document.body.style.backgroundImage = "url('img/nullP.jpg')"; 
        document.body.style.backgroundSize = "content"; 
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundRepeat = "no-repeat"; 
    }

}

function addProduct(product) {
    var cart = GetCart();
    //cart.push(product);

    var existingProduct = cart.find(cartItem => cartItem.id === product.id);

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
    drawCart()
}

function minusProduct(product) {
    var cart = GetCart();
    //cart.push(product);

    var existingProduct = cart.find(cartItem => cartItem.id === product.id);

    if (existingProduct) {
        existingProduct.count -= 1;
        if (existingProduct.count>0)
            {
                var cartNumElements = document.querySelectorAll('.cart__num');
                var currentNum = getLen(cart);
                cartNumElements.forEach(function (cartNumElement) {
                    cartNumElement.innerText = currentNum;
                });
                localStorage.setItem('products', JSON.stringify(cart));
                drawCart()
            }
            else
            {
                delProduct(product)
            }
    } else {
        return
    }
}

function delProduct(product) {
    var cart = GetCart();

    var productIndex = cart.findIndex(cartItem => cartItem.id === product.id);

    if (productIndex !== -1) {
        cart.splice(productIndex, 1);
    }

    var cartNumElements = document.querySelectorAll('.cart__num');
    var currentNum = getLen(cart);
    cartNumElements.forEach(function (cartNumElement) {
        cartNumElement.innerText = currentNum;
    });
    localStorage.setItem('products', JSON.stringify(cart));
    drawCart()
}

function clearCart(){
    var cart = GetCart()
    localStorage.removeItem("products")
    drawCart()

    if (cart.length>0)
    {
        localStorage.removeItem("products")
        drawCart()

        const messageBox = document.createElement('div');
        messageBox.style.position = 'fixed';
        messageBox.style.top = '25%';
        messageBox.style.left = '50%';
        messageBox.style.transform = 'translate(-50%, -50%)';
        messageBox.style.padding = '20px';
        messageBox.style.backgroundColor = '#4CAF50';
        messageBox.style.color = 'white';
        messageBox.style.borderRadius = '5px';
        messageBox.style.zIndex = '1000';
        messageBox.innerText = 'Заказ успешно оформлен';

        document.body.appendChild(messageBox);

        setTimeout(() => {
        document.body.removeChild(messageBox);
        }, 3000);

    }
    else
    {
        const messageBox = document.createElement('div');
        messageBox.style.position = 'fixed';
        messageBox.style.top = '25%';
        messageBox.style.left = '50%';
        messageBox.style.transform = 'translate(-50%, -50%)';
        messageBox.style.padding = '20px';
        messageBox.style.backgroundColor = '#ff0000';
        messageBox.style.color = 'white';
        messageBox.style.borderRadius = '5px';
        messageBox.style.zIndex = '1000';
        messageBox.innerText = 'Корзина пуста';

        document.body.appendChild(messageBox);

        setTimeout(() => {
        document.body.removeChild(messageBox);
        }, 3000);
    }
}
var cardsContainer = document.getElementById('cart-container');
drawCart()
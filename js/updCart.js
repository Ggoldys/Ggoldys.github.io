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

function upd()
{
    var cart = GetCart();

    var cartNumElements = document.querySelectorAll('.cart__num');
    var currentNum = getLen(cart);
    cartNumElements.forEach(function (cartNumElement) {
        cartNumElement.innerText = currentNum;
    });
}

upd()
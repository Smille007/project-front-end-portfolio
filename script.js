
//api

const key = '87c46bff-65a1-4287-a7ec-b9a0d580a786';
const url = `https://holidayapi.com/v1/holidays?key=${key}&country=US&year=2022`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    displayHolidays(data);
  })
  .catch(error => {
    console.error(error);
  });

function displayHolidays(data) {
  const holidaysContainer = document.getElementById('holidays-container');
  const holidays = data.holidays;

  if (holidays.length === 0) {
    holidaysContainer.textContent = 'No holidays found for the specified year and country.';
    return;
  }

  const holidayList = document.createElement('ul');

  for (const holiday of holidays) {
    const holidayItem = document.createElement('li');
    holidayItem.textContent = `${holiday.date} - ${holiday.name}`;
    holidayList.appendChild(holidayItem);
  }

  holidaysContainer.appendChild(holidayList);
}


//cart

let cartIcon = document.querySelector(`#cart-icon`);
let cart = document.querySelector(`.cart`);
let closeCart = document.querySelector('#close-cart');

//open cart
cartIcon.onclick=()=>{
    cart.classList.add("active");
};
//close cart
closeCart.onclick=()=>{
    cart.classList.remove("active")
};

//cart working JS
if(document.readyState=='loading') {
 document.addEventListener('DOMContentLoaded',ready)   
}else{
ready();
}


function ready(){
//Remove items from cart
let removeCartButtons = document.getElementsByClassName('cart-remove')
for(let i=0; i<removeCartButtons.length;i++){
    let button = removeCartButtons[i]
    button.addEventListener('click', removeCartItem)
}

//Quantity changes
let quantityInputs = document.getElementsByClassName('cart-quantity')
for(let i=0; i<quantityInputs.length;i++){
let input = quantityInputs[i]
input.addEventListener('change', quantityChanged)
}
//Add to cart
let addCart = document.getElementsByClassName('add-cart')
for(let i=0; i<addCart.length;i++){
    let button = addCart[i];
    button.addEventListener('click',addCartClicked)
}
}
//Buy Button working
document
.getElementsByClassName('btn-buy')[0]
.addEventListener('click', buyButtonClicked)
//Buy Button
function buyButtonClicked(){
    alert('Your order is placed')
    let cartContent = document.getElementsByClassName('cart-content')[0]
    while(cartContent.hasChildNodes()){
    cartContent.removeChild(cartContent.firstChild)
}
updateTotal()
}

//Remove items from cart
function removeCartItem(event){
    let buttonClicked=event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}
//Quantity changes
function quantityChanged(event){
    let input = event.target
    if(isNaN(input.value)|| input.value<=0){
input.value = 1
    }
    updateTotal();
}
//Add to cart
function addCartClicked(event){
    let button = event.target;
    let shopProducts = button.parentElement;
    let title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    let price = shopProducts.getElementsByClassName('price')[0].innerText;
    let productImg = shopProducts.querySelector('img').src;
    addProductToCart(title, price, productImg);
    updateTotal()
}
function addProductToCart(title, price, productImg) {
    let cartItems = document.getElementsByClassName('cart-content')[0];
    let cartItemsNames = cartItems.getElementsByClassName('cart-product-title');

    // Check if the product is already in the cart
    for (let i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText === title) {
            alert('You have already added this item to the cart');
            return; // Return early if the product is already in the cart
        }
    }

    // If the product is not in the cart, create a new cart item
    let cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');

    // Build the cart item content
    cartShopBox.innerHTML = `
        <img src="${productImg}" style="width: 100px; height: auto;" />
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <i class="bx bxs-trash-alt cart-remove"></i>
    `;

    // Add the cart item to the cart
    cartItems.appendChild(cartShopBox);

    // Add event listeners for the new cart item (if needed)
    cartShopBox.querySelector('.cart-remove').addEventListener('click', removeCartItem);
    cartShopBox.querySelector('.cart-quantity').addEventListener('change', quantityChanged);

    // Update the total price after adding the new item to the cart
    updateTotal();
}


//Update total
function updateTotal(){
    let cartContent = document.querySelector('.cart-content');
    if (!cartContent) return; // Return early if cartContent is not found

    let cartBoxes = cartContent.getElementsByClassName('cart-box');
    let total = 0;
    for (let i = 0; i < cartBoxes.length; i++) {
        let cartBox = cartBoxes[i];
        let priceElement = cartBox.querySelector('.cart-price'); 
        let quantityElement = cartBox.querySelector('.cart-quantity'); 
        if (!priceElement || !quantityElement) continue; // skips if non existing
        let price = parseFloat(priceElement.innerText.replace('$', ""));
        let quantity = quantityElement.value;
        total = total + price * quantity;
    }
    let totalPriceElement = document.querySelector('.total-price');
    if (totalPriceElement) {
        totalPriceElement.innerText = "$" + total.toFixed(2);
    }
}
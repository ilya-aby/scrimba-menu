import { menu } from './menu.js';
import { Order } from './order.js';

const orderInstance = new Order(menu);

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('menu-item-add')) {
    const index = e.target.dataset.index;
    orderInstance.order[index].quantity++;
    renderOrder(orderInstance);
  }
  if (e.target.classList.contains('order-item-remove')) {
    const index = e.target.dataset.index;
    orderInstance.order[index].quantity--;
    renderOrder(orderInstance);
  }
  if (e.target.classList.contains('order-complete-button')) {
    showPaymentModal();
  }
});

function renderMenu(menu) {
  const menuContainer = document.querySelector('.menu');
  const menuHtml = menu.map((item, index) => {
    return `
    <div class="menu-item">
      <p class="menu-emoji">${item.emoji}</p>
      <div class="menu-item-details">
        <p class="menu-item-name">${item.itemName}</p>
        <p class="menu-item-ingredients">${item.ingredients.join(', ')}</p>
        <p class="menu-item-price">$${item.price}</p>
      </div>
      <button class="menu-item-add" data-index="${item.id}">＋</button>
    </div>
    `
  }).join('');
  menuContainer.innerHTML = menuHtml;
}

function renderOrder(orderInstance) {
  const orderContainer = document.querySelector('.order');

  // If no items in order, clear the order container
  if (Object.values(orderInstance.order).every(item => item.quantity === 0)) {
    orderContainer.innerHTML = '';
    return;
  }

  const orderHeaderHtml = `
  <p class="order-title">Your Order</p>
  `;

  const orderHtml = Object.values(orderInstance.order).map(item => {
    return item.quantity === 0 ? '' :
      `
      <div class="order-item">
        <p class="order-item-name">${item.quantity}x ${item.itemName}</p>
        <button class="order-item-remove" data-index="${item.id}">remove</button>
        <p class="order-item-price">$${item.itemTotalPrice}</p>
      </div>
      `
  }).join('');

  const orderFooterHtml = `
  <div class="order-total">
    <p class="order-total-label">Total price:</p>
    <p class="order-total-price">$${orderInstance.totalPrice}</p>
  </div>
  <button class="order-complete-button">Complete order</button>

  `;

  orderContainer.innerHTML = orderHeaderHtml + orderHtml + orderFooterHtml;
}

function showPaymentModal() {
  const paymentModal = document.createElement('div');
  paymentModal.classList.add('payment-modal');
  paymentModal.innerHTML = `
  <div class="payment-modal-content">
    <p class="payment-modal-title">Enter card details</p>
    <form class="payment-modal-form">
      <input type="text" id="name" name="name" placeholder="Enter your name" required>
      <input type="number" id="card-number" name="card-number" placeholder="Enter card number" required>
      <input type="number" id="cvv" name="cvv" placeholder="Enter CVV" required>
			<button class="payment-modal-button" type="submit">Pay</button>
    </form>
  `;
  document.body.appendChild(paymentModal);
  paymentModal.addEventListener('submit', function(e){
    e.preventDefault()
    console.log('Payment modal submitted');
    document.body.removeChild(paymentModal);

    // Reset the order on successful payment
    orderInstance.resetQuantities();
    renderOrder(orderInstance);

    showConfirmationMessage();
  })
}

function showConfirmationMessage() {
  const confirmationMessage = document.querySelector('.confirmation-message');
  confirmationMessage.style.display = 'block';
  setTimeout(() => {
    confirmationMessage.style.display = 'none';
  }, 5000); // Hide the message after 3 seconds
}

renderMenu(menu);
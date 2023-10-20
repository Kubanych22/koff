import {addContainer} from '../addContainer';
import {ApiService} from '../../services/ApiService.js';

export class Order {
  static instance = null;
  
  
  constructor() {
    if (!Order.instance) {
      Order.instance = this;
      this.element = document.createElement('section');
      this.element.classList.add('order');
      this.containerElement = addContainer(this.element, 'order__container');
      this.isMounted = false;
    }
    
    return Order.instance;
  }
  
  mount(parent, data, title) {
    this.containerElement.textContent = '';
    
    const titleElem = document.createElement('h2');
    
    titleElem.textContent = title ? title : 'Список товаров';
    
    titleElem.className = title
      ? 'order__title'
      : 'order__title visually-hidden';
    
    this.containerElement.append(titleElem);
    this.formData = data;
    
    this.getHTML();
    // this.containerElement.innerHTML = this.getHTML();
    
    if (this.isMounted) {
      return;
    }
    
    parent.append(this.element);
    
    this.isMounted = true;
  }
  
  unmount() {
    this.element.remove();
    this.isMounted = false;
  }
  
  async getHTML() {
    const data = this.formData[0];
    const orderInfo = document.createElement('div');
    orderInfo.classList.add('order__info');
    
    const orderSuccessfully = document.createElement('div');
    orderSuccessfully.classList.add('order__successfully');
    const orderTitle = document.createElement('h2');
    orderTitle.classList.add('order__title');
    orderTitle.textContent = 'Заказ успешно размещен';
    const orderAmount = document.createElement('p');
    orderAmount.classList.add('order__amount');
    orderAmount.innerHTML = `${data.totalPrice}&nbsp; ₽`;
    
    orderSuccessfully.append(orderTitle, orderAmount);
    
    const orderNumber = document.createElement('p');
    orderNumber.classList.add('order__number');
    orderNumber.textContent = `№${data.id}`;
    
    const orderInfoTitle = document.createElement('h3');
    orderInfoTitle.classList.add('order__info-title');
    orderInfoTitle.textContent = 'Данные доставки';
    
    const orderTable = document.createElement('table');
    orderTable.classList.add('order__info-table', 'table');
    
    const tableRowRecipient = document.createElement('tr');
    tableRowRecipient.classList.add('table__row');
    
    const tableFieldRecipient = document.createElement('td');
    tableFieldRecipient.classList.add('table__field');
    tableFieldRecipient.textContent = 'Получатель';
    
    const tableValueRecipient = document.createElement('td');
    tableValueRecipient.classList.add('table__value');
    tableValueRecipient.textContent = `${data.name}`;
    
    tableRowRecipient.append(tableFieldRecipient, tableValueRecipient);
    
    const tableRowPhone = document.createElement('tr');
    tableRowPhone.classList.add('table__row');
    
    const tableFieldPhone = document.createElement('td');
    tableFieldPhone.classList.add('table__field');
    tableFieldPhone.textContent = 'Телефон';
    
    const tableValuePhone = document.createElement('td');
    tableValuePhone.classList.add('table__value');
    tableValuePhone.textContent = `${data.phone}`;
    
    tableRowPhone.append(tableFieldPhone, tableValuePhone);
    
    const tableRowEmail = document.createElement('tr');
    tableRowEmail.classList.add('table__row');
    
    const tableFieldEmail = document.createElement('td');
    tableFieldEmail.classList.add('table__field');
    tableFieldEmail.textContent = 'E-mail';
    
    const tableValueEmail = document.createElement('td');
    tableValueEmail.classList.add('table__value');
    tableValueEmail.textContent = `${data.email}`;
    
    tableRowEmail.append(tableFieldEmail, tableValueEmail);
    
    const tableRowAddress = document.createElement('tr');
    tableRowAddress.classList.add('table__row');
    
    const tableFieldAddress = document.createElement('td');
    tableFieldAddress.classList.add('table__field');
    tableFieldAddress.textContent = 'Адрес доставки';
    
    const tableValueAddress = document.createElement('td');
    tableValueAddress.classList.add('table__value');
    tableValueAddress.textContent = `${data.address}`;
    
    tableRowAddress.append(tableFieldAddress, tableValueAddress);
    
    const tableRowDeliveryType = document.createElement('tr');
    tableRowDeliveryType.classList.add('table__row');
    
    const tableFieldDeliveryType = document.createElement('td');
    tableFieldDeliveryType.classList.add('table__field');
    tableFieldDeliveryType.textContent = 'Способ оплаты';
    
    const tableValueDeliveryType = document.createElement('td');
    tableValueDeliveryType.classList.add('table__value');
    if (data.paymentType === 'cash') {
      tableValueDeliveryType.textContent = 'Наличными при получении';
    } else {
      tableValueDeliveryType.textContent = 'Картой при получении';
    }
    
    tableRowDeliveryType.append(tableFieldDeliveryType, tableValueDeliveryType);
    
    const tableRowPaymentType = document.createElement('tr');
    tableRowPaymentType.classList.add('table__row');
    
    const tableFieldPaymentType = document.createElement('td');
    tableFieldPaymentType.classList.add('table__field');
    tableFieldPaymentType.textContent = 'Способ получения';
    
    const tableValuePaymentType = document.createElement('td');
    tableValuePaymentType.classList.add('table__value');
    
    if (data.deliveryType === 'delivery') {
      tableValuePaymentType.textContent = 'Доставка';
    } else {
      tableValuePaymentType.textContent = 'Самовывоз';
    }
    
    tableRowPaymentType.append(tableFieldPaymentType, tableValuePaymentType);
    
    orderTable.append(
      tableRowRecipient,
      tableRowPhone,
      tableRowEmail,
      tableRowAddress,
      tableRowDeliveryType,
      tableRowPaymentType,
    );
    
    orderInfo.append(
      orderSuccessfully,
      orderNumber,
      orderInfoTitle,
      orderTable,
    );
    
    this.containerElement.append(
      orderInfo,
    );
  }
  // getHTML() {
  //   return `
  //     <div class="container order__container">
  //       <div class="order__info">
  //       <div class="order__successfully">
  //         <h2 class="order__title">Заказ успешно размещен</h2>
  //         <p class="order__amount">20&nbsp;000&nbsp;₽</p>
  //       </div>
  //       <p class="order__number">№43435</p>
  //       <h3 class="order__info-title">Данные доставки</h3>
  //       <table class="order__info-table table">
  //         <tr class="table__row">
  //           <td class="table__field">Получатель</td>
  //           <td class="table__value">Иванов Петр Александрович</td>
  //         </tr>
  //         <tr class="table__row">
  //           <td class="table__field">Телефон</td>
  //           <td class="table__value">+7 (737) 346 23 00</td>
  //         </tr>
  //         <tr class="table__row">
  //           <td class="table__field">E-mail</td>
  //           <td class="table__value">Ivanov84@gmail.com</td>
  //         </tr>
  //         <tr class="table__row">
  //           <td class="table__field">Адрес доставки</td>
  //           <td class="table__value">Москва, ул. Ленина, 21, кв. 33</td>
  //         </tr>
  //         <tr class="table__row">
  //           <td class="table__field">Способ оплаты</td>
  //           <td class="table__value">Картой при получении</td>
  //         </tr>
  //         <tr class="table__row">
  //           <td class="table__field">Способ получения</td>
  //           <td class="table__value">Доставка</td>
  //         </tr>
  //       </table>
  //     </div>
  //       <a class="order__btn" href="/order">На главную</a>
  //     </div>
  //   `;
  // }
}

import {addContainer} from '../addContainer';

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
  
  mount(parent, title) {
    this.containerElement.textContent = '';
    
    const titleElem = document.createElement('h2');
    
    titleElem.textContent = title ? title : 'Список товаров';
    
    titleElem.className = title
      ? 'order__title'
      : 'order__title visually-hidden';
    
    this.containerElement.append(titleElem);
    
    this.containerElement.innerHTML = this.getHTML();
    
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
  
  getHTML() {
    return `
      <div class="container order__container">
        <div class="order__info">
        <div class="order__successfully">
          <h2 class="order__title">Заказ успешно размещен</h2>
          <p class="order__amount">20&nbsp;000&nbsp;₽</p>
        </div>
        <p class="order__number">№43435</p>
        <h3 class="order__info-title">Данные доставки</h3>
        <table class="order__info-table table">
          <tr class="table__row">
            <td class="table__field">Получатель</td>
            <td class="table__value">Иванов Петр Александрович</td>
          </tr>
          <tr class="table__row">
            <td class="table__field">Телефон</td>
            <td class="table__value">+7 (737) 346 23 00</td>
          </tr>
          <tr class="table__row">
            <td class="table__field">E-mail</td>
            <td class="table__value">Ivanov84@gmail.com</td>
          </tr>
          <tr class="table__row">
            <td class="table__field">Адрес доставки</td>
            <td class="table__value">Москва, ул. Ленина, 21, кв. 33</td>
          </tr>
          <tr class="table__row">
            <td class="table__field">Способ оплаты</td>
            <td class="table__value">Картой при получении</td>
          </tr>
          <tr class="table__row">
            <td class="table__field">Способ получения</td>
            <td class="table__value">Доставка</td>
          </tr>
        </table>
      </div>
        <a class="order__btn" href="/order">На главную</a>
      </div>
    `;
  }
}

import {API_URL} from '../../const';
import {CartButton} from '../CartButton/CartButton';
import {LikeButton} from '../LikeButton/LikeButton';

export class Card {
  constructor({id, image, title, price}) {
    this.id = id;
    this.image = image;
    this.title = title;
    this.price = price;
    this.cartButton = new CartButton('card__btn', 'В корзину');
    this.likeButton = new LikeButton('card__favorite');
  }
  
  create() {
    const article = document.createElement('article');
    article.classList.add('goods__card', 'card');
    const link = document.createElement('a');
    link.classList.add('card__link', 'card__link_img');
    link.href = `/product/${this.id}`;
    const img = document.createElement('img');
    img.classList.add('card__img');
    img.src = `${API_URL}${this.image}`;
    img.alt = this.title;
    link.append(img);
    article.append(link);
    
    const info = document.createElement('div');
    info.classList.add('card__info');
    const title = document.createElement('h3');
    title.classList.add('card__title');
    const linkTitle = document.createElement('a');
    linkTitle.classList.add('card__link');
    linkTitle.href = `/product/${this.id}`;
    linkTitle.textContent = this.title;
    title.append(linkTitle);
    const price = document.createElement('p');
    price.classList.add('card__price');
    price.innerHTML = `${this.price.toLocaleString()}&nbsp;₽`;
    info.append(title, price);
    
    const btnCart = this.cartButton.create(this.id);
    const btnFavorite = this.likeButton.create(this.id);
    
    article.append(link, info, btnCart, btnFavorite);
    return article;
  }
}
/*        <button class="card__btn" type="button" data-id="${id}">В корзину</button>
        <button class="card__favorite" type="button" data-id="${id}">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
            <path
              d="M8.41325 13.8733C8.18658 13.9533 7.81325 13.9533 7.58659 13.8733C5.65325 13.2133 1.33325 10.46 1.33325 5.79332C1.33325 3.73332 2.99325 2.06665 5.03992 2.06665C6.25325 2.06665 7.32658 2.65332 7.99992 3.55998C8.67325 2.65332 9.75325 2.06665 10.9599 2.06665C13.0066 2.06665 14.6666 3.73332 14.6666 5.79332C14.6666 10.46 10.3466 13.2133 8.41325 13.8733Z"
              stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </article>*/

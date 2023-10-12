import 'normalize.css';
import './style.scss';
import Navigo from 'navigo';
import {Header} from './modules/Header/Header';
import {Main} from './modules/Main/Main';
import {Footer} from './modules/Footer/Footer';
import {Order} from './modules/Order/Order';
import {ProductList} from './modules/ProductList/ProductList';
import {ApiService} from './services/ApiService';
import {Catalog} from './modules/Catalog/Catalog';

const productSlider = () => {
  Promise.all([
    import('swiper/modules'),
    import('swiper'),
    import('swiper/css'),
  ]).then(([{Navigation, Thumbs}, Swiper]) => {
    const swiperThumbnails = new Swiper.default('.product__slider-thumbnails', {
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
    });
    
    new Swiper.default('.product__slider-main', {
      spaceBetween: 10,
      navigation: {
        nextEl: '.product__arrow_next',
        prevEl: '.product__arrow_prev',
      },
      modules: [Navigation, Thumbs],
      thumbs: {
        swiper: swiperThumbnails,
      },
    });
  });
};

// const init = async () => {
const init = () => {
  const api = new ApiService();
  const router = new Navigo('/', {linksSelector: 'a[href^="/"]'});
  
  // api.getAccessKey().then();
  
  new Header().mount();
  
  new Main().mount();
  
  new Footer().mount();
  
  // await api.getProductCategories().then(data => {
    api.getProductCategories().then(data => {
    new Catalog().mount(new Main().element, data);
    router.updatePageLinks();
  });
  
  productSlider();
  
  router
    .on('/',
      async () => {
        const product = await api.getProducts();
        new ProductList().mount(new Main().element, product);
        router.updatePageLinks();
      },
      {
        leave(done) {
          new ProductList().unmoumt();
          done();
        },
        already() {
          console.log('already');
        },
      },
    )
    
    .on('/category',
      async ({params: {slug}}) => {
        const product = await api.getProducts();
        new ProductList().mount(new Main().element, product, slug);
        router.updatePageLinks();
      },
      {
        leave(done) {
          new ProductList().unmoumt();
          done();
        },
      },
    )
    
    .on('/favorite',
      async () => {
        const product = await api.getProducts();
        new ProductList().mount(new Main().element, product, 'Избранное');
        router.updatePageLinks();
      },
      {
        leave(done) {
          new ProductList().unmoumt();
          done();
        },
      },
    )
    
    .on('/search', () => {
        console.log('search');
      },
    )
    
    .on('/product/:id', (obj) => {
        console.log('obj: ', obj);
      },
    )
    
    .on('/cart', () => {
        console.log('cart');
      },
    )
    
    .on('/order', () => {
        new Order().mount(new Main().element);
        router.updatePageLinks();
      },
      {
        leave(done) {
          new Order().unmoumt();
          done();
        },
      },
    )
    
    .notFound(
      () => {
        new Main().element.innerHTML = `
        <h2 class="temp">Страница не найдена</h2>
        <p class="temp">Через 5 секунд Вы будете перенаправлены <a href="/">на главную страницу</a></p>
      `;
        
        setTimeout(() => {
          router.navigate('/');
        }, 3000);
      },
      {
        leave(done) {
          const pageNotFound = new Main().element.querySelectorAll('.temp');
          for (let elem of pageNotFound) {
            console.log('elem:', elem);
            elem.remove();
          }
          done();
        },
      },
    );
  
  router.resolve();
};

// init().then();
init();

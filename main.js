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
import {FavoriteService} from './services/StorageService';
import {Pagination} from './features/Pagination/Pagination';
import {BreadCrumbs} from './features/BreadCrumbs/BreadCrumbs';
import {ProductCard} from './modules/ProductCard/ProductCard';
import {productSlider} from './features/productSlider/productSlider.js';

export const router = new Navigo('/', {linksSelector: 'a[href^="/"]'});

const init = () => {
  const api = new ApiService();
  
  new Header().mount();
  
  new Main().mount();
  
  new Footer().mount();
  
  router
      .on('/',
          async () => {
            await new Catalog().mount(new Main().element);
            const products = await api.getProducts();
            new ProductList().mount(new Main().element, products);
            router.updatePageLinks();
          },
          {
            leave(done) {
              new ProductList().unmount();
              new Catalog().unmount();
              done();
            },
            already(match) {
              match.route.handler(match);
            },
          },
      )
      
      .on('/category',
          async ({params: {slug, page = 1}}) => {
            await new Catalog().mount(new Main().element);
            const {data: products, pagination} = await api.getProducts({
              category: slug,
              page: page,
            });
            new BreadCrumbs().mount(new Catalog().element, [{text: slug}]);
            new ProductList().mount(new Main().element, products, slug);
            new Pagination()
                .mount(new ProductList().containerElement)
                .update(pagination);
            router.updatePageLinks();
          },
          {
            leave(done) {
              new BreadCrumbs().unmount();
              new ProductList().unmount();
              new Catalog().unmount();
              done();
            },
          },
      )
      
      .on('/favorite',
          async ({params}) => {
            new BreadCrumbs().mount(new Catalog().element, [{text: 'Избранное'}]);
            await new Catalog().mount(new Main().element);
            const favorite = new FavoriteService().get();
            const {data: products, pagination} = await api.getProducts({
              list: favorite.join(','),
              page: params?.page || 1,
            });
            new ProductList().mount(new Main().element, products, 'Избранное',
                'Вы ничего не добавили в избранное, пожалуйста добавьте какой-нибудь товар');
            new Pagination().mount(new ProductList().containerElement).update(pagination);
            router.updatePageLinks();
          },
          {
            leave(done) {
              new BreadCrumbs().unmount();
              new ProductList().unmount();
              new Catalog().unmount();
              done();
            },
            already(match) {
              match.route.handler(match);
            }
          },
      )
      
      .on('/search', () => {
            console.log('search');
          },
      )
      
      .on('/product/:id', async (obj) => {
            await new Catalog().mount(new Main().element);
            const data = await api.getProductById(obj.data.id);
            // new ProductCard().mount(new Main().element, data);
            new BreadCrumbs().mount(new Main().element, [
              {
                text: data.category,
                href: `/category?slug=${data.category}`,
              },
              {
                text: data.name,
              }
            ]);
            new ProductCard().mount(new Main().element, data);
            productSlider();
          },
          {
            leave(done) {
              new Catalog().unmount();
              new BreadCrumbs().unmount();
              new ProductCard().unmount();
              done();
            }
          }
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
              new Order().unmount();
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

init();

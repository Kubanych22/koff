export class Pagination {
  static instance = null;
  
  constructor() {
    if (!Pagination.instance) {
      Pagination.instance = this;
      this.pagination = this.createPagination();
    }
    return Pagination.instance;
  }
  
  update({currentPage, totalPages, totalProducts, limit}) {
    const width = currentPage * limit;
    this.paginationBar.style.setProperty(
      '--width',
      `calc((${width < totalProducts ? width : totalProducts} / ${totalProducts}) * 100%)`
    );
    this.paginationCurrent.textContent = totalProducts === limit ? totalProducts : width < totalProducts ? width :
      (width - limit + totalProducts % limit).toString();
    this.paginationTotal.textContent = totalProducts;
    
    const urlLeft = new URL(window.location.href);
    if (currentPage !== 1) {
      urlLeft.searchParams.set('page', (currentPage - 1).toString());
      this.paginationLeft.href = urlLeft.pathname + urlLeft.search;
    } else {
      this.paginationLeft.removeAttribute('href');
    }
    
    const urlRight = new URL(window.location.href);
    if (currentPage !== totalPages) {
      urlRight.searchParams.set('page', currentPage + 1);
      this.paginationRight.href = urlRight.pathname + urlRight.search;
    } else {
      this.paginationRight.removeAttribute('href');
    }
      return this;
  }
  
  createPagination() {
    const pagination = document.createElement('div');
    pagination.classList.add('pagination');
    
    this.paginationBar = document.createElement('div');
    this.paginationBar.classList.add('pagination__bar');
    const paginationArrows = document.createElement('div');
    paginationArrows.classList.add('pagination__arrows');
    
    this.paginationLeft = document.createElement('a');
    this.paginationLeft.classList.add('pagination__left');
    this.paginationLeft.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
        <path d="M1.86395 7.0001L7.52528 1.1821C7.5719 1.13522 7.60874 1.07955 7.6337 1.01833C7.65866 0.957109 7.67122 0.891546 7.67068 0.825436C7.67013 0.759326 7.65647 0.693981 7.6305 0.633183C7.60453 0.572385 7.56676 0.517341 7.51938 0.471236C7.472 0.425131 7.41594 0.388881 7.35445 0.364583C7.29297 0.340285 7.22727 0.328422 7.16117 0.32968C7.09507 0.330939 7.02988 0.345294 6.96936 0.371914C6.90885 0.398535 6.85421 0.436893 6.80862 0.484768L0.808619 6.65143C0.717804 6.74478 0.666992 6.86987 0.666992 7.0001C0.666992 7.13033 0.717804 7.25542 0.808619 7.34877L6.80862 13.5154C6.85421 13.5633 6.90885 13.6017 6.96936 13.6283C7.02988 13.6549 7.09507 13.6693 7.16117 13.6705C7.22727 13.6718 7.29297 13.6599 7.35445 13.6356C7.41594 13.6113 7.472 13.5751 7.51938 13.529C7.56676 13.4829 7.60453 13.4278 7.6305 13.367C7.65647 13.3062 7.67013 13.2409 7.67068 13.1748C7.67122 13.1087 7.65866 13.0431 7.6337 12.9819C7.60874 12.9207 7.5719 12.865 7.52528 12.8181L1.86395 7.0001Z" fill="#1C1C1C"/>
      </svg>
    `;
    
    this.paginationRight = document.createElement('a');
    this.paginationRight.classList.add('pagination__right');
    this.paginationRight.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M13.136 8.0001L7.47472 2.1821C7.4281 2.13522 7.39126 2.07955 7.3663 2.01833C7.34134 1.95711 7.32878 1.89155 7.32932 1.82544C7.32987 1.75933 7.34353 1.69398 7.3695 1.63318C7.39547 1.57239 7.43324 1.51734 7.48062 1.47124C7.528 1.42513 7.58406 1.38888 7.64555 1.36458C7.70703 1.34028 7.77273 1.32842 7.83883 1.32968C7.90493 1.33094 7.97012 1.34529 8.03064 1.37191C8.09115 1.39854 8.14579 1.43689 8.19138 1.48477L14.1914 7.65143C14.2822 7.74478 14.333 7.86987 14.333 8.0001C14.333 8.13033 14.2822 8.25542 14.1914 8.34877L8.19138 14.5154C8.14579 14.5633 8.09115 14.6017 8.03064 14.6283C7.97012 14.6549 7.90493 14.6693 7.83883 14.6705C7.77273 14.6718 7.70703 14.6599 7.64555 14.6356C7.58406 14.6113 7.528 14.5751 7.48062 14.529C7.43324 14.4829 7.39547 14.4278 7.3695 14.367C7.34353 14.3062 7.32987 14.2409 7.32932 14.1748C7.32878 14.1087 7.34134 14.0431 7.3663 13.9819C7.39126 13.9207 7.4281 13.865 7.47472 13.8181L13.136 8.0001Z" fill="#1C1C1C"/>
    </svg>
    `;
    
    const paginationInfo = document.createElement('p');
    paginationInfo.classList.add('pagination__info');
    
    this.paginationCurrent = document.createElement('span');
    this.paginationCurrent.classList.add('pagination__current');
    
    const paginationSeparator = document.createTextNode('из');
    
    this.paginationTotal = document.createElement('span');
    this.paginationTotal.classList.add('pagination__total');
    
    paginationInfo.append(this.paginationCurrent, paginationSeparator, this.paginationTotal);
    
    paginationArrows.append(this.paginationLeft, paginationInfo, this.paginationRight);
    
    pagination.append(this.paginationBar, paginationArrows);
    
    return pagination;
  }
  
  mount(parent) {
    parent.append(this.pagination);
    return this;
  }
}

/*
<div class="pagination">
  <div class="pagination__bar" style="&#45;&#45;width: calc((12 / 31) * 100%)"></div>
  <div class="pagination__arrows">
    <button class="pagination__left">
      <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
        <path d="M1.86395 7.0001L7.52528 1.1821C7.5719 1.13522 7.60874 1.07955 7.6337 1.01833C7.65866 0.957109 7.67122 0.891546 7.67068 0.825436C7.67013 0.759326 7.65647 0.693981 7.6305 0.633183C7.60453 0.572385 7.56676 0.517341 7.51938 0.471236C7.472 0.425131 7.41594 0.388881 7.35445 0.364583C7.29297 0.340285 7.22727 0.328422 7.16117 0.32968C7.09507 0.330939 7.02988 0.345294 6.96936 0.371914C6.90885 0.398535 6.85421 0.436893 6.80862 0.484768L0.808619 6.65143C0.717804 6.74478 0.666992 6.86987 0.666992 7.0001C0.666992 7.13033 0.717804 7.25542 0.808619 7.34877L6.80862 13.5154C6.85421 13.5633 6.90885 13.6017 6.96936 13.6283C7.02988 13.6549 7.09507 13.6693 7.16117 13.6705C7.22727 13.6718 7.29297 13.6599 7.35445 13.6356C7.41594 13.6113 7.472 13.5751 7.51938 13.529C7.56676 13.4829 7.60453 13.4278 7.6305 13.367C7.65647 13.3062 7.67013 13.2409 7.67068 13.1748C7.67122 13.1087 7.65866 13.0431 7.6337 12.9819C7.60874 12.9207 7.5719 12.865 7.52528 12.8181L1.86395 7.0001Z" fill="#1C1C1C"/>
      </svg>
    </button>
    <p class="pagination__info">
      <span class="pagination__current">12</span>
      из
      <span class="pagination__total">31</span>
    </p>
    <button class="pagination__right">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M13.136 8.0001L7.47472 2.1821C7.4281 2.13522 7.39126 2.07955 7.3663 2.01833C7.34134 1.95711 7.32878 1.89155 7.32932 1.82544C7.32987 1.75933 7.34353 1.69398 7.3695 1.63318C7.39547 1.57239 7.43324 1.51734 7.48062 1.47124C7.528 1.42513 7.58406 1.38888 7.64555 1.36458C7.70703 1.34028 7.77273 1.32842 7.83883 1.32968C7.90493 1.33094 7.97012 1.34529 8.03064 1.37191C8.09115 1.39854 8.14579 1.43689 8.19138 1.48477L14.1914 7.65143C14.2822 7.74478 14.333 7.86987 14.333 8.0001C14.333 8.13033 14.2822 8.25542 14.1914 8.34877L8.19138 14.5154C8.14579 14.5633 8.09115 14.6017 8.03064 14.6283C7.97012 14.6549 7.90493 14.6693 7.83883 14.6705C7.77273 14.6718 7.70703 14.6599 7.64555 14.6356C7.58406 14.6113 7.528 14.5751 7.48062 14.529C7.43324 14.4829 7.39547 14.4278 7.3695 14.367C7.34353 14.3062 7.32987 14.2409 7.32932 14.1748C7.32878 14.1087 7.34134 14.0431 7.3663 13.9819C7.39126 13.9207 7.4281 13.865 7.47472 13.8181L13.136 8.0001Z" fill="#1C1C1C"/>
      </svg>
    </button>
  </div>
</div>
*/

const state = {
    store: []
}

function getProducts() {
    return fetch('http://localhost:3000/store').then(resp => resp.json())
}

function isItemNew(product) {
    const daysToConsider = 11

    const second = 1000
    const minute = second*60
    const hour = minute*60
    const day = hour*24

    const msForTenDaysAgo = Date.now() - day*daysToConsider

    const msForProductDate = Date.parse(product.dateEntered)

    return msForProductDate > msForTenDaysAgo
}

function renderHeader() {
    const headerEl = document.createElement('header')

    const headerH2El = document.createElement('h2')
    headerH2El.textContent = 'HOLLIXTON'

    const headerNav = document.createElement('nav')

    const headerNavLeftMenu = document.createElement('ul')
    headerNavLeftMenu.setAttribute('class', 'nav-left-menu')
    const navBarGirls = document.createElement('li')
    const navBarGirlsButton = document.createElement('button')
    navBarGirlsButton.textContent = 'Girls'
    navBarGirls.append(navBarGirlsButton)
    const navBarGuys = document.createElement('li')
    const navBarGuysButton = document.createElement('button')
    navBarGuysButton.textContent = 'Guys'
    navBarGuys.append(navBarGuysButton)
    const navBarSale= document.createElement('li')
    const navBarSaleButton = document.createElement('button')
    navBarSaleButton.textContent = 'Sale'
    navBarSale.append(navBarSaleButton)

    headerNavLeftMenu.append(navBarGirls,navBarGuys,navBarSale)
    
    const headerNavRightMenu = document.createElement('ul')
    headerNavRightMenu.setAttribute('class', 'nav-right-menu')
    const navBarSearch = document.createElement('li')
    const navBarSearchButton = document.createElement('button')
    const navBarSearchButtonIcon = document.createElement('img')
    navBarSearchButtonIcon.setAttribute('src', 'https://img.icons8.com/material-outlined/50/000000/search--v1.png')
    navBarSearchButton.append(navBarSearchButtonIcon)
    navBarSearch.append(navBarSearchButton)

    const navBarProfile = document.createElement('li')
    const navBarProfileButton = document.createElement('button')
    const navBarProfileButtonIcon = document.createElement('img')
    navBarProfileButtonIcon.setAttribute('src', 'https://img.icons8.com/small/50/000000/gender-neutral-user.png')
    navBarProfileButton.append(navBarProfileButtonIcon)
    navBarProfile.append(navBarProfileButton)

    const navBarBag = document.createElement('li')
    const navBarBagButton = document.createElement('button')
    const navBarBagButtonIcon = document.createElement('img')
    navBarBagButtonIcon.setAttribute('src', 'https://img.icons8.com/material-outlined/16/000000/shopping-bag.png')
    navBarBagButton.append(navBarBagButtonIcon)
    navBarBag.append(navBarBagButton)

    headerNavRightMenu.append(navBarSearch, navBarProfile, navBarBag)

    headerNav.append(headerNavLeftMenu, headerNavRightMenu)
    headerEl.append(headerH2El,headerNav)
    document.body.append(headerEl)
}

function renderProductItem(product, productList) {
    const productEl = document.createElement('li')
    productEl.setAttribute('class','product-item')

    const productImg = document.createElement('img')
    productImg.setAttribute('class', 'product-item__image')
    productImg.setAttribute('src', product.image)
    productImg.setAttribute('alt', product.name)

    const productTitle = document.createElement('h4')
    productTitle.setAttribute('class', 'product-item__title')
    productTitle.textContent = product.name

    const productPrice = document.createElement('p')
    productPrice.setAttribute('class', 'product-item__price')

    const productFullPriceSpan = document.createElement('span')
    productFullPriceSpan.setAttribute('class','product-item__full-price')
    productFullPriceSpan.textContent = `£${product.price}`

    productPrice.append(productFullPriceSpan)

    if (product.discountedPrice) {
        productFullPriceSpan.classList.add('discounted')

        const discountSpan = document.createElement('span')
        discountSpan.setAttribute('class', 'product-item__discount')
        discountSpan.textContent = `£${product.discountedPrice}`
        productPrice.append(discountSpan)
    }

    productEl.append(productImg, productTitle, productPrice)

    if (isItemNew(product)) {
        const newTag = document.createElement('span')
        newTag.setAttribute('class', 'product-item__new')
        newTag.textContent = 'NEW!'
        productEl.append(newTag)
    }

    productList.append(productEl)
}

function renderMain() {
    const mainEl = document.createElement('main')

    const mainH3El = document.createElement('h3')
    mainH3El.setAttribute('class', 'main-title')
    mainH3El.textContent = 'Home'

    const productList = document.createElement('ul')
    productList.setAttribute('class', 'products-list')

    for(const product of state.store) {
        renderProductItem(product, productList)
    }

    mainEl.append(mainH3El, productList)
    document.body.append(mainEl)
}

function renderFooter() {
    const footerEl = document.createElement('footer')

    const footerH3El = document.createElement('h3')
    footerH3El.textContent = 'HOLLIXTON'

    const footerH3ElRight = document.createElement('h3')
    footerH3ElRight.textContent = 'United Kingdom'

    footerEl.append(footerH3El, footerH3ElRight)
    document.body.append(footerEl)
}

function render() {
    document.body.innerHTML = ''
    renderHeader()
    renderMain()
    renderFooter()
}

function init() {
    render()
    getProducts().then(function(store) {
        state.store = store
        render()
    })
}

init()
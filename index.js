const state = {
    store: []
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

function renderMain() {
    const mainEl = document.createElement('main')

    const mainH3El = document.createElement('h3')
    mainH3El.textContent = 'Home'

    const productSection = document.createElement('section')

    const product = document.createElement('div')
    const productImg = document.createElement('img')
    const productTitle = document.createElement('p')
    const productPrice = document.createElement('span')
    product.append(productImg, productTitle, productPrice)
    productSection.append(product)

    mainEl.append(mainH3El, productSection)
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

render()
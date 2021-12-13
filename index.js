const state = {
    store: []
}

function renderHeader() {
    const headerEl = document.createElement('header')

    const headerH2El = document.createElement('h2')
    headerH2El.textContent = 'HOLLIXTON'

    const headerNav = document.createElement('nav')

    const headerNavLeftMenu = document.createElement('ul')
    const headerNavLeftMenuLi = document.createElement('li')
    headerNavLeftMenu.append(headerNavLeftMenuLi)
    
    const headerNavRightMenu = document.createElement('ul')
    const headerNavRightMenuLi = document.createElement('li')
    headerNavRightMenu.append(headerNavRightMenuLi)

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
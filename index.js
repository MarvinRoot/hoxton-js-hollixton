const state = {
    store: [],
    selectedGender: 'home',
    selectedModal: '',
    selectedItem: null,
    search: '',
    user: null
}

// fetch from the server
function getProducts() {
    return fetch('http://localhost:3000/store').then(resp => resp.json())
}
// listen to the buttons in the left side of nav (Girls, Guys, Sale)
function listenToGenderNavBar(button) {
    button.addEventListener('click', function(){
        state.selectedGender = ''
        state.search = ''
        state.selectedItem = null
        state.selectedGender = button.textContent
        render()
    })
}
// returns an array of the products we want to show on the main page
function getProductsToDisplay() {
    let productsToDisplay = state.store

    if(state.selectedGender.toLowerCase() === 'girls') {
        productsToDisplay = productsToDisplay.filter(item =>
            state.selectedGender.toLowerCase().includes(item.type.toLowerCase()))
    }

    if(state.selectedGender.toLowerCase() === 'guys') {
        productsToDisplay = productsToDisplay.filter(item =>
            state.selectedGender.toLowerCase().includes(item.type.toLowerCase()))
    }

    if(state.selectedGender.toLowerCase() === 'sale') {
        productsToDisplay = productsToDisplay.filter(item =>
            item.discountedPrice
        )
    }
    
    productsToDisplay = productsToDisplay.filter(item =>
        item.name.toLowerCase().includes(state.search.toLowerCase())
    )
    
    return productsToDisplay
}
// helps tagging the new products
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
// renders the header
function renderHeader() {
    const headerEl = document.createElement('header')

    const headerH2El = document.createElement('h2')
    headerH2El.setAttribute('class', 'header-title')
    headerH2El.textContent = 'HOLLIXTON'
    headerH2El.addEventListener('click', function(){
        state.selectedGender = ''
        state.search = ''
        state.selectedItem = null
        state.selectedGender = 'home'
        render()
    })

    const headerNav = document.createElement('nav')

    const headerNavLeftMenu = document.createElement('ul')
    headerNavLeftMenu.setAttribute('class', 'nav-left-menu')
    const navBarGirls = document.createElement('li')
    const navBarGirlsButton = document.createElement('button')
    navBarGirlsButton.textContent = 'Girls'
    navBarGirls.append(navBarGirlsButton)
    listenToGenderNavBar(navBarGirlsButton)
    const navBarGuys = document.createElement('li')
    const navBarGuysButton = document.createElement('button')
    navBarGuysButton.textContent = 'Guys'
    navBarGuys.append(navBarGuysButton)
    listenToGenderNavBar(navBarGuysButton)
    const navBarSale= document.createElement('li')
    const navBarSaleButton = document.createElement('button')
    navBarSaleButton.textContent = 'Sale'
    navBarSale.append(navBarSaleButton)
    listenToGenderNavBar(navBarSaleButton)

    headerNavLeftMenu.append(navBarGirls,navBarGuys,navBarSale)
    
    const headerNavRightMenu = document.createElement('ul')
    headerNavRightMenu.setAttribute('class', 'nav-right-menu')
    const navBarSearch = document.createElement('li')
    const navBarSearchButton = document.createElement('button')
    navBarSearchButton.addEventListener('click', function() {
        state.selectedModal = 'search'
        render()
    })
    const navBarSearchButtonIcon = document.createElement('img')
    navBarSearchButtonIcon.setAttribute('src', 'https://img.icons8.com/material-outlined/50/000000/search--v1.png')
    navBarSearchButton.append(navBarSearchButtonIcon)
    navBarSearch.append(navBarSearchButton)

    const navBarProfile = document.createElement('li')
    const navBarProfileButton = document.createElement('button')
    navBarProfileButton.addEventListener('click', function() {
        state.selectedModal = 'profile'
        render()
    })
    const navBarProfileButtonIcon = document.createElement('img')
    navBarProfileButtonIcon.setAttribute('src', 'https://img.icons8.com/small/50/000000/gender-neutral-user.png')
    navBarProfileButton.append(navBarProfileButtonIcon)
    navBarProfile.append(navBarProfileButton)

    const navBarBag = document.createElement('li')
    const navBarBagButton = document.createElement('button')
    navBarBagButton.addEventListener('click', function() {
        state.selectedModal = 'bag'
        render()
    })
    const navBarBagButtonIcon = document.createElement('img')
    navBarBagButtonIcon.setAttribute('src', 'https://img.icons8.com/material-outlined/16/000000/shopping-bag.png')
    navBarBagButton.append(navBarBagButtonIcon)
    navBarBag.append(navBarBagButton)

    headerNavRightMenu.append(navBarSearch, navBarProfile, navBarBag)

    headerNav.append(headerNavLeftMenu, headerNavRightMenu)
    headerEl.append(headerH2El,headerNav)
    document.body.append(headerEl)
}
// renders a product item
function renderProductItem(product, productList) {
    const productEl = document.createElement('li')
    productEl.setAttribute('class','product-item')

    productEl.addEventListener('click', function() {
        state.selectedItem = product
        render()
    })

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
// renders the details of a product
function renderItemDetails(mainEl) {
     const divEl = document.createElement('div')
        divEl.setAttribute('class', 'product-details')

        const imgEl = document.createElement('img')
        imgEl.setAttribute('class', 'product-details__image')
        imgEl.setAttribute('src', state.selectedItem.image)

        const titleEl = document.createElement('h2')
        titleEl.setAttribute('class', 'product-details__title')
        titleEl.textContent = state.selectedItem.name

        const addToBagBtnEl = document.createElement('button')
        addToBagBtnEl.setAttribute('class', 'product-details__add-to-bag')
        addToBagBtnEl.textContent = 'Add To Bag'
        addToBagBtnEl.addEventListener('click', function() {
            state.selectedItem = null
            render()
        })

        divEl.append(imgEl, titleEl, addToBagBtnEl)
        mainEl.append(divEl)

}
// renders the entire product list
function renderProductList(mainEl) {
        const mainH3El = document.createElement('h3')
        mainH3El.setAttribute('class', 'main-title')
        mainH3El.textContent = state.selectedGender.toUpperCase()

        const productList = document.createElement('ul')
        productList.setAttribute('class', 'products-list')

        for(const product of getProductsToDisplay()) {
            renderProductItem(product, productList)
        }

        mainEl.append(mainH3El, productList)
}
// renders the entire main section
function renderMain() {
    const mainEl = document.createElement('main')

    if(state.selectedItem !== null){
        renderItemDetails(mainEl)
    } else {
        renderProductList(mainEl)
    }

    document.body.append(mainEl)
}
// renders footer
function renderFooter() {
    const footerEl = document.createElement('footer')

    const footerH3El = document.createElement('h3')
    footerH3El.setAttribute('class', 'footer-title')
    footerH3El.textContent = 'HOLLIXTON'

    const footerH3ElRight = document.createElement('h3')
    footerH3ElRight.setAttribute('class', 'footer-country')
    footerH3ElRight.textContent = '🇬🇧 United Kingdom'

    footerEl.append(footerH3El, footerH3ElRight)
    document.body.append(footerEl)
}
// renders the modal for search button
function renderSearchModal() {
    const modalWrapper = document.createElement('div')
    modalWrapper.setAttribute('class', 'modal-wrapper')
    modalWrapper.addEventListener('click', function() {
        state.selectedModal = ''
        render()
    })

    const modalEl = document.createElement('div')
    modalEl.setAttribute('class', 'modal')
    modalEl.addEventListener('click', function(event) {
        event.stopPropagation()
    })

    const closeModalBtn = document.createElement('button')
    closeModalBtn.setAttribute('class', 'modal__close-btn')
    closeModalBtn.textContent = 'X'
    closeModalBtn.addEventListener('click', function() {
        state.selectedModal = ''
        render()
    })

    const searchModalTitle = document.createElement('h2')
    searchModalTitle.textContent = 'Search for your favorite items!'
    const searchModalForm = document.createElement('form')
    searchModalForm.addEventListener('submit', function(event) {
        event.preventDefault()
        state.search = searchModalInput.value

        state.selectedModal = ''
        render()
    })

    const searchModalInput = document.createElement('input')
    searchModalInput.setAttribute('class', 'modal__input')
    searchModalInput.setAttribute('placeholder', 'Search...')

    searchModalForm.append(searchModalInput)
    modalEl.append(closeModalBtn, searchModalTitle, searchModalForm)
    modalWrapper.append(modalEl)

    document.body.append(modalWrapper)
}
// renders the modal to sign up
function renderProfileModalForSignUp(modalEl, modalWrapper) {
    modalEl.innerHTML = ''
            const closeModalBtn = document.createElement('button')
            closeModalBtn.setAttribute('class', 'modal__close-btn')
            closeModalBtn.textContent = 'X'
            closeModalBtn.addEventListener('click', function() {
                state.selectedModal = ''
                render()
            })

            const profileModalTitle = document.createElement('h2')
            profileModalTitle.textContent = 'Sign Up'
            const profileModalForm = document.createElement('form')
            profileModalForm.addEventListener('submit', function(event) {
                event.preventDefault()
                state.search = searchModalInput.value

                state.modal = ''
                render()
            })

            const profileModalEmailInput = document.createElement('input')
            profileModalEmailInput.setAttribute('type', 'email')
            profileModalEmailInput.setAttribute('class', 'modal__input sign-in')
            profileModalEmailInput.setAttribute('name', 'email')
            const profileModalEmailLabel = document.createElement('label')
            profileModalEmailLabel.setAttribute('for', 'email')
            profileModalEmailLabel.textContent = 'Enter Email'

            const profileModalPswInput = document.createElement('input')
            profileModalPswInput.setAttribute('type', 'password')
            profileModalPswInput.setAttribute('class', 'modal__input sign-in')
            profileModalPswInput.setAttribute('name', 'psw')
            const profileModalPswLabel = document.createElement('label')
            profileModalPswLabel.setAttribute('for', 'psw')
            profileModalPswLabel.textContent = 'Create Password'

            const profileModalSubmitBtn = document.createElement('button')
            profileModalSubmitBtn.setAttribute('class', 'modal__submit-button')
            profileModalSubmitBtn.setAttribute('type', 'submit')
            profileModalSubmitBtn.textContent = 'SIGN UP'

            profileModalForm.append(profileModalEmailLabel,profileModalEmailInput,profileModalPswLabel,profileModalPswInput,profileModalSubmitBtn)
            modalEl.append(closeModalBtn, profileModalTitle, profileModalForm)
            modalWrapper.append(modalEl)

            document.body.append(modalWrapper)
}
// renders the modal for profile button
function renderProfileModal() {
    const modalWrapper = document.createElement('div')
    modalWrapper.setAttribute('class', 'modal-wrapper')
    modalWrapper.addEventListener('click', function() {
        state.selectedModal = ''
        render()
    })

    const modalEl = document.createElement('div')
    modalEl.setAttribute('class', 'modal')
    modalEl.addEventListener('click', function(event) {
        event.stopPropagation()
    })

    const closeModalBtn = document.createElement('button')
    closeModalBtn.setAttribute('class', 'modal__close-btn')
    closeModalBtn.textContent = 'X'
    closeModalBtn.addEventListener('click', function() {
        state.selectedModal = ''
        render()
    })

    const profileModalTitle = document.createElement('h2')
    profileModalTitle.textContent = 'Sign In'
    const profileModalForm = document.createElement('form')
    profileModalForm.addEventListener('submit', function(event) {
        event.preventDefault()
        state.search = searchModalInput.value

        state.modal = ''
        render()
    })

    const profileModalEmailInput = document.createElement('input')
    profileModalEmailInput.setAttribute('type', 'email')
    profileModalEmailInput.setAttribute('class', 'modal__input sign-in')
    profileModalEmailInput.setAttribute('name', 'email')
    const profileModalEmailLabel = document.createElement('label')
    profileModalEmailLabel.setAttribute('for', 'email')
    profileModalEmailLabel.textContent = 'Email'

    const profileModalPswInput = document.createElement('input')
    profileModalPswInput.setAttribute('type', 'password')
    profileModalPswInput.setAttribute('class', 'modal__input sign-in')
    profileModalPswInput.setAttribute('name', 'psw')
    const profileModalPswLabel = document.createElement('label')
    profileModalPswLabel.setAttribute('for', 'psw')
    profileModalPswLabel.textContent = 'Password'

    const profileModalSubmitBtn = document.createElement('button')
    profileModalSubmitBtn.setAttribute('class', 'modal__submit-button')
    profileModalSubmitBtn.setAttribute('type', 'submit')
    profileModalSubmitBtn.textContent = 'SIGN IN'

    const signUpRedirect = document.createElement('p')
    signUpRedirect.setAttribute('class', 'modal__sign-up')
    signUpRedirect.textContent = "Don't have an account yet? Create one here!"
    signUpRedirect.addEventListener('click', function() {
        renderProfileModalForSignUp(modalEl, modalWrapper)
    })

    profileModalForm.append(profileModalEmailLabel,profileModalEmailInput,profileModalPswLabel,profileModalPswInput,profileModalSubmitBtn,signUpRedirect)
    modalEl.append(closeModalBtn, profileModalTitle, profileModalForm)
    modalWrapper.append(modalEl)

    document.body.append(modalWrapper)
}
// picks which one of the modals to show
function renderModal() {
    if(state.selectedModal ===  '') return
    if (state.selectedModal === 'search') renderSearchModal()
    if (state.selectedModal === 'profile') renderProfileModal()
}

function render() {
    document.body.innerHTML = ''
    renderHeader()
    renderMain()
    renderFooter()
    renderModal()
}

function init() {
    render()
    getProducts().then(function(store) {
        state.store = store
        render()
    })
}

init()
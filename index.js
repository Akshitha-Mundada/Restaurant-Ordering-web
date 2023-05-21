import {menuArray} from '/data.js'

const menu = document.getElementById('menu')
const addItemBtn = document.getElementById('add-item-btn')
const orderSection = document.getElementById('order-section')
const orderedItems = document.getElementById('ordered-items')
const orderBill = document.getElementById('orderBill')
const paymentModule = document.getElementById('payment-module')
const formInput = document.getElementsByClassName('form-input')
let customerName
let totalBillAmount = 0;
let listItems = ``
let orderedListItems = [];


document.addEventListener('click', function(e) {
    if (e.target.dataset.orderId) {
        handleAddItemClick(e.target.dataset.orderId)
    }
    else if (e.target.dataset.removeItem) {
        handleRemoveItemClick(e.target.dataset.removeItem)
    }
    else if (e.target.dataset.completeOrder) {
        handleCompleteOrderBtn(e.target.dataset.completeOrder)
    }
    else if (e.target.dataset.completePayment) {
        handleCompletePaymentBtn(e.target.dataset.completePayment)
    }
})

function handleAddItemClick(itemId) {
    const targetItemObj = menuArray.filter(function(orderedItem) {
        return orderedItem.id == itemId
    })[0]
    orderSection.style.display = "block";
    orderedListItems.push(targetItemObj)

    listItems += `
            <li>
                <h2 class="ordered-item">${targetItemObj.name}</h2>
                <button class="remove-btn" data-remove-item="${targetItemObj.id}">remove</button>
                <h2 class="ordered-item-price" id="ordered-item-price">$ ${targetItemObj.price}</h2>
            </li>
        `
    totalBillAmount +=targetItemObj.price
    orderedItems.innerHTML = listItems
    orderBill.innerText = '$ ' + totalBillAmount
    render()
}

function handleRemoveItemClick(itemId) {
    let removeItemId = Math.floor(itemId)
    const filteredArray = orderedListItems.filter(function(element) {
        return element.id !== removeItemId
    })
    orderedListItems = []
    listItems = ``
    totalBillAmount = 0
    filteredArray.forEach(function(element) {
        orderedListItems.push(element)
        listItems += `
            <li>
                <h2 class="ordered-item">${element.name}</h2>
                <button class="remove-btn" data-remove-item="${element.id}">remove</button>
                <h2 class="ordered-item-price" id="ordered-item-price">$ ${element.price}</h2>
            </li>
        `
        totalBillAmount = element.price
    })
    orderedItems.innerHTML = listItems
    orderBill.innerText = '$ ' + totalBillAmount
    render()
}

function handleCompleteOrderBtn(CompleteOrderClick) {
    paymentModule.style.display = "block"
    document.getElementById("add-item-btn").disabled = true;
}

function handleCompletePaymentBtn(CompletePaymentClick) {
        customerName = document.getElementById('customer-name').value
        orderSection.style.display = "none"
        document.getElementById('thanks-section').style.display = 'block'
        
        document.getElementById('thanks-section').innerHTML = `
            <p>Thanks, ${customerName}! Your order is on its way!</p>
        `
}

function getMenuHtml() {
    let menuHtml = ``
    menuArray.forEach(function(orderedItem) {
        menuHtml += `
            <div class="main-section">
                
                <div class="item" id="item">
                    <div class="item-img-des">
                        <h1>${orderedItem.emoji}</h1>
                        <div class="item-description">
                            <h2>${orderedItem.name}</h2>
                            <p>${orderedItem.ingredients}</p>
                            <h2>${orderedItem.price}</h2>
                        </div>
                    </div>
                    <button class="add-item-btn" id="add-item-btn" 
                    data-order-id="${orderedItem.id}">+</button>
                </div>
                
            </div>
        `
    }) 
    return menuHtml
}

function render() {
    menu.innerHTML = getMenuHtml()
}

render()
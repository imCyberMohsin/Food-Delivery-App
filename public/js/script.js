// import axios from 'axios'; // import not working so I used CDN
// import Noty from 'noty';   // import not working ... used CDN

//? Add to cart functionality 
const addTocart = document.querySelectorAll('.add-to-cart');
const cartCounter = document.getElementById('cartCounter');

// Update cart function
function updateCart(itemData) {
    //* Send Data to server
    axios.post('/update-cart', itemData).then(res => {
        // console.log(res);
        cartCounter.innerText = res.data.totalQty;

        // notify whenever an item is added to the cart
        new Noty({
            type: 'success',
            timeout: 1000,
            text: "Item added to cart",
            layout: 'bottomRight',
            // progressBar: false,
        }).show();
    }).catch(err => {
        new Noty({
            type: 'error',
            timeout: 1000,
            text: "Failed to add item to cart",
        }).show();
    })
}

addTocart.forEach((eachBtn) => {
    eachBtn.addEventListener('click', (e) => {
        // Accessing the custom data attribute 'item-data'
        let itemData = JSON.parse(eachBtn.getAttribute('item-data'));
        updateCart(itemData);
        // console.log(itemData);
    });
});

//! Remove Order Placed Alert After 3 Seconds (Not working)
window.addEventListener('DOMContentLoaded', function () {
    let successAlert = document.getElementById('success-alert');
    if (successAlert) {
        setTimeout(function () {
            successAlert.style.display = 'hidden';
        }, 3000); // 3000 milliseconds = 3 seconds
    }
});
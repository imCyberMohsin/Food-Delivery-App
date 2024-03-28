// import axios from 'axios'; // import not working so I used CDN

//? Add to cart functionality 
const addTocart = document.querySelectorAll('.add-to-cart');
const cartCounter = document.getElementById('cartCounter');

// Update cart function
function updateCart(itemData) {
    //* Send Data to server
    axios.post('/update-cart', itemData).then(res => {
        // console.log(res);
        cartCounter.innerText = res.data.totalQty;
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
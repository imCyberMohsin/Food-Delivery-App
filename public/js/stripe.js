//! Stripe Payment codes 
// import { loadStripe } from '@stripe/stripe-js'; // used CDN
import { placeOrder } from "./placeOrderAjax.js";

export async function initStripe(){
    //? Stripe widget 
    const stripe = await Stripe('pk_test_51PFJxnRw2Didn8iJ6TCXD8SJ2GtzbULFbisMxkjUdoDwPq8dL7zE4Yb8ullIfCJw25Ur13JEJzf23Dcbyk8N3bSc00T3Y0oR6e');

    let card = null;

    function mountWidget() {
        const elements = stripe.elements();
        let style = {
            base: {
                color: '#32325d',
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSmoothing: 'antialiased',
                fontSize: '16px',
                '::placeholder': {
                    color: '#aab7c4'
                }
            },
            invalid: {
                color: '#fa755a',
                iconColor: '#fa755a'
            }
        };
        card = elements.create('card', { style, hidePostalCode: true })
        card.mount('#card-element');
    }


    //? Payment toggle in cart page  
    const paymentType = document.querySelector('#paymentType');

    if(!paymentType){
        return;
    }

    paymentType.addEventListener('change', (e)=> {
        // console.log(e.target.value);

        // Display card widget if its Card-payment else hide it
        if(e.target.value == 'card'){
            // Display Stripe Widget 
            mountWidget();
        } else {
            // Hide Widget
            card.destroy();
        }
    })


    //? Ajax call code for/from cart page 
    const paymentForm = document.querySelector('#payment-form');
    if (paymentForm) {
        paymentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let formData = new FormData(paymentForm);
            let formObject = {};
            for (let [key, value] of formData.entries()) {
                formObject[key] = value;
                // console.log(key, value);
            }

            //? Verify Card before placing the order
            // Ajax call to place order (COD)
            if(!card){
                placeOrder(formObject);
                // console.log(formObject);
                return;
            }

            // Else (Card Payment)
            // 1. Generate token
            stripe.createToken(card).then((result)=>{
                // 2. Place order
                // console.log(result);
                formObject.stripeToken = result.token.id; // adding new field to card payments
                placeOrder(formObject);
            }).catch((err)=> {
                console.log(err);
            });
        })
    }
}
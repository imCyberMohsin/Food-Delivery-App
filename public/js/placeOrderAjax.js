//? Place order Ajax call

export function placeOrder(formObject) {
    axios.post('/orders', formObject).then((res) => {
        // console.log(res.data);
        // notify when order is placed
        new Noty({
            type: 'success',
            timeout: 1000,
            text: res.data.message,
            layout: 'topRight',
        }).show();

        setTimeout(() => {
            window.location.href = "/customer/orders";
        }, 2000)
    }).catch((err) => {
        // console.log(err);
        new Noty({
            type: 'success',
            timeout: 1000,
            text: err.message,
            layout: 'topRight',
        }).show();
        // console.log(err);
    });
}
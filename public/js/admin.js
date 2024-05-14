function Admin() {
    const orderTableBody = document.querySelector('#orderTableBody');
    let orders = [];
    let markup;

    axios.get('/admin/orders', {
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then(res => {
        orders = res.data;
        markup = generateMarkup(orders);
        orderTableBody.innerHTML = markup;
    }).catch(err => {
        console.log(err);
    });

    //? RenderItems Function  
    function renderItems(items) {
        let markup = '';
        // Iterate over each key (item ID) in the items object
        for (const itemId in items) {
            if (items.hasOwnProperty(itemId)) { // Check if the key is a direct property of the object
                const menuItem = items[itemId]; // Access the menuItem object using the item ID
                // Generate markup for each item
                markup += `
                    <p>${menuItem.item.name} - x${menuItem.qty}</p>
                `;
            }
        }
        return markup;
    }

    //? Generate Markup Function 
    function generateMarkup(orders) {
        let markup = '';
        // Iterate over each order in the orders array
        orders.forEach(order => {
            // Generate markup for each order
            markup += `
                <tr>
                    <td class="border px-4 py-2 text-left">
                        <p class="text-green-500">${order._id}</p>
                        <div>${renderItems(order.items)}</div>
                    </td>
                    <td class="border px-4 py-2 text-left">${order.name}</td>
                    <td class="border px-4 py-2 text-left">${order.phone}</td>
                    <td class="border px-4 py-2 text-left">${order.address}</td>
                    <td class="border px-4 py-2 text-left">
                        <div class="inline-block relative w-64">
                            <form action="/admin/order/status" method="post">
                                <input type="hidden" name="orderId" value="${order._id}">
                
                                <select name="status" onchange="this.form.submit()"
                                    class="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                                    class="block appearance-none w-full bg-white border border-x-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none">
                                    <option value="order_placed" ${order.status === 'order_placed' ? 'selected' : ''}>
                                        Placed</option>
                
                                    <option value="confirmed" ${order.status === 'confirmed' ? 'selected' : ''}>
                                        Confirmed</option>
                
                                    <option value="prepared" ${order.status === 'prepared' ? 'selected' : ''}>
                                        Prepared</option>
                
                                    <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>
                                        Delivered</option>
                
                                    <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>
                                        Completed</option>
                
                                </select>
                            </form>
                        </div>
                    </td>
                    <td class="border px-4 py-2 text-left">${moment(order.createdAt).format('hh:mm A')}</td>

                    <td class="border px-4 py-2 text-left">
                        ${order.paymentStatus ? 'Paid' : 'Not Paid'}
                    </td>
                </tr>
            `;
        });
        return markup;
    }
}
Admin()
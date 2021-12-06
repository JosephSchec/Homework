(function () {
    "use strict";

    class Item {
        constructor(name, price, quantity) {
            this.name = name;
            this.price = price;
            this.quantity = quantity;
        }
    }

    class Order {
        constructor(cName, cAddress, items) {
            this.cName = cName;
            this.cAddress = cAddress;
            this.items = items;
        }
        get total() {
            let sum = 0;
            this.items.forEach(item => {
                sum += item.total;
            });
            return sum;
        }
    }

    (async function loadJson() {
        try {
            const store = await fetch('store.json');
            if (!store.ok) {
                throw new Error('page not found');
            }
            const orders = await store.json();

            // SL - theres a little to much going on here. I would first load the items, then add them to dom in a separate function
            // Also your orders dont have Items in them, they have the original simple objects from json. You just use Item when adding it to dom
            orders.forEach(order => {
                const theOrder = new Order(order.customer, order.address, order.items);
                $(`<div></div><hr><h3> Customer: ${theOrder.cName}</h3>
                <p>Address: ${theOrder.cAddress}</p>
                <p>Total : $${theOrder.total}</p><h3>Items</h3>`).appendTo('body');
                order.items.forEach(item => {
                    // SL - theItems? interesting name for a single item.
                    const theItems = new Item(item.item, (item.total / item.quantity), item.quantity);
                    $(`<p>Item: ${theItems.name}</p>
                     <p>Quantity: ${theItems.quantity}</p>
                     <p>Price: $${theItems.price}</p><br>`).appendTo('body');
                });
            });
        } catch (error) {
            console.error(error);
        }
    }());


}());

// SL - nice - 95

function calculateTotals(basket) {
    const subtotal = basket.items.reduce((a, b) => b.price * b.quantity + a, 0);
    const total = subtotal + basket.shippingPrice;
    return { shipping: basket.shippingPrice, total, subtotal };
}

function isProduct(item) {
    return item.productBrand !== undefined;
}

function mapProductItemToBasketItem(item) {
    return {
        id: item.id,
        productName: item.name,
        price: item.price,
        quantity: 0,
        pictureUrl: item.pictureUrl,
        brand: item.productBrand,
        type: item.productType
    };
}

function addOrUpdateItem(items, itemToAdd, quantity) {
    const item = items.find((x) => x.id === itemToAdd.id);
    if (item) item.quantity += quantity;
    else {
        itemToAdd.quantity = quantity;
        items.push(itemToAdd);
    }
    return items;
}

//   {
//     "id": 6053,
//     "productName": "Bomber jacket Barça Nike",
//     "price": 179,
//     "quantity": 2,
//     "pictureUrl": "https://localhost:5001/images/products/7c789e5e-eebf-4662-ac4e-990eeac9c50b700x1060-DX4766-277-1.jpg",
//     "brand": "Adidas",
//     "type": "Nike"
//   }
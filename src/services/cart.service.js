import http from "../http-common";

function getCart(userId) {
    return http.get(`/getCart/${userId}`);
}

function addToCart(productId, userId) {
    const data = {
        product_id: productId,
        user_id: userId
    };
    return http.post(`/addProductToCart`, data);
}
function removeFromCart(productId, userId) {
    const data = {
        product_id: productId,
        user_id: userId
    };
    return http.post(`/deleteProductFromCart`, data);
}
function updateFromCart(productId, userId, price) {
    const data = {
        product_id: productId,
        user_id: userId,
        price: price
    };
    return http.post(`/updateFormCart`, data);
}
const exportedObject = {
    getCart: getCart,
    addToCart: addToCart,
    removeFromCart: removeFromCart,
    updateFromCart: updateFromCart
};

export default exportedObject;
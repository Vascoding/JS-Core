let productService = (() => {
    function listAllProducts() {
        return requester.get('appdata', 'products', 'kinvey')
    }

    function getProductById(productId) {
        return requester.get('appdata', `products/${productId}`, 'kinvey')
    }

    return {
        listAllProducts,
        getProductById,
    }
})()
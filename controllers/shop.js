const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/index', {
            prods: products,
            title: 'Shop',
            path: '/',
        })
    });
}
exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/product-list', {
            prods: products,
            title: 'All Products ',
            path: '/products',
        })
    });
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        console.log(product);
        res.render('shop/product-detail', {
            title: 'Detail',
            path: '/products',
            product: product
        });
    })


};

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        title: 'Your Cart',
        path: '/cart',
    })
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, (product) => {
        Cart.addProduct(prodId, product.price);
    });
    res.redirect('/cart');
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        title: 'Your orders',
        path: '/orders',
    })

}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        title: 'Your checkout',
        path: '/checkout',
    })

}
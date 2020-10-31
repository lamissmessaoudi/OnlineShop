const Product = require('../models/product');
const Cart = require('../models/cart');
const { products } = require('../routes/admin');

exports.getIndex = (req, res, next) => {
    Product.findAll()
        .then(products => {
            res.render('shop/index', {
                prods: products,
                title: 'Shop',
                path: '/',
            })
        })
        .catch(err => {
            console.log(err);
        })
}

exports.getProducts = (req, res, next) => {
    Product.findAll()
        .then(products => {
            res.render('shop/product-list', {
                prods: products,
                title: 'All Products ',
                path: '/products',
            })
        })
        .catch(err => {
            console.log(err);
        })
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    // Product.findAll({ where: { id: prodId } })
    //     .then((products) => {
    //         res.render('shop/product-detail', {
    //             title: 'Detail',
    //             path: '/products',
    //             product: products[0]
    //         });
    //     })
    //     .catch(err => console.log(err));


    Product.findByPk(prodId)
        .then((product) => {
            res.render('shop/product-detail', {
                title: 'Detail',
                path: '/products',
                product: product
            });
        })
        .catch(err => console.log(err));
}

exports.getCart = (req, res, next) => {
    req.user
        .getCart()
        .then(cart => {
            return cart
                .getProducts()
                .then(products => {
                    res.render('shop/cart', {
                        title: 'Your Cart',
                        path: '/cart',
                        products: products
                    })
                })
                .catch(err => {
                    console.log(err);
                })
        })
        .catch(err => {
            console.log(err);
        })
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    let fetchedCart;
    let newQuantity = 1;

    req.user
        .getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts({ where: { id: prodId } });
        })
        .then(products => {
            let product;
            if (products.length > 0) {
                product = products[0];
            }
            if (product) {
                const oldQuantity = product.cartItem.quantity;
                newQuantity = oldQuantity + 1
                return product;
            }
            return Product.findByPk(prodId)
        })
        .then(product => {
            return fetchedCart.addProduct(product, {
                through: { quantity: newQuantity }
            });
        })
        .then(() => {
            res.redirect('/cart');
        })
        .catch(err => {
            console.log(err);
        })
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

exports.postDeleteCartItem = (req, res, next) => {
    const prodId = req.body.productId;
    req.user
        .getCart()
        .then(cart => {
            return cart.getProducts({ where: { id: prodId } })
        })
        .then(products => {
            const product = products[0];
            return product.cartItem.destroy();
        })
        .then(result => {
            res.redirect('/cart')
        })
        .catch(err => {
            console.log(err);
        });
};

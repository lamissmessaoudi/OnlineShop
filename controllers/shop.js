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
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for (product of products) {
                const cartProductData = cart.products.find(
                    prod => prod.id === product.id
                );
                if (cartProductData) {
                    cartProducts.push({
                        productData: product,
                        qty: cartProductData.qty
                    });
                }
            }
            res.render('shop/cart', {
                title: 'Your Cart',
                path: '/cart',
                products: cartProducts
            })
        })
    });
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

exports.postDeleteCartItem = (req, res, next) => {
    const prodId = req.body.productId;
    console.log(prodId);
    Product.findById(prodId, product => {
        console.log("product " + product);
        console.log((product != null))
        if (product != null) {
            Cart.deleteProduct(prodId, product.price);

        }
        res.redirect('/cart');
    });
};

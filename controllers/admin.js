const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render("./admin/edit-product", {
        title: 'Add Product',
        path: '/admin/add-product',
        editing: false,

    })
}

exports.postAddProduct = (req, res, next) => {
    Product.create(
        {
            title: req.body.title,
            imageUrl: req.body.imageUrl,
            price: req.body.price,
            description: req.body.description
        })
        .then(() => {
            (result) =>
                //res.redirect('/');
                console.log('created product')
        })
        .catch(err => console.log(err));
}


exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/products', {
            prods: products,
            title: 'Admin Products',
            path: '/admin/products',
        })
    });
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        if (!product) {
            return res.redirect('/');
        }
        res.render("admin/edit-product", {
            title: 'Edit Product',
            path: '/admin/add-product',
            editing: editMode,
            product: product
        });
    })
}

exports.postEditProduct = (req, res, next) => {
    const updatedProduct = new Product(
        req.body.productId,
        req.body.title,
        req.body.imageUrl,
        req.body.price,
        req.body.description
    );
    updatedProduct.save();
    res.redirect('/admin/products');
}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.deleteById(prodId);
    res.redirect('/admin/products');
};

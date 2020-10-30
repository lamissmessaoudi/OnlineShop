const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render("./admin/edit-product", {
        title: 'Add Product',
        path: '/admin/add-product',
        editing: false,

    })
}

exports.postAddProduct = (req, res, next) => {
    console.log('creatin product');
    Product.create(
        {
            title: req.body.title,
            imageUrl: req.body.imageUrl,
            price: req.body.price,
            description: req.body.description
        })
        .then(result => {
            // console.log(result);
            console.log('Created Product');
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        });
}


exports.getProducts = (req, res, next) => {
    Product.findAll()
        .then(products => {
            res.render('admin/products', {
                prods: products,
                title: 'Admin Products',
                path: '/admin/products',
            })
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findByPk(prodId)
        .then(product => {
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
        .catch(err => console.log(err));

}

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findByPk(prodId)
        .then(product => {
            product.title = req.body.title;
            product.price = req.body.price;
            product.imageUrl = req.body.imageUrl;
            product.description = req.body.description;
            return product.save();
        }).then(() => res.redirect('/admin/products')
        )
        .catch(err => console.log(err));


}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findByPk(prodId)
        .then((p) => {
            return p.destroy();
        })
        .then(result => res.redirect('/admin/products'))
        .catch(err => console.log(err));

};

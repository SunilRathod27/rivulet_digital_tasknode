const Product = require('../models/product');
const fs = require('fs');

module.exports = {

    onGetProductList: async function (req, res) {
        try {
			let list = []
			if (req.body.search) {
				let search = req.body.search
				 list = await Product.find({ name: { $regex: new RegExp(search, "i") } }).populate('category').lean();

			} else {
				list = await Product.find().populate('category').lean();
			}
             

            for (let i = 0; i < list.length; i++) {
                list[i].catg = list[i].category.type;
            }

            res.json({
                success: true,
                list: list
            });

        } catch (error) {
            console.log("Error While Get Product List ", error);
        }
    },

    oncreateProduct: async function (req, res) {
        try {

            let product = new Product({
                category: req.body.category,
                name: req.body.name,
                description: req.body.description,
                photo: req.file.filename,
                price: req.body.price,
                stockQty: req.body.stockQty
            });

            await product.save();

            res.json({
                success: true,
                message: 'Product Created Successfully!'
            });

        } catch (error) {
            console.log("Error While Create Product ", error);
        }
    },

    onGetSingleProduct: async function (req, res) {
        try {
            let id = req.params.id;

            let findProduct = await Product.findOne({ _id: id });

            if (findProduct) {
                res.json({
                    success: true,
                    product: findProduct,
                    message: 'Product Get Successfully!'
                });
            }
            else {
                res.json({
                    success: false,
                    message: 'Product Not Found!'
                })
            }

        } catch (error) {
            console.log("Error While Get Single Product ", error);
        }
    },

    onUpdateProduct: async function (req, res) {
        try {

            const id = req.params.id;
            let newImg = '';
            if (req.file) {
                newImg = req.file.filename;
                try {
                    fs.unlinkSync("./uploadImages/" + req.body.oldImg);
                    console.log("Delete Image --> ", req.body.oldImg);
                } catch (error) {
                    console.log("Remove Old Image ", error);
                }
            }
            else {
                newImg = req.body.oldImg;
            }

            const updateProduct = req.body;
            updateProduct.photo = newImg;

            const product = await Product.findByIdAndUpdate(id, updateProduct);

            res.json({
                success: true,
                message: 'Product Update Successfully!'
            });

        } catch (error) {
            console.log("Error While Update Product ", error);
        }
    },

    onDeleteProduct: async function (req, res) {
        try {

            const product = await Product.findByIdAndDelete({ _id: req.params.id });

            if (product) {
                res.json({
                    success: true,
                    message: 'Product Deleted Successfully!',
                    product: product
                });
            }
            else {
                res.json({
                    success: false,
                    message: 'Product Not Found!'
                });
            }


        } catch (error) {
            console.log("Error While Delete Product ", error);
        }
    },

}
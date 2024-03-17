const Category = require('../models/category');


module.exports = {

    onGetCategoryList: async function (req, res) {

        try {

            let list = await Category.find();

            res.json({
                success: true,
                list: list
            });


        } catch (error) {
            console.log("Error While Get Category List ", error);
        }

    },

    onCreateCategory: async function (req, res) {

        try {

            let category = new Category({
                type: req.body.type
            });

            await category.save();

            res.json({
                success: true,
                message: 'Category Add Successfully!'
            });


        } catch (error) {
            console.log("Error While Get Create Category ", error);
        }

    },

}

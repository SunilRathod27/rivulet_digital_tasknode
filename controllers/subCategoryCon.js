const SubCategory = require('../models/subCategory');

module.exports = {

    onGetSubCategoryList: async function (req, res) {

        try {

            let list = await SubCategory.find().populate('category').lean();

            for (let i = 0; i < list.length; i++) {
                list[i].catg = list[i].category.type;
            }

            res.json({
                success: true,
                list: list
            });

        } catch (error) {
            console.log("Error While Get SubCategory List ", error);
        }

    },

    onCreateSubCategory: async function (req, res) {

        try {

            let subCategory = new SubCategory({
                category: req.body.category,
                type: req.body.type
            });

            await subCategory.save();

            res.json({
                success: true,
                message: 'New SubCategory Added!'
            })

        } catch (error) {
            console.log("Error While Create SubCategory ", error);
        }

    },

}
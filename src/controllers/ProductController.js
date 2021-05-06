const { products } = require('../models')
const { Op } = require("sequelize");

module.exports = {
    async index(req, res) {
        const { page = 1 } = req.query;
        let limit = 10
        let offset = 0 + (page - 1) * limit
        const Allproducts = await products.findAndCountAll({
            offset: offset,
            limit: limit
        })
        let totalPages = Math.ceil(Allproducts.count / limit);
        const response = {
            docs: [...Allproducts.rows],
            page: page,
            productInfo: {
                totalPages: totalPages.toFixed(),
                totalProducts: Allproducts.count
            }
        }
        return res.json(response);
    },

    async store(req, res) {
        const {title, id} = req.body
        if (id) {
            const verifyIfExist = await products.findOne({
                where: {
                    [Op.or]: [
                        {title},
                        {id}
                    ]
                }
            })
            if ( verifyIfExist ) {
                return res.json({msg: "already exist"})
            }
        }
        const product = await products.create(req.body);
        return res.json(product);
    },
    async show(req, res){
        const product = await products.findByPk(req.params.id)
        return res.json(product);
    },
    async update(req, res){
        const product = await products.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        return res.json(product);
    },
    async destroy(req, res){
        const product = await products.destroy({where: {id : req.params.id}});
        return res.json(product);
    }
};
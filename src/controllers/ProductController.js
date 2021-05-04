const mongoose = require('../database');
const Product = require('../models/Product')
const { Op } = require("sequelize");

module.exports = {
    async index(req, res) {
        const { page = 1 } = req.query;
        let limit = 10
        let offset = 0 + (page - 1) * limit
        const products = await Product.findAndCountAll({
            offset: offset,
            limit: limit
        })
        const response = {
            docs: [...products.rows],
            page: page,
            productInfo: {
                totalPages: products.count / limit,
                totalProducts: products.count
            }
        }
        return res.json(response);
    },

    async store(req, res) {
        const {title, description, url, id} = req.body
        const verifyIfExist = await Product.findOne({
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
        const product = await Product.create(req.body);
        return res.json(product);
    },
    async show(req, res){
        const product = await Product.findByPk(req.params.id)
        return res.json(product);
    },
    async update(req, res){
        const product = await Product.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        return res.json(product);
    },
    async destroy(req, res){
        const product = await Product.destroy({where: {id : req.params.id}});
        return res.json(product);
    }
};
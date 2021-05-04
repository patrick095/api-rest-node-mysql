const mongoose = require('../database');
const Product = require('../models/Product')

module.exports = {
    async index(req, res) {
        const { page = 1 } = req.query;
        let limit = 10
        let offset = 0 + (page - 1) * limit
        const products = await Product.findAndCountAll({
            offset: offset,
            limit: limit
        })
        return res.json(products);
    },

    async store(req, res) {
        const product = await Product.create(req.body);
        return res.json(product);
    },
    async show(req, res){
        const product = await Product.findById(req.params.id);
        return res.json(product);
    },
    async update(req, res){
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
        return res.json(product);
    },
    async destroy(req, res){
        await Product.findByIdAndRemove(req.params.id);
        return res.send();
    }
};
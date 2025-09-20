const Product = require('../models/Product');
const Supplier = require('../models/Supplier');


exports.index = async (req, res) => {
const { search, supplier } = req.query;
let query = {};
if (search) query.name = new RegExp(search, 'i');
if (supplier) query.supplierId = supplier;


const products = await Product.find(query).populate('supplierId');
const suppliers = await Supplier.find();
res.render('products/index', { products, suppliers });
};


exports.getNew = async (req, res) => {
const suppliers = await Supplier.find();
res.render('products/form', { product: {}, suppliers, error: null });
};


exports.postNew = async (req, res) => {
try {
await Product.create(req.body);
res.redirect('/products');
} catch (err) {
const suppliers = await Supplier.find();
res.render('products/form', { product: req.body, suppliers, error: 'Có lỗi' });
}
};


exports.getEdit = async (req, res) => {
const product = await Product.findById(req.params.id);
const suppliers = await Supplier.find();
res.render('products/form', { product, suppliers, error: null });
};

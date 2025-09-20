const Supplier = require('../models/Supplier');


exports.index = async (req, res) => {
const suppliers = await Supplier.find();
res.render('suppliers/index', { suppliers });
};


exports.getNew = (req, res) => res.render('suppliers/form', { supplier: {}, error: null });


exports.postNew = async (req, res) => {
try {
await Supplier.create(req.body);
res.redirect('/suppliers');
} catch (err) {
res.render('suppliers/form', { supplier: req.body, error: 'Có lỗi' });
}
};


exports.getEdit = async (req, res) => {
const supplier = await Supplier.findById(req.params.id);
res.render('suppliers/form', { supplier, error: null });
};


exports.postEdit = async (req, res) => {
await Supplier.findByIdAndUpdate(req.params.id, req.body);
res.redirect('/suppliers');
};


exports.delete = async (req, res) => {
await Supplier.findByIdAndDelete(req.params.id);
res.redirect('/suppliers');
};

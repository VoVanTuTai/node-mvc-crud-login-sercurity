require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');

// Import routes
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const supplierRoutes = require('./routes/suppliers');

// Init Express
const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connect
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Đã kết nối thành công tới MongoDB!'))
    .catch(err => console.error('❌ Lỗi kết nối MongoDB:', err));

// Middleware
app.use(express.static('public')); // file tĩnh
app.use(express.urlencoded({ extended: true })); // form HTML
app.use(express.json()); // JSON

// Session + Mongo Store
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        collectionName: 'sessions'
    }),
    cookie: { 
        maxAge: 1000 * 60 * 60 * 24 // 1 ngày
    }
}));

// Middleware truyền session vào view
app.use((req, res, next) => {
    res.locals.isAuthenticated = !!req.session.userId;
    res.locals.userId = req.session.userId || null;
    next();
});

// View engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// Routes
app.use('/', indexRoutes);
app.use('/', authRoutes);
app.use('/admin/products', productRoutes);
app.use('/admin/suppliers', supplierRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});


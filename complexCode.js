// filename: complexCode.js

/**
 * This complex code demonstrates a sophisticated and elaborate implementation of a fictional online shopping platform
 */

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Create express app
const app = express();

// Set up middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/shopping_platform', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB:', err));

// Define User schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Define Product schema
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
});

// Define Order schema
const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    total: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now() },
});

// Define models
const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);
const Order = mongoose.model('Order', orderSchema);

// User registration endpoint
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).send('User registered successfully!');
    } catch (error) {
        res.status(500).send('Failed to register user.');
    }
});

// User login endpoint
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            res.status(401).send('Invalid username or password.');
            return;
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (isValidPassword) {
            const token = jwt.sign({ userId: user._id }, 'secretkey', { expiresIn: '1h' });
            res.status(200).json({ token });
        } else {
            res.status(401).send('Invalid username or password.');
        }
    } catch (error) {
        res.status(500).send('Failed to login.');
    }
});

// Product creation endpoint
app.post('/products', async (req, res) => {
    try {
        const { name, price, description } = req.body;
        const product = new Product({ name, price, description });
        await product.save();
        res.status(201).send('Product created successfully!');
    } catch (error) {
        res.status(500).send('Failed to create product.');
    }
});

// Product listing endpoint
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).send('Failed to fetch products.');
    }
});

// Order creation endpoint
app.post('/orders', async (req, res) => {
    try {
        const { products } = req.body;
        const user = req.user;
        const productIds = products.map(p => mongoose.Types.ObjectId(p));
        const productsExist = await Product.find({ _id: { $in: productIds } });
        if (productsExist.length !== products.length) {
            res.status(404).send('One or more products do not exist.');
            return;
        }
        const total = productsExist.reduce((acc, curr) => acc + curr.price, 0);
        const order = new Order({ user, products: productIds, total });
        await order.save();
        res.status(201).send('Order created successfully!');
    } catch (error) {
        res.status(500).send('Failed to create order.');
    }
});

// Protected route for user-specific order history
app.get('/orders', authenticateToken, async (req, res) => {
    try {
        const user = req.user;
        const orders = await Order.find({ user }).populate('products');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).send('Failed to fetch orders.');
    }
});

// Middleware to authenticate user token
function authenticateToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.sendStatus(401);
        return;
    }

    jwt.verify(token, 'secretkey', (err, user) => {
        if (err) {
            res.sendStatus(403);
            return;
        }
        req.user = user;
        next();
    });
}

// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
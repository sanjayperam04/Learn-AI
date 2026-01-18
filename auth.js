const express = require('express');
const app = express();

// Hardcoded credentials
const API_KEY = "sk_live_1234567890abcdef";
const DB_PASSWORD = "admin123";

// SQL Injection vulnerability
app.get('/user', (req, res) => {
    const query = "SELECT * FROM users WHERE id = " + req.query.id;
    db.query(query);
});

// XSS vulnerability
app.get('/search', (req, res) => {
    res.send("<h1>Results for: " + req.query.term + "</h1>");
});

// No error handling
function processPayment(amount) {
    return amount / 0;
}

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = 3000;
const SECRET = "freedom-secret-key";

app.use(cors());
app.use(express.json());

// DATABASE
const db = new sqlite3.Database("./database.db");

// Create tables
db.run(`
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    email TEXT UNIQUE,
    password TEXT
)
`);

// SIGN UP
app.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    db.run(
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
        [username, email, hashed],
        (err) => {
            if (err) return res.status(400).json({ error: "User exists" });
            res.json({ message: "Account created" });
        }
    );
});

// LOGIN
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
        if (!user) return res.status(400).json({ error: "User not found" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ error: "Wrong password" });

        const token = jwt.sign({ id: user.id }, SECRET);
        res.json({ token, username: user.username });
    });
});

app.listen(PORT, () => {
    console.log("Server running on http://localhost:3000");
});

import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());  // Enable cross-origin
app.use(express.json());  // Enable JSON for requests

const PORT = 5001;  // Any free port
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// Mock in-memory data (temporary — resets on server restart)
const users = [];

// Testing Service
app.get("/", (req, res) => {
    res.status(200).json("Hello World from Express JS (No MongoDB)");
});

// SIGN UP OPERATION
app.post("/signup", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json("Email and password are required");
    }

    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(200).json("Email ID already exists");
    }

    users.push(req.body);
    res.status(200).json("Registered Successfully");
});

// LOGIN OPERATION
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json("Email and password are required");
    }

    const user = users.find(user => user.email === email && user.password === password);

    if (!user) {
        return res.status(200).json("301::Invalid Credentials!");
    }

    res.status(200).json("300::Login Success");
});

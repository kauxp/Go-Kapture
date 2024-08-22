import { where } from "sequelize";
import User from "../models/User.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.create({
            username,
            password: bcrypt.hashSync(password, 10),
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username } });
        

        if (user && bcrypt.compareSync(password, user.password)) {
            res.status(200).json(user);
        } else {
            res.status(400).json({ error: "Invalid username or password" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

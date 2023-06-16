import sql from 'mssql';
import config from '../db/config.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginRequired = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
    }
};


export const register = async (req, res) => {
    const { username, password, email } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 9);
    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request()
            .input('username', sql.VarChar, username)
            .input('email', sql.VarChar, email)
            .query('SELECT * FROM Users WHERE username = @username OR email = @email');
        const user = result.recordset[0];
        if (user) {
            res.status(409).json({ error: 'This user exists' });
        } else {
            await pool.request()
                .input('username', sql.VarChar, username)
                .input('hashedpassword', sql.VarChar, hashedPassword)
                .input('email', sql.VarChar, email)
                .query('INSERT INTO users (username, hashedpassword, email) VALUES (@username, @hashedpassword, @email)');
            res.status(200).send({ message: 'User added' });
        }

    } catch (error) {
        res.status(500).json({ error: 'Error' });
    } finally {
        sql.close();
    }

};

export const login = async (req, res) => {
    const { username, password } = req.body;
    let pool = await sql.connect(config.sql);
    const result = await pool.request()
        .input('username', sql.VarChar, username)
        .query('SELECT * FROM users WHERE username = @username');
    const user = result.recordset[0];
    if (!user) {
        res.status(401).json({ error: 'Are you sure? Failed to Autheticate' });
    } else {
        if (!bcrypt.compareSync(password, user.hashedpassword)) {
            res.status(401).json({ error: 'Failed to authenticate.' });
        } else {
            const token = `JWT ${jwt.sign({ username: user.username, email: user.email }, config.jwt_secret)}`;
            res.status(200).json({ email: user.email, username: user.username, id: user.id, token: token });
        }
    }

};
import sql from 'mssql';
import config from '../db/config.js';

// // Get all users
export const getUsers = async (req,res) => {
    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request().query("select * from Users");
        res.status(200).json(result.recordset);
        // fetching the results;
    } catch (error) {
        res.status(201).json({ error: 'an error occurred while fetching an entity' });
    } finally {
        sql.close(); 
    }
};

// // Get a user
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        let pool = await sql.connect(config.sql);
        const result = await pool.request()
            .input("user_id", sql.Int, id)
            .query("select * from users where user_id = @user_id");
        res.status(200).json(result.recordset[0]);
    } catch (error) {
        res.status(500).json({ error: 'error when getting the entity' });
    } finally {
        sql.close();
    }
};

// // Create a post
export const createPost = async (req, res) => {
    try {
        const { description } = req.body;
        let pool = await sql.connect(config.sql);
        let insertTodo = await pool.request()
            .input("description", sql.VarChar, description) 
            .query("insert into posts (description) values (@description)"); 
        res.status(201).json({ message: 'post created' });
    } catch (error) {
        res.status(500).json({ error: 'error when creating post' });
    } finally {
        sql.close(); 
    }
};
//update a comment
export const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        let pool = await sql.connect(config.sql);
        await pool.request()
            .input("comment_id", sql.Int, id)
            .input("content", sql.VarChar, content)
            .query("UPDATE comment SET content = @content WHERE id = @comment_id");
        res.status(200).json({ message: 'comment made' });
    } catch (error) {
        res.status(500).json({ error: 'error when commenting' });
    } finally {
        sql.close();
    }
};
// // Delete a post
export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        await sql.connect(config.sql);
        await sql.query`DELETE FROM posts WHERE post_id = ${id}`;
        res.status(200).json({ message: 'post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'error when deleting the post' });
    } finally {
        sql.close();
    }
};
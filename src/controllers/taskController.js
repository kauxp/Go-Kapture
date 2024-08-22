import Task from "../models/Task.js";
import { Op } from 'sequelize';

export const createTask = async (req, res) => {
    const { user_id, title, description, status, priority, due_date } = req.body;
    try {
        const task = await Task.create({
            user_id,
            title,
            description,
            status,
            priority,
            due_date
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getAllTasks = async (req, res) => {
    const { page = 1, limit = 10 } = req.body; // Default to page 1 and limit 10

    try {
        const tasks = await Task.findAndCountAll({
            limit: parseInt(limit, 10),
            offset: (parseInt(page, 10) - 1) * parseInt(limit, 10),
            order: [['createdAt', 'DESC']] // Optional: Order by creation date
        });
        res.status(200).json({
            tasks: tasks.rows,
            totalCount: tasks.count,
            totalPages: Math.ceil(tasks.count / limit),
            currentPage: parseInt(page, 10)
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateTask = async (req, res) => {

    const { id } = req.params;
    const { title, description, status, priority } = req.body;
    try {
        const task = await Task.findOne({ where: { id } });
        if (task) {
            task.title = title;
            task.description = description;
            task.status = status;
            task.priority = priority;
            await task.save();
            res.status(200).json(task);
        } else {
            res.status(404).json({ error: "Task not found" });
        }
    }catch(err){
        res.status(500).json({ error: error.message });
    }
}

export const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findOne({ where: { id } });
        if (task) {
            await task.destroy();
            res.status(204).json();
        } else {
            res.status(404).json({ error: "Task not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const filterTasks = async (req, res) => {
    const { status, priority, due_date, page = 1, limit = 10 } = req.body;

    try {
        const queryOptions = {
            where: {},
            limit: parseInt(limit, 10),
            offset: (parseInt(page, 10) - 1) * parseInt(limit, 10),
            order: [['createdAt', 'DESC']] // Optional: Order by creation date
        };

        if (status) {
            queryOptions.where.status = status;
        }
        if (priority) {
            queryOptions.where.priority = priority;
        }
        if (due_date) {
            queryOptions.where.due_date = due_date;
        }

        const tasks = await Task.findAndCountAll(queryOptions);
        res.status(200).json({
            tasks: tasks.rows,
            totalCount: tasks.count,
            totalPages: Math.ceil(tasks.count / limit),
            currentPage: parseInt(page, 10)
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const searchTasks = async (req, res) => {
    const { search, page = 1, limit = 10 } = req.body;

    try {
        if (!search) {
            return res.status(400).json({ error: "Search query is required" });
        }

        const queryOptions = {
            where: {
                [Op.or]: [
                    { title: { [Op.iLike]: `%${search}%` } },  // Case-insensitive search
                    { description: { [Op.iLike]: `%${search}%` } }
                ]
            },
            limit: parseInt(limit, 10),
            offset: (parseInt(page, 10) - 1) * parseInt(limit, 10),
            order: [['createdAt', 'DESC']] // Optional: Order by creation date
        };

        const tasks = await Task.findAndCountAll(queryOptions);
        res.status(200).json({
            tasks: tasks.rows,
            totalCount: tasks.count,
            totalPages: Math.ceil(tasks.count / limit),
            currentPage: parseInt(page, 10)
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



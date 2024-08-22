import { createTask, getAllTasks, updateTask, deleteTask, filterTasks, searchTasks } from "../controllers/taskController.js";
import { Router } from "express";
import { auth } from "../middlewares/auth.js";

const router = Router();

router.post('/tasks', auth("Admin"), createTask);

router.get('/tasks', getAllTasks);

router.put('/tasks/:id', auth('Admin'), updateTask);

router.delete('/tasks/:id', auth('Admin'), deleteTask);

router.get('/tasks/filter', filterTasks);

router.get('/tasks/search', searchTasks);

export default router;
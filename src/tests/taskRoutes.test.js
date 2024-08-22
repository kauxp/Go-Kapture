// tests/taskRoutes.test.js
import request from 'supertest';
import app from '../index.js'; 
import { sequelize } from '../models/index.js'; 

beforeEach(async () => {
    await sequelize.sync({ force: true }); 
});

describe('Task API', () => {
    let taskId;

    test('POST /tasks - should create a new task', async () => {
        const response = await request(app)
            .post('/tasks')
            .send({
                user_id: 1,
                title: 'Test Task',
                description: 'This is a test task.',
                status: 'pending',
                priority: 'high',
                due_date: '2024-12-31'
            })
            .expect(201);

        expect(response.body).toHaveProperty('id');
        expect(response.body.title).toBe('Test Task');
        taskId = response.body.id; 
    });

    test('GET /tasks - should return paginated tasks', async () => {
        await request(app).post('/tasks').send({
            user_id: 1,
            title: 'Task 1',
            description: 'First task',
            status: 'pending',
            priority: 'medium',
            due_date: '2024-12-01'
        });

        await request(app).post('/tasks').send({
            user_id: 1,
            title: 'Task 2',
            description: 'Second task',
            status: 'completed',
            priority: 'low',
            due_date: '2024-12-02'
        });

        const response = await request(app)
            .get('/tasks')
            .query({ page: 1, limit: 1 })
            .expect(200);

        expect(response.body.tasks.length).toBe(1); 
        expect(response.body.totalCount).toBe(2); 
        expect(response.body.totalPages).toBe(2); 
    });

    test('PUT /tasks/:id - should update a task', async () => {
        await request(app).post('/tasks').send({
            user_id: 1,
            title: 'Task to Update',
            description: 'Old description',
            status: 'pending',
            priority: 'medium',
            due_date: '2024-12-31'
        });

        const response = await request(app)
            .put(`/tasks/${taskId}`)
            .send({
                title: 'Updated Task',
                description: 'Updated description',
                status: 'completed',
                priority: 'high'
            })
            .expect(200);

        expect(response.body.title).toBe('Updated Task');
        expect(response.body.description).toBe('Updated description');
        expect(response.body.status).toBe('completed');
    });

    test('DELETE /tasks/:id - should delete a task', async () => {
        const createResponse = await request(app)
            .post('/tasks')
            .send({
                user_id: 1,
                title: 'Task to Delete',
                description: 'Delete me',
                status: 'pending',
                priority: 'medium',
                due_date: '2024-12-31'
            })
            .expect(201); 
    
        const taskId = createResponse.body.id;
    
        await request(app)
            .delete(`/tasks/${taskId}`)
            .expect(204); 
    
        await request(app)
            .get(`/tasks/${taskId}`)
            .expect(404); 
    });
    

    test('GET /tasks/filter - should filter tasks', async () => {
        await request(app).post('/tasks').send({
            user_id: 1,
            title: 'Filter Task 1',
            description: 'Filter description 1',
            status: 'completed',
            priority: 'high',
            due_date: '2024-12-01'
        });

        await request(app).post('/tasks').send({
            user_id: 1,
            title: 'Filter Task 2',
            description: 'Filter description 2',
            status: 'pending',
            priority: 'medium',
            due_date: '2024-12-02'
        });

        const response = await request(app)
            .get('/tasks/filter')
            .query({ status: 'pending', page: 1, limit: 10 })
            .expect(200);

        expect(response.body.tasks.length).toBe(1); 
        expect(response.body.totalCount).toBe(1); 
    });

    test('GET /tasks/search - should search tasks by title or description', async () => {
        await request(app).post('/tasks').send({
            user_id: 1,
            title: 'Search Task',
            description: 'Searchable description',
            status: 'pending',
            priority: 'medium',
            due_date: '2024-12-31'
        });

        const response = await request(app)
            .get('/tasks/search')
            .query({ search: 'Searchable', page: 1, limit: 10 })
            .expect(200);

        expect(response.body.tasks.length).toBe(1); 
        expect(response.body.tasks[0].title).toBe('Search Task');
    });
});

import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': '6e713ecd-57df-4877-9a84-e619dbd38570'
    }
});

export const todolistAPI = {

    getTodolists() {
        return instance.get('/todo-lists')
    },

    createTodolist(title: string) {
        return instance.post('/todo-lists', {
            title: title
        })
    },

    deleteTodolist(todolistId: string) {
        return instance.delete(`/todo-lists/${todolistId}`)
    },

    updateTodolistTitle(todolistId: string, newTitle: string) {
        return instance.put(`/todo-lists/${todolistId}`, {
            title: newTitle
        })
    },

    getTasks(todolistId: string, count: number = 10, page: number = 1) {
        return instance.get(`/todo-lists/${todolistId}/tasks/?count=${count}&page=${page}`)
    },

    createTask(todolistId: string, title: string) {
        return instance.post(`/todo-lists/${todolistId}/tasks`, {
            title: title
        })
    },

    deleteTask(todolistId: string, taskId: string) {
        return instance.delete(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },

    updateTask(todolistId: string,
               taskId: string,
               title: string,
               description: string,
               completed: boolean,
               status: number,
               priority: number,
               startDate: string,
               deadline: string) {
        return instance.put(`/todo-lists/${todolistId}/tasks/${taskId}`, {
            title,
            description,
            completed,
            status,
            priority,
            startDate,
            deadline,
        })
    }
}
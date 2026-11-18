export type Task = {
    id: number;
    title: string;
    scheduledAt: Date;
    createdAt: Date;
    completed: boolean;
};

const tasks: Task[] = [];
let nextTaskId = 1;

export function createTask(title: string, scheduledAt: Date): Task {
    const task: Task = {
        id: nextTaskId,
        title: title.trim(),
        scheduledAt,
        createdAt: new Date(),
        completed: false,
    };

    nextTaskId++;

    tasks.push(task);

    return task;
}

export function resetTasks(): void {
    tasks.length = 0;
    nextTaskId = 1;
}

export function getTasks(): Task[]{
    return [...tasks];
}

export function getTaskById(id: number): Task | undefined {
    return tasks.find((task) => task.id === id);
}

export function updateTaskCompleted(
    id: number,
    completed: boolean
): Task | undefined {

    const task = tasks.find((task) => task.id === id);

    if (!task) {
        return undefined;
    }

    task.completed = completed;

    return task;
}

export function deleteTask(id: number): Task | undefined {
    const index = tasks.findIndex((task) => task.id === id);

    if (index === -1) {
        return undefined;
    }

    const [deletedTask] = tasks.splice(index, 1);

    return deletedTask;
}
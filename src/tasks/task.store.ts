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
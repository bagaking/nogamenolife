import {TaskStatus, TaskSourceType} from "./ActiveTaskModel"


export const TaskStatusColor = {
    [TaskStatus.NotStarted]: 'orange',
    [TaskStatus.Arranging]: 'blue',
    [TaskStatus.InProgress]: 'green',
    [TaskStatus.Reviewing]: 'cyan',
    [TaskStatus.Completed]: 'red',
};

export const TaskSourceTypeColor = {
    [TaskSourceType.Planning]: 'green',
    [TaskSourceType.Insert]: 'orange',
    [TaskSourceType.Flash]: 'purple',
};
export type ActiveTaskModel = {
    id: number;
    title: string;
    created_time: string;
    finish_time: string;
    first_finish_time: string;
    status: TaskStatus;
    task_source_type: TaskSourceType;
    task_gene: string;
    task_info_and_plan: string;
    energy_occupied: number;
    self_efficacy: number;
    task_memo: string;
    context: string;
    assistantPeople: string;
    attachment: string;
    priority: number;
    label: string;
    created_from: string;
};

export enum TaskStatus {
    NotStarted = '待开始',
    InProgress = '进展中',
    Arranging = '安排中',
    Reviewing = '复盘中',
    Completed = '结束',
}

export enum TaskSourceType {
    Planning = '规划',
    Insert = '插入',
    Flash = '闪念'
}
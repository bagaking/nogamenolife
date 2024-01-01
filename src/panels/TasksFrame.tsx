import React, { useState, useEffect } from 'react';
import { TabLayout } from './TabLayout';
import ActiveTask from './activeTask/ActiveTask';
import {ActiveTaskModel, TaskSourceType, TaskStatus} from "@/model";

const createMockData = (id: number): ActiveTaskModel => ({
    id: id,
    title: 'Task ' + id,
    created_time: new Date().toString(),
    finish_time: new Date().toString(),
    first_finish_time: new Date().toString(),
    status: TaskStatus.NotStarted,
    task_source_type: TaskSourceType.Planning,
    task_gene: 'task_gene ' + id,
    task_info_and_plan: 'task_info_and_plan ' + id,
    energy_occupied: Math.floor(Math.random() * 300),
    self_efficacy: Math.floor(Math.random()*5),
    task_memo: 'task_memo . ' + id,
    context: 'context ' + id,
    assistantPeople: 'assistantPeople ' + id,
    attachment: 'attachment ' + id,
    priority: Math.floor(id * 3),
    label: 'label ' + id,
    created_from: '●' + id,
})

const mockData = [
    createMockData(Math.round(Math.random()*1000)),
    createMockData(Math.round(Math.random()*1000)),
    createMockData(Math.round(Math.random()*1000)),
    createMockData(Math.round(Math.random()*1000)),
    createMockData(Math.round(Math.random()*1000)),
    createMockData(Math.round(Math.random()*1000)),
    createMockData(Math.round(Math.random()*1000)),
    createMockData(Math.round(Math.random()*1000)),
]


export const TasksFrame: React.FC = () => {

    const [activeTasks, setActiveTasks] = useState([]);

    useEffect(() => {
        const activeTasksData: ActiveTaskModel[] = mockData;
        setActiveTasks(activeTasksData);
    }, []);

    return (
        <TabLayout
            tabs={[
                {
                    key: "1",
                    tab: "Active Tasks",
                    content: <ActiveTask activeTasks={activeTasks} />,
                },
                /* ... */
            ]}
        />
    );
};
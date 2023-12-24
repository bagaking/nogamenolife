import React, { useState, useEffect } from 'react';
import { ActiveTaskModel, TaskStatus, TaskSourceType } from './model'
import ActiveTask from './components/ActiveTask';

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

const App: React.FC = () => {
    const [activeTasks, setActiveTasks] = useState([]);

    // 任务数据可以是从API接口获取，这里为了示例，我们假设已经有了任务数据
    useEffect(() => {
        const activeTasksData: ActiveTaskModel[] = mockData;
        setActiveTasks(activeTasksData);
    }, []);

    return (
        <div>
            <title>Active Tasks</title>
            <h2>Active Tasks</h2>
            <ActiveTask activeTasks={activeTasks}/>
        </div>
    );
};

export default App;
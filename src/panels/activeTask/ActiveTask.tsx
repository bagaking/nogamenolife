import React, { useState, useEffect, useRef } from 'react';
import { Table, Avatar, Badge, Tag, Button } from 'antd';

import { ActiveTaskModel, TaskStatus, TaskSourceType, TaskStatusColor, TaskSourceTypeColor } from '@/model';
import {PopoverSelectTag} from '@/components/PopoverSelectTag'
import {ResponsiveDate} from '@/components/ResponsiveDate'
import { RotatingColumnTitle } from '@/components/RotatingColumnTitle';
import {TaskTimeUnitConverter} from '@/components/TaskTimeUnitConverter';
import { activeTaskColumns } from './activeTaskColumns';
import type { ActiveTaskColumnKey } from './activeTaskColumns';
import './ActiveTask.less';

const handleStatusChange = (record: ActiveTaskModel, value: TaskStatus) => {
    console.log(`to implement: The status of task ${record.id} has been changed to ${value}`);
};

const handleEnergyChange = (record: ActiveTaskModel, value: number) => {
    console.log(`to implement: The energy_occupied of task ${record.id} has been changed to ${value}`);
};

const columnRenderers: Partial<Record<ActiveTaskColumnKey, (text: any, record: ActiveTaskModel) => any>> = {
    title: (text: string, record: ActiveTaskModel) => (
            <div className='task-title'>
                <Badge count={record.priority} className='title-badge'>
                    <Avatar src={`/path/to/your/images/${record.task_gene}.jpg`} />
                    <a href={`/activeTask/${record.id}`}>{text}</a>
                </Badge>
            </div>
        ),
    created_time: (t : string) => <ResponsiveDate date={new Date(t)} />,
    finish_time: (t : string) => <ResponsiveDate date={new Date(t)} />,
    first_finish_time: (t : string) => <ResponsiveDate date={new Date(t)} />,
    status: (value: TaskStatus, record: ActiveTaskModel) => {
            const options = Object.values(TaskStatus).map(status => ({
                value: status,
                color: TaskStatusColor[status],
            }));

            return (
                <PopoverSelectTag
                    value={value}
                    options={options}
                    onChange={(newValue: TaskStatus) => handleStatusChange(record, newValue)}
                />
            );
        },
    task_source_type: (value: TaskSourceType, _: ActiveTaskModel) => {
            return <Tag color={TaskSourceTypeColor[value]}>{value}</Tag>;
        },
    energy_occupied: (value: number, record: ActiveTaskModel) => {
            return <TaskTimeUnitConverter value={value} onChange={(newValue: number) => handleEnergyChange(record, newValue)} />;
        },
    action: (_: any, record: ActiveTaskModel) => (
            <div className='task-actions'>
                <Button type='primary'>结转</Button>
                <Button type='primary'>延展</Button>
                <Button type='primary'>推迟</Button>
                <Button type='primary'>终结</Button>
                <Button type='primary'>挂起</Button>
            </div>
        )
};

const getColumnConfig = (columnConfig: (typeof activeTaskColumns)[number]) => {
    return {
        title: (
            <RotatingColumnTitle
                chineseTitle={columnConfig.label}
                abbreviation={columnConfig.abbreviation}
            />
        ),
        dataIndex: columnConfig.key,
        key: columnConfig.key,
        render: columnRenderers[columnConfig.key],
    };
};


const ActiveTask: React.FC<{activeTasks: ActiveTaskModel[]}> = ({activeTasks}) => {
    const columns = activeTaskColumns.map(getColumnConfig);

    // 设置初始高度
    const [tableHeight, setTableHeight] = useState(window.innerHeight - 100);



    // 当窗口尺寸发生变化时，更新表格的高度
    useEffect(() => {
        const handleResize = () => {
            setTableHeight(window.innerHeight - 100);
        };
        handleResize(); // 在组件挂载时立即调用一次
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    console.log('tableHeight', tableHeight)

    return (

        <Table
            className="active-task"
            columns={columns}
            dataSource={activeTasks}
            rowKey="id"
            pagination={false}
            scroll={{y:tableHeight}}
            style={{height:"100%"}}
        />

    );
};

export default ActiveTask;

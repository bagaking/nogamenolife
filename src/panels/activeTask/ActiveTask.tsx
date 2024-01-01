import React, { useState, useEffect, useRef } from 'react';
import { Table, Avatar, Badge, Tag, Button } from 'antd';

import { ActiveTaskModel, TaskStatus, TaskSourceType, TaskStatusColor, TaskSourceTypeColor } from '@/model';
import {PopoverSelectTag} from '@/components/PopoverSelectTag'
import {ResponsiveDate} from '@/components/ResponsiveDate'
import { RotatingColumnTitle } from '@/components/RotatingColumnTitle';
import {TaskTimeUnitConverter} from '@/components/TaskTimeUnitConverter';
import './ActiveTask.less';

const handleStatusChange = (record: ActiveTaskModel, value: TaskStatus) => {
    console.log(`to implement: The status of task ${record.id} has been changed to ${value}`);
};

const handleEnergyChange = (record: ActiveTaskModel, value: number) => {
    console.log(`to implement: The energy_occupied of task ${record.id} has been changed to ${value}`);
};

const ColumnInfoConf: { [key: string]: {
        label: string,
        abbreviation: string,
        render?: (text: any, record: ActiveTaskModel) => any,
    }
} = {
    id: { label: '标识', abbreviation: 'ID' },
    title: { label: '标题', abbreviation: 'Title', render: (text: string, record: ActiveTaskModel) => (
            <div className='task-title'>
                <Badge count={record.priority} className='title-badge'>
                    <Avatar src={`/path/to/your/images/${record.task_gene}.jpg`} />
                    <a href={`/activeTask/${record.id}`}>{text}</a>
                </Badge>
            </div>
        )  },
    created_time: { label: '创建时间', abbreviation: 'CT', render: (t : string) => <ResponsiveDate date={new Date(t)} /> },
    finish_time: { label: '完成时间', abbreviation: 'FT', render: (t : string) => <ResponsiveDate date={new Date(t)} /> },
    first_finish_time: { label: '首次完成时间', abbreviation: 'FFT', render: (t : string) => <ResponsiveDate date={new Date(t)} /> },
    status: { label: '状态', abbreviation: 'Status', render: (value: TaskStatus, record: ActiveTaskModel) => {
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
        } },
    task_source_type: { label: '来源类型', abbreviation: 'TST',render: (value: TaskSourceType, _: ActiveTaskModel) => {
            return <Tag color={TaskSourceTypeColor[value]}>{value}</Tag>;
        } },
    task_gene: { label: '任务类别', abbreviation: 'TG' },
    task_info_and_plan: { label: '信息和计划', abbreviation: 'TIP' },
    energy_occupied: { label: '精力消耗', abbreviation: 'EO', render: (value: number, record: ActiveTaskModel) => {
            return <TaskTimeUnitConverter value={value} onChange={(newValue: number) => handleEnergyChange(record, newValue)} />;
        },
    },
    self_efficacy: { label: '自我效能', abbreviation: 'SE' },
    task_memo: { label: '补充', abbreviation: 'TM' },
    context: { label: '上下文', abbreviation: 'CTX' },
    assistant_people: { label: '协作者', abbreviation: 'AP' },
    attachment: { label: '附件', abbreviation: 'Attachment' },
    priority: { label: '优先级', abbreviation: 'Priority' },
    label: { label: '标签', abbreviation: 'Label' },
    created_from: { label: '来源任务', abbreviation: 'CF' },
    action: { label: '操作', abbreviation: 'ACT', render: (_: any, record: ActiveTaskModel) => (
            <div className='task-actions'>
                <Button type='primary'>结转</Button>
                <Button type='primary'>延展</Button>
                <Button type='primary'>推迟</Button>
                <Button type='primary'>终结</Button>
                <Button type='primary'>挂起</Button>
            </div>
        )
    },
};

const getColumnConfig = (dataIndex: keyof typeof ColumnInfoConf) => {
    const columnConfig = ColumnInfoConf[dataIndex];

    return {
        title: (
            <RotatingColumnTitle
                chineseTitle={columnConfig.label}
                abbreviation={columnConfig.abbreviation}
            />
        ),
        dataIndex: dataIndex,
        key: dataIndex,
        render: columnConfig.render ? columnConfig.render : undefined,
    };
};


const ActiveTask: React.FC<{activeTasks: ActiveTaskModel[]}> = ({activeTasks}) => {
    const columns = Object.keys(ColumnInfoConf).map((key) =>
        getColumnConfig(key as keyof typeof ColumnInfoConf)
    );

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
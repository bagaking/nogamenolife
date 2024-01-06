import type { ActiveTaskModel } from '../../model';

export type ActiveTaskColumnKey = keyof ActiveTaskModel | 'action';

export type ActiveTaskColumnInfo = {
    key: ActiveTaskColumnKey;
    label: string;
    abbreviation: string;
};

export const activeTaskColumns = [
    { key: 'id', label: '标识', abbreviation: 'ID' },
    { key: 'title', label: '标题', abbreviation: 'Title' },
    { key: 'created_time', label: '创建时间', abbreviation: 'CT' },
    { key: 'finish_time', label: '完成时间', abbreviation: 'FT' },
    { key: 'first_finish_time', label: '首次完成时间', abbreviation: 'FFT' },
    { key: 'status', label: '状态', abbreviation: 'Status' },
    { key: 'task_source_type', label: '来源类型', abbreviation: 'TST' },
    { key: 'task_gene', label: '任务类别', abbreviation: 'TG' },
    { key: 'task_info_and_plan', label: '信息和计划', abbreviation: 'TIP' },
    { key: 'energy_occupied', label: '精力消耗', abbreviation: 'EO' },
    { key: 'self_efficacy', label: '自我效能', abbreviation: 'SE' },
    { key: 'task_memo', label: '补充', abbreviation: 'TM' },
    { key: 'context', label: '上下文', abbreviation: 'CTX' },
    { key: 'assistantPeople', label: '协作者', abbreviation: 'AP' },
    { key: 'attachment', label: '附件', abbreviation: 'Attachment' },
    { key: 'priority', label: '优先级', abbreviation: 'Priority' },
    { key: 'label', label: '标签', abbreviation: 'Label' },
    { key: 'created_from', label: '来源任务', abbreviation: 'CF' },
    { key: 'action', label: '操作', abbreviation: 'ACT' },
] satisfies ReadonlyArray<ActiveTaskColumnInfo>;

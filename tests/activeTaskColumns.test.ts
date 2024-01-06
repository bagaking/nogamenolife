import assert from 'node:assert/strict';

import type { ActiveTaskModel } from '../src/model';
import { activeTaskColumns, ActiveTaskColumnKey } from '../src/panels/activeTask/activeTaskColumns';

const activeTaskModelKeys = [
    'id',
    'title',
    'created_time',
    'finish_time',
    'first_finish_time',
    'status',
    'task_source_type',
    'task_gene',
    'task_info_and_plan',
    'energy_occupied',
    'self_efficacy',
    'task_memo',
    'context',
    'assistantPeople',
    'attachment',
    'priority',
    'label',
    'created_from',
] satisfies Array<keyof ActiveTaskModel>;

const allowedColumnKeys = new Set<ActiveTaskColumnKey>([
    ...activeTaskModelKeys,
    'action',
]);

const columnKeys = activeTaskColumns.map((column) => column.key);

assert.deepEqual(columnKeys, [
    'id',
    'title',
    'created_time',
    'finish_time',
    'first_finish_time',
    'status',
    'task_source_type',
    'task_gene',
    'task_info_and_plan',
    'energy_occupied',
    'self_efficacy',
    'task_memo',
    'context',
    'assistantPeople',
    'attachment',
    'priority',
    'label',
    'created_from',
    'action',
]);

assert.equal(columnKeys.includes('assistant_people' as ActiveTaskColumnKey), false);

for (const column of activeTaskColumns) {
    assert.equal(allowedColumnKeys.has(column.key), true, `${column.key} is not an ActiveTaskModel key or action`);
    assert.notEqual(column.label.trim(), '', `${column.key} label must be non-empty`);
    assert.notEqual(column.abbreviation.trim(), '', `${column.key} abbreviation must be non-empty`);
}

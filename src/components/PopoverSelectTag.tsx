import React from 'react';
import { Tag, Select, Popover } from 'antd';

const { Option } = Select;

type OptionData = {
    value: string | number;
    color?: string;
};

type PopoverSelectTagProps = {
    value: string | number;
    options: OptionData[];
    onChange: (newValue: string | number) => any;
};

export const PopoverSelectTag: React.FC<PopoverSelectTagProps> = ({ value, options, onChange }) => {
    const handleSelectChange = (newValue: string | number) => {
        onChange(newValue);
    };

    const selectElement = (
        <Select
            defaultValue={value}
            onChange={handleSelectChange}
            style={{ minWidth: '100px' }}
        >
            {options.map((option) => (
                <Option key={option.value} value={option.value}>
                    <Tag color={option.color}>{option.value}</Tag>
                </Option>
            ))}
        </Select>
    );

    const currentValueColor = options.find(option => option.value === value)?.color;

    return (
        <Popover content={selectElement} trigger="hover">
            <Tag color={currentValueColor}>{value}</Tag>
        </Popover>
    );
};
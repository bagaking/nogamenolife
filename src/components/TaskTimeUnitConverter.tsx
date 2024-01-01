import React, { useState, useEffect } from 'react';
import { Input, Tooltip, Popover, Badge } from 'antd';

// 定义 props 类型
interface Props {
    value: number;
    onChange: (value: number) => void;
}

export const TaskTimeUnitConverter: React.FC<Props> = ({ value, onChange }) => {
    const [cc, setCc] = useState(0);
    const [pomo, setPomo] = useState(0);
    const [q, setQ] = useState(0);
    const [minutes, setMinutes] = useState(value || 0);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const mins = parseInt(e.target.value, 10);
        setMinutes(mins);
        onChange(mins);
    };

    useEffect(() => {
        let cc = 0, pomo = 0, q = 0, mins = minutes;
        for(;mins >= 15;) {
            if(mins > 90) { cc = Math.floor(mins / 90); mins %= 90 }
            else if (mins >= 30) { pomo = Math.floor(mins / 30); mins %= 30 }
            else if (mins >= 15) { q = Math.floor(mins / 15); mins %= 15 }
        }
        if (cc > 0) { if(q >= 1) { pomo += 1; } q = mins = 0; }
        else if (mins >= 8) { q += 1; mins = 0 }
        setCc(cc); setPomo(pomo); setQ(q);
    }, [minutes]);

    return (
        <div>

            <Popover content={
                <div>
                    <Input type="number" onChange={handleInputChange} value={minutes} style={{width: "100%"}} />
                </div>
            } title="请输入分钟数" >
                {/* 只在有值的时候才显示对应的 Badge */}
                {cc ?  <Badge count={cc + 'cc'} style={{backgroundColor: "blueviolet"}} /> : null}
                {pomo ?  <Badge count={pomo + 'pomo'} style={{backgroundColor: "deepskyblue"}} /> : null}
                {q ?  <Badge count={q + 'q'} style={{backgroundColor: "cadetblue"}} /> : null}
            </Popover>
        </div>
    );
};
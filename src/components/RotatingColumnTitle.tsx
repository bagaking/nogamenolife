import React, { useState, useEffect } from 'react';
import './RotatingColumnTitle.less';

type RotatingColumnTitleProps = {
    chineseTitle: string;
    abbreviation: string;
};

export const RotatingColumnTitle: React.FC<RotatingColumnTitleProps> = ({ chineseTitle, abbreviation }) => {
    const [isChineseTitleVisible, setIsChineseTitleVisible] = useState(true);

    useEffect(() => {
        const timer = setInterval(() => {
            setIsChineseTitleVisible(!isChineseTitleVisible);
        }, 8000); // 每4秒切换一次

        return () => {
            clearInterval(timer);
        };
    }, [isChineseTitleVisible]);

    return (
        <div className="rotating-column-title">
            <div className={`column-title ${isChineseTitleVisible ? 'visible' : 'invisible'}`}>
                {chineseTitle}
            </div>
            <div className={`column-title ${!isChineseTitleVisible ? 'visible' : 'invisible'}`}>
                {abbreviation}
            </div>
        </div>
    );
};
import React, { useRef, useState, useEffect } from 'react';
import { format as dateFnsFormat } from "date-fns";

type ResponsiveDateProps = { date: Date };

export const ResponsiveDate: React.FC<ResponsiveDateProps> = ({ date }) => {
    const containerRef = useRef(null);
    const [format, setFormat] = useState('MMdd');

    useEffect(() => {
        if (!containerRef.current) return;

        const resizeListener = () => {
            const width = containerRef.current.offsetWidth;
            let newFormat;

            if (width < 40) {
                newFormat = 'MMdd';
            } else if (width < 60) {
                newFormat = 'MM/dd';
            } else if (width < 90) {
                newFormat = 'yy/MMdd';
            }  else if (width < 120) {
                newFormat = 'yy/MM/dd';
            } else if (width < 160) {
                newFormat = 'yyyy/MM/dd';
            } else {
                newFormat = 'ddd, yyyy-MM-dd';
            }

            setFormat(newFormat);
        };

        resizeListener();

        window.addEventListener('resize', resizeListener);

        return () => {
            window.removeEventListener('resize', resizeListener);
        };
    }, []);

    const formattedDate = dateFnsFormat(date, format);

    return (
        <div className="responsive-date" ref={containerRef}>
            {formattedDate}
        </div>
    );
};
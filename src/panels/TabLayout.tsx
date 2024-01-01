import React from 'react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

type TabItem = {
    key: string;
    tab: string;
    content: React.ReactNode;
};

type TabLayoutProps = {
    tabs: TabItem[];
    tabPosition?: "top" | "right" | "bottom" | "left";
    className?: string; /* 添加 className 属性 */
};

export const TabLayout: React.FC<TabLayoutProps> = ({
                                                        tabs,
                                                        tabPosition = "top",
                                                        className, /* 使用 className 属性 */
                                                    }) => {
    return (
        <Tabs defaultActiveKey="1" tabPosition={tabPosition} className={className}>
            {tabs.map(({ key, tab, content }) => (
                <TabPane tab={tab} key={key}>
                    {content}
                </TabPane>
            ))}
        </Tabs>
    );
};
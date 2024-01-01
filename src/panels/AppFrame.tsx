import React from 'react';
import { Menu, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import {TasksFrame} from "@/panels/TasksFrame";
import {BotsFrame} from "@/panels/BotsFrame";

export const AppFrame: React.FC = () => {
    const [currentTab, setCurrentTab] = React.useState('settings');

    const handleClick = (e: any) => {
        setCurrentTab(e.key);
    };

    return (
        <div style={{ display: 'flex' }}>
            <Menu
                onClick={handleClick}
                selectedKeys={[currentTab]}
                mode="vertical"
                style={{ width: '200px', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
                <Avatar size="large" style={{ marginTop: '30px', marginBottom: '30px' }} icon={<UserOutlined />} />
                <Menu.Item key="bots">Bots</Menu.Item>
                <Menu.Item key="tasks">Tasks</Menu.Item>
                <Menu.Item key="settings">Settings</Menu.Item>
            </Menu>
            <div style={{ flexGrow: 1, padding: '30px' }}>
                {currentTab === 'tasks' && <TasksFrame/>}
                {currentTab === 'bots' && <BotsFrame/>}
                {currentTab === 'settings' && <p>Settings content goes here.</p>}
            </div>
        </div>
    );
};

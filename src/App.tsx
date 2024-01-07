import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import {AppFrame} from "./panels/AppFrame";
import {EditorPanel} from "@/panels/EditorPanel";

const App: React.FC = () => {
    return (
        // <EditorPanel/>
        <Router>
            <Routes>
                <Route path="/app-frame" element={<AppFrame/>} />
                <Route path="/" element={<div>首页</div>} />
                <Route path="/editor" element={<EditorPanel/>} />
            </Routes>
        </Router>
    );
};

export default App;
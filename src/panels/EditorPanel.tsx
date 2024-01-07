import React, {useState, useEffect, useRef} from "react";
import MonacoEditor, {monaco} from 'react-monaco-editor';
import {Button} from "antd";
import {GetBridge} from "%/framework/vm/types";


export const EditorPanel: React.FC = () => {

    const [history, setHistory] = useState('-EMPTY-');
    const [runCode, setRunCode] = useState('your code goes here');

    function run() {
        GetBridge().send("OnCodeExecute", runCode)
        if(!hookSet) {
            GetBridge().on("updateHistory", (ctx, text) => {
                setHistory(text)
            })
            hookSet = true
        }
    }

    let hookSet = false


    function editorDidMount(editor: monaco.editor.IEditor, v: any) {
        // console.log('editorDidMount', editor, v);
        editor.focus();
    }

    return <div style={{width:"100vw", height:"90vh"}}>
        <MonacoEditor
            width="100vw"
            height="65vh"
            language="markdown"
            theme="vs-dark"
            value={history}
            options={{
                selectOnLineNumbers: true,
                roundedSelection: false,
                readOnly: true,
                cursorStyle: "line",
                automaticLayout: true,
            }}
        />
        <MonacoEditor
            width="100vw"
            height="25vh"
            language="markdown"
            theme="vs-dark"
            editorDidMount={editorDidMount}
            onChange={setRunCode}
            value={runCode}
            options={{
                // selectOnLineNumbers: true,
                roundedSelection: false,
                readOnly: false,
                cursorStyle: "line",
                automaticLayout: true,
            }}
        />
        <Button style={{width:"100%"}} onClick={run} >Execute</Button>
    </div>
};

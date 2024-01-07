// File: src/components/CodeEditor.tsx

import React from 'react';
import Editor from '@monaco-editor/react';

type CodeEditorProps = {
    language: string;
    value: string;
    onChange: (value: string | undefined) => void;
};

export const MonacoEditor: React.FC<CodeEditorProps> = ({ language, value, onChange }) => {

    const handleEditorChange = (newValue: string | undefined, _event: any) => {
        onChange(newValue);
    };

    return (
        <Editor
            height="90vh"
            defaultLanguage={language}
            value={value}
            onChange={handleEditorChange}
            options={{
                selectOnLineNumbers: true,
                roundedSelection: false,
                readOnly: false,
                cursorStyle: "line",
                automaticLayout: false,
            }}
        />
    );
};
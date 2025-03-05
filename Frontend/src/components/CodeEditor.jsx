import React, { useEffect, useState } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-dark.css';

const CodeEditor = ({ initialCode }) => {
    const [ code, setCode ] = useState(initialCode);

    const highlightCode = (code) => Prism.highlight(code, Prism.languages.javascript, 'javascript');

    return (
        <Editor
            value={code}
            onValueChange={setCode}
            highlight={highlightCode}
            padding={10}
            style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
                height: '100%',
                width: '100%',
                border: "none",
                outline: "none",
                // backgroundColor: '#282c34',
                // border: '1px solid #ddd',
                // borderRadius: '4px',
            }}
        />
    );
};

export default CodeEditor;
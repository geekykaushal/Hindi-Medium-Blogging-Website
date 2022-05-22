import React, { useState } from 'react';

// Components
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';



// Hooks version of the Class below (done by me)
const WEditor = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const onEditorStateChange = editorState => {
        return setEditorState(editorState)
    }

    return (
        <div className="editor">
            <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={onEditorStateChange}
            />
            {
                console.log('editorState => ', convertToRaw(editorState.getCurrentContent()))
            }
        </div>
    )
}

export default WEditor
import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export const Notes = () => (
  <Editor
    spellCheck
    toolbar={{
      options: ['fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'remove'],
    }}
  />
);

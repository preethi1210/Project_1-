import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const modules = {
    toolbar: [
        // Dropdown for heading levels
        [{ header: [1, 2, 3, false] }],
        // Bold, italic, underline, strikethrough, blockquote
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        // Ordered and unordered lists, and indent options
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        // Text alignment options
        [{ align: [] }],
        // Link, image, and video insertion
        ['link', 'image', 'video'],
        // Text color and background color
        [{ color: [] }, { background: [] }],
        // Clean formatting
        ['clean']
    ]
};
const formats = [
    'header',        // Heading levels (e.g., h1, h2, h3)
    'bold',          // Bold text
    'italic',        // Italic text
    'underline',     // Underlined text
    'strike',        // Strikethrough text
    'blockquote',    // Blockquote for quotations
    'list',          // Ordered and unordered lists
    'bullet',        // Bullet lists
    'indent',        // Indentation (increase or decrease)
    'align',         // Text alignment (left, center, right, justify)
    'link',          // Hyperlinks
    'image',         // Images
    'video',         // Video embeds
    'color',         // Text color
    'background',    // Background color for text
    'clean'          // Remove formatting
];
export default function CreatePost(){
    const [title,setTitle]=useState('');
    const [summary,setSummary]=useState('');
    const [content,setContent]=useState('');
    const [files,setFiles]=useState('');
   function createNewPost(e){
    const data=new FormData();
    data.set('title',title);
    data.set('summary',summary);
    data.set('content',content);
    data.set('file',files[0]);
e.preventDefault();
 fetch('http://localhost:4000/post',{
    method:'POST',
    body:data,
 })
   }
    
    return(
        <form onSubmit={createNewPost} >
            <input type="title" placeholder={'Title'} value={title} onChange={e=>setTitle(e.target.value)}/>
            <input type="Summary" placeholder={'Summary'} value={summary} onChange={e=>setSummary(e.target.value)} />
            <input type="files" value={files} onChange={e=>setFiles(e.target.files)}  />
            <ReactQuill value={content} onChange={e=>setContent(e.target.value)} modules={modules} formats={formats}/>
            <button style={{marginTop:'5px'}}>Post</button>
        </form>
    );
}
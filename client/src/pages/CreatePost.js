import React, { useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { Navigate } from "react-router-dom";

const modules = {
    toolbar: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        [{ align: [] }],
        ['link', 'image', 'video'],
        [{ color: [] }, { background: [] }],
        ['clean']
    ]
};

const formats = [
    'header', 'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent', 'align', 'link', 'image', 'video',
    'color', 'background', 'clean'
];

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState(null); // Initialize with null, or empty FileList
    const [redirect, setRedirect] = useState(false); // Initialize with null, or empty FileList

    async function createNewPost(e) {
        e.preventDefault();

        if (!title || !summary || !content || !files) {
            alert("Please fill in all fields.");
            return;
        }

        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);

        const response = await fetch('http://localhost:4000/post', {
            method: 'POST',
            body: data,
        });
        if(response.ok){
            setRedirect(true);
        }
    }
    if(redirect){
        return <Navigate to={'/'}/>
    }
    return (
        <form onSubmit={createNewPost}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="Summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
            />
            <input
                type="file"
                onChange={(e) => setFiles(e.target.files)}
            />
            <ReactQuill
                value={content}
                onChange={(value) => setContent(value)}
                modules={modules}
                formats={formats}
            />
            <button style={{ marginTop: '5px' }}>Post</button>
        </form>
    );
}

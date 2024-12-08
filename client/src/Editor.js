import ReactQuill from "react-quill";

export default function Editor({ value, onChange }) { // Correctly destructure props
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            [{ align: [] }],
            ['link', 'image', 'video'],
            [{ color: [] }, { background: [] }],
            ['clean'],
        ],
    };

    return (
        <ReactQuill
            value={value}        // Controlled value
            theme="snow"         // Quill theme
            onChange={onChange}  // Handle changes
            modules={modules}    // Toolbar options
        />
    );
}

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PostPage() {
    const { id } = useParams();
    const [postInfo, setPostInfo] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchPost() {
            try {
                const response = await fetch(`http://localhost:4000/post/${id}`);
                if (!response.ok) {
                    throw new Error(`Error fetching post: ${response.statusText}`);
                }
                const post = await response.json();
                setPostInfo(post);
            } catch (error) {
                console.error("Failed to fetch post:", error);
                setError("Failed to load the post. Please try again later.");
            }
        }

        fetchPost();
    }, []);

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (!postInfo) {
        return <div className="loading-message">Loading...</div>;
    }

    return (
        <div className="post-page">
            <div className="image" >
                <img src={`http://localhost:4000/${postInfo.cover}`} alt="Post Cover" />
            </div>
            <h1>{postInfo.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: postInfo.content }}></div>
        </div>
    );
}

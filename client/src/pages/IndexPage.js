import { useEffect, useState } from "react";
import Post from "../Post";

export default function IndexPage() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Add loading state
    const [error, setError] = useState(null); // Add error state

    useEffect(() => {
        fetch('http://localhost:4000/post')
            .then(response => response.json())
            .then(data => {
                setPosts(data);  // Update the state with the fetched posts
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
                setError('Failed to load posts');
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div>Loading posts...</div>; // You can add a loading spinner or animation here
    }

    if (error) {
        return <div>{error}</div>; // Show error message
    }

    return (
        <div>
            {posts.length > 0 ? (
                posts.map((post) => (
                    <Post
                        key={post._id} // Ensure `key` is unique for each post
                        title={post.title}
                        summary={post.summary}
                        cover={post.cover || '/default-cover.jpg'} // Provide a default cover if missing
                        content={post.content}
                        createdAt={post.createdAt}
                        author={post.author || { username: 'Unknown' }} // Ensure `author` is available
                    />
                ))
            ) : (
                <p>No posts available</p>
            )}
        </div>
    );
}

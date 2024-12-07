import { format } from "date-fns";
import { Link } from 'react-router-dom';

export default function Post({ _id, title, summary, cover, content, createdAt, author }) {
    const formattedDate = createdAt ? format(new Date(createdAt), 'MMM d, yyyy HH:mm') : 'Invalid Date';

    return (
        <div className="post">
            <div className="image">
                <Link to={`/post/${_id}`}> {/* Use _id instead of id */}
                    <img src={`http://localhost:4000/${cover}`} alt="Cover image" />
                </Link>
            </div>
            <div className="texts">
                <Link to={`/post/${_id}`}> {/* Use _id instead of id */}
                    <h2>{title}</h2>
                </Link>
                <p className="info">
                    <a href="#" className="author">
                        {author ? author.username : 'Unknown'}
                    </a>
                    <time>{formattedDate}</time>  {/* Display formatted date */}
                </p>
                <p className="summary">{summary}</p>
            </div>
        </div>
    );
}

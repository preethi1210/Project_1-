import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
    const [username, setUserName] = useState(null);

    useEffect(() => {
        // Fetch profile information on component mount
        fetch('http://localhost:4000/profile', {
            credentials: 'include',
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Failed to fetch profile");
            })
            .then((userinfo) => {
                setUserName(userinfo.username);
            })
            .catch((error) => {
                console.error("Error fetching profile:", error);
            });
    }, []);

    function logout() {
        fetch('http://localhost:4000/logout', {
            method: 'POST',
            credentials: 'include',
        })
            .then((response) => {
                if (response.ok) {
                    setUserName(null); // Clear username on successful logout
                }
            })
            .catch((error) => {
                console.error("Error during logout:", error);
            });
    }

    return (
        <header>
            <Link to="/" className="logo">MyBlog</Link>
            <nav>
                {username && (
                    <>
                        <Link to="/create">Create new post</Link>
                        <a onClick={logout} style={{ cursor: "pointer" }}>
                            Logout
                        </a>
                    </>
                )}
                {!username && (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </nav>
        </header>
    );
}

import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';

export default function Header() {
    const { userInfo, setUserInfo } = useContext(UserContext);

    useEffect(() => {
        // Fetch profile information on component mount
        fetch('http://localhost:4000/profile', {
            credentials: 'include',
        })
            .then((response) => {
                response.json().then(userInfo => {
                    setUserInfo(userInfo);
                });
            });
    }, [setUserInfo]);

    function logout() {
        fetch('http://localhost:4000/logout', {
            method: 'POST',
            credentials: 'include',
        });
        setUserInfo(null); // Clear the userInfo on logout
    }

    const username = userInfo?.username;
    return (
        <header>
            <Link to="/" className="logo">MyBlog</Link>
            <nav>
                {username ? (
                    <>
                        <Link to="/create">Create new post</Link>
                        <a onClick={logout} style={{ cursor: "pointer" }}>
                            Logout
                        </a>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </nav>
        </header>
    );
}

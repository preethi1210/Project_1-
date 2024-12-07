import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from '../UserContext'; // Ensure this path is correct

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [loading, setLoading] = useState(false); // Added loading state
    const { setUserInfo } = useContext(UserContext);

    async function login(e) {
        e.preventDefault();
        setLoading(true); // Set loading state to true

        const response = await fetch('http://localhost:4000/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        setLoading(false); // Reset loading state after response

        if (response.ok) {
            response.json().then(userInfo => {
                setUserInfo(userInfo); // Set the user info in context
                setRedirect(true); // Trigger redirect after successful login
            });
        } else {
            alert("Wrong credentials");
        }
    }

    if (redirect) {
        return <Navigate to={'/create'} />; // Redirect to home after login
    }

    return (
        <form className="login" onSubmit={login}>
            <h1>Login</h1>
            <input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button disabled={loading}>
                {loading ? "Logging in..." : "Login"} {/* Show loading state */}
            </button>
        </form>
    );
}

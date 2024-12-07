import './App.css';
import { Route, Routes } from "react-router-dom";
import Header from './Header';

import Post from './Post';
import Layout from "./Layout";
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';
import CreatePost from './pages/CreatePost';
import { UserContextProvider } from './UserContext';
import PostPage from './pages/PostPage';
function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Route>
        <Route path='/create' element={<CreatePost />} />
        <Route path='/post/:id' element={<PostPage />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;

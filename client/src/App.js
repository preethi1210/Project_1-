import './App.css';
import {Route,Routes} from "react-router-dom";
import Header from './Header';
import Post  from './Post';
import Layout from "./Layout";
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';
function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
      <Route index element ={
                  <IndexPage/>
      }/>
      <Route path={'/login'} element={
      <LoginPage/>
      }/>
      <Route path={'/register'} element={
      <RegisterPage/>
      }/>
            </Route>

    </Routes>

  );
}

export default App;

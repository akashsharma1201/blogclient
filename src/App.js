import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login/Login';
import Register from "./pages/Register/Register"
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import CreatePost from './components/CreateBlog/CreateBlog';
import { ProtectedRoute } from './components/ProtectedRoute';
import BlogDetail from './components/BlogDetail/BlogDetail';
import UpdateBlog from './components/Updateblog/UploadBlog';
import { PublicRoute } from './components/PublicRoute';
import Example from './pages/Example';
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<><Home /></>} />
        <Route path="/createblog" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
        <Route path="/blogdeatil/:id" element={<><BlogDetail /></>} />
        <Route path="/updateblog/:id" element={<ProtectedRoute><UpdateBlog /></ProtectedRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
      </Routes>
      <Example />
    </div>
  );
}




export default App; 

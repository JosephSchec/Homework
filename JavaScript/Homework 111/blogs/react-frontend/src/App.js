
import { Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import AddPost from './Components/AddPost';
import Posts from './Components/Posts';
import NotFound from './Components/NotFound'
import Header from './Components/Header'
import Login from './Components/Login';
import Register from './Components/Register';
function App() {
  return (<>
    <Header />
    <Routes>
      <Route path='/' element={<Posts/>}/>
      <Route path="/posts" element={<Posts />} />
      <Route path="/addPost" element={<AddPost />} />
      <Route path="/login" element={<Login />}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='*' element={<NotFound />} />
    </Routes>
    <Outlet />
  </>
  );
}

export default App;

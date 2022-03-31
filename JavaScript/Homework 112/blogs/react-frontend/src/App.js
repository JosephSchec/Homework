
import { Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import AddPost from './Components/AddPost';
import Posts from './Components/Posts';
import NotFound from './Components/NotFound'
import Header from './Components/Header'
import Error from './Components/Error';
import Authentication from './Components/Authentication'
import {useState} from 'react';
import useForm from './Hooks/useForm';
function App() {
  const [error, setError] = useState();
  const [skipLimit, setSkipLimit]=useForm({ skip: 0, limit: 0 })


  return (<>
    <Header />
    <Authentication/>
    <Error error={error} setError={setError}/>
    <form >
     Limit<input type='number' name='limit' value={skipLimit.limit} onChange={setSkipLimit}/>
     Skip<input type='number' name='skip'  value={skipLimit.skip} onChange={setSkipLimit}/> 
    </form>
    

    <Routes>
    <Route path="/" element={<Posts setError={setError} skip={skipLimit.skip} limit={skipLimit.limit}/>} />
        <Route path="/addPost" element={<AddPost setError={setError}/>} />
        <Route path="*" element={<NotFound />} />

     

      <Route path='*' element={<NotFound />} />
    </Routes>
    <Outlet />
  </>
  );
}

export default App;

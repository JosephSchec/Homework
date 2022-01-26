
import { Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Header';
import InputTicker from './InputTicker';
import News from './News';
import NewsSummary from './NewsSummary';

function App() {
  return (<>
    <Header />
    <InputTicker />
    <Routes>
      <Route path='/:ticker' element={<News />} />
      <Route path='/:ticker/news/:newsId' element={<NewsSummary />} />
    </Routes>
    <Outlet />
  </>

  );
}

export default App;

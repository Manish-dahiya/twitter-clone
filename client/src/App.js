import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Auth from './pages/Auth';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      {/* <Auth/> */}
      {/* <Home/> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/login" element={<Auth/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

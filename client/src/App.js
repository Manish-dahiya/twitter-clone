import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Auth from './pages/Auth';
import Home from './pages/Home';
import UserContextProvider from './contexts/UserContextProvider';
import PostContextProvider from './contexts/PostContextProvider';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
      <UserContextProvider>
        <PostContextProvider>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/login" element={<Auth/>}></Route>
        </Routes>
        </PostContextProvider>
        </UserContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

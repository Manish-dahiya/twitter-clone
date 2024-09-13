import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Auth from './pages/Auth';
import Home from './pages/Home';
import UserContextProvider from './contexts/UserContextProvider';
import PostContextProvider from './contexts/PostContextProvider';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoutes from './ProtectedRoutes';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
      <UserContextProvider>
        <PostContextProvider>
        <Routes>
          <Route path="/" element={<ProtectedRoutes><Home/></ProtectedRoutes>  }></Route>
          <Route path="/login" element={<Auth/>}></Route>
          <Route path="/profile/:userId" element={<ProtectedRoutes><ProfilePage/></ProtectedRoutes>  }></Route>
        </Routes>
        </PostContextProvider>
        </UserContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

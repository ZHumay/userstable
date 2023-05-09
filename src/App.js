import './App.css';
import {Routes,Route} from "react-router-dom";
import {Home} from '../src/pages/Home'
import {Users} from '../src/pages/Users'
import { UsersPosts } from './pages/UsersPosts';

function App() {

  return (
    <Routes>
       <Route path='/' element={<Home />} />
       <Route path='/users' element={<Users />} />
       <Route path='/users/:id/posts' element={<UsersPosts/>} />
    </Routes>
  );
}

export default App
import { CartProvider } from './components/ContextReducer';
import './App.css';
import Home from './screens/home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Signup from './screens/signup';
import Orders from './screens/Orders';
import Login from './screens/login';
import MyOrders from './screens/myorders';
import Deforderspage from './screens/Deforderspage';
import Profile from './screens/profile';

function App() {
  return (
    <>
     <CartProvider>
      <Router>
        <Routes>
        <Route exact path="/"        element={<Home/>}/>
        <Route exact path="/signup"  element={<Signup/>}/>
        <Route exact path="/orders"  element={<Orders/>}/>
        <Route exact path="/myorders"  element={<MyOrders/>}/>
        <Route exact path="/login"   element={<Login/>}/>
        <Route exact path="/defaultorder"   element={<Deforderspage/>}/>
        <Route exact path="/Profile"   element={<Profile/>}/>
        
        </Routes>
      </Router>
      </CartProvider> 
    </>
  );
}

export default App;

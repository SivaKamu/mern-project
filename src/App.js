import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import ForgotPassword from "./ForgotPassword/ForgotPassword";

function App() {
  return (
    <Router>
      <Routes>
        
           <Route path="/" element={<Login />} >          
           </Route>
           <Route path="/forgotPassword" element={<ForgotPassword/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;

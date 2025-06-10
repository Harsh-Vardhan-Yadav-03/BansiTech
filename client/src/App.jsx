import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@mui/material/styles';
import React from 'react'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Service from './pages/Service'
import Register from './pages/Register'
import Login from './pages/Login'
import Navbar from "./components/Navbar";
import Error from "./pages/Error";
import Footer from "./components/Footer/Footer";
import Logout from "./pages/Logout";
import AdminLayout from "./components/layouts/Admin-layouts";
import AdminContacts from "./pages/Admin-Contacts";
import AdminUsers from "./pages/Admin-Users";
import AdminUpdate from "./pages/Admin-Update";


const App = () => {
  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={ < Home />}/>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service" element={<Service />} />
        <Route path="/register" element={<Register />} /> 
        <Route path="/login" element={<Login />} /> 
        <Route path="/logout" element={<Logout />} />  
        <Route path="*" element={<Error />} /> 
        <Route path="/admin" element={<AdminLayout/>}>   {/*Admin nested loop*/}
          <Route path="users"  element={<AdminUsers/>} />
          <Route path="users/update/:id" element={<AdminUpdate/>} />
          <Route path="contacts"  element={<AdminContacts/>} />
        </Route>
      </Routes>
      <Footer />        
    </Router>
    </>
  )
}

export default App

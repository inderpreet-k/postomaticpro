import { useState, useEffect } from 'react';
   import Login from './pages/Login';
   import Signup from './pages/Signup';
   import Dashboard from './pages/Dashboard';
   import { getCurrentUser } from './services/authService';
   import './App.css';

   function App() {
     const [user, setUser] = useState(null);
     const [showLogin, setShowLogin] = useState(true);

     useEffect(() => {
       // Check if user is already logged in
       const currentUser = getCurrentUser();
       if (currentUser) {
         setUser(currentUser);
       }
     }, []);

     const handleLoginSuccess = (userData) => {
       setUser(userData);
     };

     const handleSignupSuccess = (userData) => {
       setUser(userData);
     };

     const handleLogout = () => {
       setUser(null);
     };

     const switchToSignup = () => {
       setShowLogin(false);
     };

     const switchToLogin = () => {
       setShowLogin(true);
     };

     // If user is logged in, show dashboard
     if (user) {
       return <Dashboard user={user} onLogout={handleLogout} />;
     }

     // If not logged in, show login or signup
     return showLogin ? (
       <Login onLoginSuccess={handleLoginSuccess} switchToSignup={switchToSignup} />
     ) : (
       <Signup onSignupSuccess={handleSignupSuccess} switchToLogin={switchToLogin} />
     );
   }

   export default App;
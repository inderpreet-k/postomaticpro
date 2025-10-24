import { useState } from 'react';
   import { login } from '../services/authService';
   import './Auth.css';

   function Login({ onLoginSuccess, switchToSignup }) {
     const [formData, setFormData] = useState({
       email: '',
       password: ''
     });
     const [error, setError] = useState('');
     const [loading, setLoading] = useState(false);

     const handleChange = (e) => {
       setFormData({
         ...formData,
         [e.target.name]: e.target.value
       });
     };

     const handleSubmit = async (e) => {
       e.preventDefault();
       setError('');
       setLoading(true);

       try {
         const data = await login(formData);
         onLoginSuccess(data.user);
       } catch (err) {
         setError(err.message);
       } finally {
         setLoading(false);
       }
     };

     return (
       <div className="auth-container">
         <div className="auth-box">
           <h2>Login to Postomatic Pro</h2>
           <form onSubmit={handleSubmit}>
             <div className="form-group">
               <input
                 type="email"
                 name="email"
                 placeholder="Email"
                 value={formData.email}
                 onChange={handleChange}
                 required
               />
             </div>
             <div className="form-group">
               <input
                 type="password"
                 name="password"
                 placeholder="Password"
                 value={formData.password}
                 onChange={handleChange}
                 required
               />
             </div>
             {error && <div className="error-message">{error}</div>}
             <button type="submit" disabled={loading}>
               {loading ? 'Logging in...' : 'Login'}
             </button>
           </form>
           <p className="switch-auth">
             Don't have an account?{' '}
             <span onClick={switchToSignup}>Sign up</span>
           </p>
         </div>
       </div>
     );
   }

   export default Login;
import { useState } from 'react';
   import { signup } from '../services/authService';
   import './Auth.css';

   function Signup({ onSignupSuccess, switchToLogin }) {
     const [formData, setFormData] = useState({
       name: '',
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
         const data = await signup(formData);
         onSignupSuccess(data.user);
       } catch (err) {
         setError(err.message);
       } finally {
         setLoading(false);
       }
     };

     return (
       <div className="auth-container">
         <div className="auth-box">
           <h2>Sign Up for Postomatic Pro</h2>
           <form onSubmit={handleSubmit}>
             <div className="form-group">
               <input
                 type="text"
                 name="name"
                 placeholder="Full Name"
                 value={formData.name}
                 onChange={handleChange}
                 required
               />
             </div>
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
                 placeholder="Password (min 6 characters)"
                 value={formData.password}
                 onChange={handleChange}
                 required
                 minLength="6"
               />
             </div>
             {error && <div className="error-message">{error}</div>}
             <button type="submit" disabled={loading}>
               {loading ? 'Creating account...' : 'Sign Up'}
             </button>
           </form>
           <p className="switch-auth">
             Already have an account?{' '}
             <span onClick={switchToLogin}>Login</span>
           </p>
         </div>
       </div>
     );
   }

   export default Signup;
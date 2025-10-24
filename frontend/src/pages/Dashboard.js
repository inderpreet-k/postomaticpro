import { logout } from '../services/authService';
   import './Dashboard.css';

   function Dashboard({ user, onLogout }) {
     const handleLogout = () => {
       logout();
       onLogout();
     };

     return (
       <div className="dashboard">
         <header className="dashboard-header">
           <div className="dashboard-logo">
             <img src="/logo.png" alt="Postomatic Pro" />
             <h1>Postomatic Pro</h1>
           </div>
           <div className="user-info">
             <span>Welcome, {user.name}!</span>
             <button onClick={handleLogout} className="logout-btn">
               Logout
             </button>
           </div>
         </header>
         
         <div className="dashboard-content">
           <div className="welcome-section">
             <h2>🎉 Welcome to Postomatic Pro!</h2>
             <p>Your AI-powered social media automation tool is ready.</p>
           </div>

           <div className="feature-grid">
             <div className="feature-card">
               <h3>📱 Connect Accounts</h3>
               <p>Link your social media accounts to get started</p>
               <button className="feature-btn">Coming Soon</button>
             </div>

             <div className="feature-card">
               <h3>🤖 AI Content Generator</h3>
               <p>Generate engaging posts with AI</p>
               <button className="feature-btn">Coming Soon</button>
             </div>

             <div className="feature-card">
               <h3>📅 Schedule Posts</h3>
               <p>Plan and schedule your content</p>
               <button className="feature-btn">Coming Soon</button>
             </div>

             <div className="feature-card">
               <h3>📊 Analytics</h3>
               <p>Track your social media performance</p>
               <button className="feature-btn">Coming Soon</button>
             </div>
           </div>
         </div>
       </div>
     );
   }

   export default Dashboard;
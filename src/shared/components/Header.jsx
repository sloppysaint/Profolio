/* eslint-disable react/prop-types */
import Logo from '../widgets/Logo'; // Import your new logo component
import './styles/header.css';
import { OAuth } from '../services/oauth.js'; // Import your OAuth function
import Logo2 from './Logo2.jsx';

export const Header = ({ setShowLogin }) => {
  
  const handleOAuthLogin = async () => {
    try {
      const userCred = await OAuth(); // Call your OAuth function here
      console.log('User Info ', userCred); // Log the user information after successful login
    } catch (error) {
      console.error("OAuth Error: ", error); // Handle any errors that occur during login
    }
  };

  return (
    <>
      <div className="header">
        <div className="left-side">
          <div className="logo">
            <Logo />
            <Logo2 />
          </div>
        </div>
        <div className="right-side">
          <button
            className="signup-btn"
            onClick={handleOAuthLogin} // Change to handleOAuthLogin to trigger the OAuth function
          >
            SignUp
          </button>
        </div>
      </div>
    </>
  );
};

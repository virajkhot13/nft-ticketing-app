import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRole } from '../RoleContext';


function WhoAreYou() {
  const navigate = useNavigate();
  const { setRole } = useRole(); 
  
  const handleSelection = (role) => {
    setRole(role);
    navigate('/login', { state: { role } });
  };

  return (
    <div className="who-are-you-container">
      <div className="question_text">Who are you?</div>
      <div className="select_user">
        {/* Creator Section */}
        <div className="creator_container" onClick={() => handleSelection('creator')}>
          <div className="creator">
            <div className="image_container">
              <img src={`${process.env.PUBLIC_URL}/assets/creator.png`} alt="Creator " />
            </div>
          </div>
          <div className="select_user_text">Creator</div>
        </div>

        {/* User Section */}
        <div className="user_container" onClick={() => handleSelection('user')}>
          <div className="user">
            <div className="image_container">
              <img src={`${process.env.PUBLIC_URL}/assets/user.png`} alt="User " />
            </div>
          </div>
          <div className="select_user_text">User</div>
        </div>
      </div>
    </div>
  );
}

export default WhoAreYou;
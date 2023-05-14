import React from 'react';
import Auth from '../../utils/auth';

const Profile = () => {

  return (
    <>
      <h1>
        Welcome, {Auth.getProfile().data.username}!
      </h1>

      <div>
<aside>
  <nav>
    <ul>
      <li>

      </li>
      <li>
        
      </li>
      <li>
        
      </li>
    </ul>
  </nav>
</aside>
      </div>

    </>

  );

};

export default Profile;

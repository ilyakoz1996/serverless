import React, { useEffect } from 'react';
import { Button } from './button';
import { useAuth } from '../../core/providers/authProvider';

// Define types for any props if needed (none needed for this simple example)
interface AuthPopupProps {}

const AuthPopup: React.FC<AuthPopupProps> = () => {

  const {login} = useAuth()

  return (
      <Button variant="outline"  onClick={login}>
        <img src="/logoSimple.webp"  className="w-5 h-5 rounded-full mr-4"/>
        <p>Sign In with Simple ID</p>
      </Button>
  );
};

export default AuthPopup;

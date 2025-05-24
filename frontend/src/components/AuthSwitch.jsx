import React, { useState } from 'react';
import Signin from './Signin';
import Signup from './Signup';

export default function AuthSwitch({ onClose }) {
  const [isSignin, setIsSignin] = useState(true);

  const switchToSignup = () => setIsSignin(false);
  const switchToSignin = () => setIsSignin(true);

  return (
    <>
      {isSignin ? (
        <Signin 
          onClose={onClose} 
          onSwitch={switchToSignup} 
        />
      ) : (
        <Signup 
          onClose={onClose} 
          onSwitch={switchToSignin} 
        />
      )}
    </>
  );
}
// app/login/page.js

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Next.js 13 App Router navigation
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../firebase'; // Import your Firebase app config

export default function Login() {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const router = useRouter();

  useEffect(() => {
    // Redirect to Home if the user is already logged in
    auth.onAuthStateChanged((user) => {
      if (user) {
        router.push('/'); // Redirect to the main (home) page
      }
    });
  }, []);

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      router.push('/'); // Redirect to home after successful login
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="container text-center mt-5">
      <h1>Welcome! Please Log In</h1>
      <button onClick={handleGoogleLogin} className="btn btn-primary mt-3">
        Sign in with Google
      </button>
    </div>
  );
}

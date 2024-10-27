// app/login/page.js

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Next.js 13 App Router navigation
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../firebase'; // Firebase configuration file

export default function Login() {
  const [email, setEmail] = useState(''); // State for email input
  const [password, setPassword] = useState(''); // State for password input
  const [error, setError] = useState(null); // State for error messages
  const router = useRouter();
  const auth = getAuth(app);

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission from refreshing the page

    try {
      // Attempt to sign in with the provided email and password
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/'); // Redirect to home after successful login
    } catch (error) {
      setError('Invalid email or password.'); // Show error message on failure
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="container text-center mt-5">
      <h1>Welcome! Please Log In</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group mb-3">
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
          />
        </div>
        {error && <p className="text-danger">{error}</p>} {/* Display error if login fails */}
        <button type="submit" className="btn btn-primary mt-3">
          Sign In
        </button>
      </form>
    </div>
  );
}

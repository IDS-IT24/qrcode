'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '../../firebase'; // Ensure correct Firebase setup and export
import { query, where, getDocs, collection } from 'firebase/firestore'; // For querying Firestore

export default function SlugPage({ params }) {
  const { slug } = params; // Extract slug from URL params
  const [password, setPassword] = useState('');
  const [originalUrl, setOriginalUrl] = useState('');
  const [storedPassword, setStoredPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  // Fetch document from Firestore based on slug
  useEffect(() => {
    const fetchData = async () => {
      if (slug) {
        try {
          // Query Firestore for the document where slug matches
          const q = query(collection(db, 'urls'), where('slug', '==', slug));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const docSnap = querySnapshot.docs[0]; // Get the first document
            const data = docSnap.data();
            console.log('Fetched data:', data); // Log for debugging

            // Set the original URL and stored password from Firestore document
            setOriginalUrl(data.originalUrl);
            setStoredPassword(data.password);
          } else {
            setError('Invalid shortened URL.');
          }
        } catch (error) {
          console.error('Error fetching document:', error);
          setError('An error occurred while fetching the URL.');
        }
      }
    };

    fetchData();
  }, [slug]);

  // Handle password submission
  const handlePasswordSubmit = () => {
    console.log('Stored password:', storedPassword); // Log for debugging
    console.log('Entered password:', password); // Log for debugging

    // Compare the entered password with the stored password (trimmed to avoid whitespace issues)
    if (password.trim() === storedPassword.trim()) {
      window.location.href = originalUrl; // Redirect to the original URL if password is correct
    } else {
      setError('Incorrect password, please try again.');
    }
  };

  return (
    <div className="container text-center mt-5">
      <h1>Enter Password to Access URL</h1>
      <div className="row justify-content-center mt-4">
        <div className="col-12 col-md-8 col-lg-6">
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control mb-3"
          />
          <button onClick={handlePasswordSubmit} className="btn btn-primary">
            Submit
          </button>
          {error && <p className="text-danger mt-3">{error}</p>}
        </div>
      </div>
    </div>
  );
}

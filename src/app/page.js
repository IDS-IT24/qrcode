'use client';

import { useState } from 'react';
import QRCode from 'react-qr-code';
import { db } from '../firebase'; // Assuming firebase.js is in the src directory
import { collection, addDoc } from 'firebase/firestore';

export default function Home() {
  const [url, setUrl] = useState('');
  const [shortLink, setShortLink] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    let formattedUrl = url;

    // Ensure the URL has http:// or https://
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = `http://${formattedUrl}`; // Add http:// if the protocol is missing
    }

    const slug = Math.random().toString(36).substring(2, 8); // Generate a random slug
    const localIP = 'http://192.168.0.112:3000'; // Replace this with your actual local IP
    const newLink = `${localIP}/${slug}`;
    
    // Store URL, password, and slug in Firestore
    try {
      await addDoc(collection(db, 'urls'), {
        slug: slug,
        originalUrl: formattedUrl, // Save the formatted URL with protocol
        password: password, // Save password along with the URL
      });
      setShortLink(newLink);
    } catch (error) {
      console.error('Error storing URL: ', error);
    }
  };

  return (
    <div className="container text-center mt-5">
      <div className="row justify-content-center mt-4">
        <div className="col-12 col-md-8 col-lg-6">
          <input
            type="text"
            placeholder="Enter URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="form-control mb-3"
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control mb-3"
          />
        </div>
        <div className="col-12 col-md-4 col-lg-2">
          <button onClick={handleSubmit} className="btn btn-success btn-block">
            Shorten URL
          </button>
        </div>
      </div>

      {shortLink && (
        <div className="mt-5">
          <p className="lead">
            Shortened Link: <a href={shortLink} target="_blank" rel="noreferrer">{shortLink}</a>
          </p>
          <div className="d-flex justify-content-center mt-3">
            <QRCode value={shortLink} size={256} />
          </div>
        </div>
      )}
    </div>
  );
}

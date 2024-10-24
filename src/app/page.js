'use client';

import { useState } from 'react';
import QRCode from 'react-qr-code';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function Home() {
  const [url, setUrl] = useState('');
  const [shortLink, setShortLink] = useState('');
  const [password, setPassword] = useState('');
  const [divisi, setDivisi] = useState('');
  const [unit, setUnit] = useState('');
  const [customer, setCustomer] = useState('');
  const [soa, setSoa] = useState('');
  const [so, setSo] = useState('');

  const handleSubmit = async () => {
    let formattedUrl = url;

    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = `http://${formattedUrl}`;
    }

    const slug = Math.random().toString(36).substring(2, 8); // Generate a random slug
    const localIP = 'https://qrcode-ids.vercel.app'; // Replace this with your actual deployed domain
    const newLink = `${localIP}/${slug}`;

    try {
      await addDoc(collection(db, 'urls'), {
        slug,
        originalUrl: formattedUrl,
        password,
        divisi,
        unit,
        customer,
        soa,
        so,
      });
      setShortLink(newLink);
    } catch (error) {
      console.error('Error storing URL: ', error);
    }
  };

  const handlePrint = () => {
    window.print();
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
          <input
            type="text"
            placeholder="Enter Divisi"
            value={divisi}
            onChange={(e) => setDivisi(e.target.value)}
            className="form-control mb-3"
          />
          <input
            type="text"
            placeholder="Enter Unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="form-control mb-3"
          />
          <input
            type="text"
            placeholder="Enter Customer"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            className="form-control mb-3"
          />
          <input
            type="text"
            placeholder="Enter SOA"
            value={soa}
            onChange={(e) => setSoa(e.target.value)}
            className="form-control mb-3"
          />
          <input
            type="text"
            placeholder="Enter SO"
            value={so}
            onChange={(e) => setSo(e.target.value)}
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
          {/* Only the below section will be printed */}
          <div className="print-section">
            <div>
              <p><strong>Cust: {customer}</strong></p>
            </div>
            <div className="qr-container" style={{ position: 'relative', display: 'inline-block' }}>
              <QRCode value={shortLink} size={128} className="qrcode" />
              <img
                src="../app/ids-icon.png"
                alt="Logo"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '30px', // Adjust the logo size as needed
                  height: '30px',
                }}
              />
            </div>
            <div className="mx-1 text-start">
              <p><strong>Divisi:</strong> {divisi}</p>
              <p><strong>Unit:</strong> {unit}</p>
              <p><strong>SOA:</strong> {soa}</p>
              <p><strong>SO:</strong> {so}</p>
            </div>
          </div>
          <button onClick={handlePrint} className="btn btn-primary mt-3">
            Print Info & QR
          </button>
        </div>
      )}
    </div>
  );
}

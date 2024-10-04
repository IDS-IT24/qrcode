// src/app/layout.js
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css'; // Optional: custom styles

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

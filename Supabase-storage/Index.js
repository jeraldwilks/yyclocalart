import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from '../frontend/src/App';
import reportWebVitals from './reportWebVitals';
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient("https://htzncofrrserhcanrdoj.supabase.co",
 "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0em5jb2ZycnNlcmhjYW5yZG9qIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI2MjcwMzAsImV4cCI6MTk5ODIwMzAzMH0.k_fJDA3gPxw1XzVO2L6HBsWLIT4SHT0M33pRQkziKC8");

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <App />
    </SessionContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

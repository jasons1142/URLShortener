'use client';

import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [alias, setAlias] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    const res = await fetch('/api/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({url, alias}),
    });

    const data = await res.json();
    if (res.ok) {
      setShortUrl(`${window.location.origin}/${data.alias}`);
      setError('');
    } else {
      setShortUrl('');
      setError(data.error);
    }
  };

  return (
    <main className = "flex flex-col items-center p-8 max-w-lg mx-auto">
      <h1 className = "text-3xl font-bold">URL Shortener</h1>
      <p>Shortern your long URLs into compact, shareable links</p>

      <div className = "bg-blue-700 p-6 rounded-lg text-white w-full">
        <h2>Shorten a URL</h2>
        <p>Enter a long URL to create a shorter, shareable link</p>
        <h3>URL</h3>

        <input
          className="border border-gray-300 rounded p-2 mb-3 w-full"
          placeholder = "https://example.com/very/long/url"
          value = {url}
          onChange = {(e) => setUrl(e.target.value)}
        />

        <input
          className="border border-gray-300 rounded p-2 mb-3 w-full"
          placeholder = "your-custom-alias"
          value = {alias}
          onChange = {(e) => setAlias(e.target.value)}
        />

        <button
          onClick = {handleSubmit}
          className = "bg-green-700 text-white px-4 py-2 rounded hover:bg-green-200 transition w-full"
        >Shorten</button>

        {shortUrl && (
          <div className = "mt-4 flex items-center space-x-2">
            <span>
              Your shortened URL:{" "}
              <a
                href = {shortUrl}
                className = "underline text-blue-500"
                target = "_blank"
                rel = "noopener noreferrer"
              >
                {shortUrl}
              </a>
            </span>
            <button
              onClick= {() => navigator.clipboard.writeText(shortUrl)}
              className = "px-2 py-1 text-sm bg-gray-500 rounded hover:bg-gray-400 transition"
            >
              Copy
            </button>
          </div>
        )}
        {error && <p className = "mt-4 text-red-600">{error}</p>}
      </div>
    </main>
  );
}


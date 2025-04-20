'use client';
import { useState } from 'react';

export default function Home() {
  const [alias, setAlias] = useState('');
  const [url, setUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    const res = await fetch('/api/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({url, alias}),
    });

    const data = await res.json();
    if (res.ok) {
      setShortenedUrl(`${window.location.origin}/${data.alias}`);
      setError('');
    } else {
      setShortenedUrl('');
      setError(data.error);
    }
  };

  return (
    <main className = "flex flex-col items-center p-8 min-h-screen bg-stone-400">
      <h1 className = "text-3xl font-bold text-black">URL Shortener</h1>
      <p className = "mb-8 text-black">Shortern your long URLs into compact, shareable links</p>

      <div className = "bg-blue-600 p-6 rounded-lg text-white w-full">
        <h2 className = "font-bold text-3xl">Shorten a URL</h2>
        <p className = "mb-4">Enter a long URL to create a shorter, shareable link</p>
        
        <label>URL</label>
        <input
          className="border border-gray-300 rounded p-2 mb-3 w-full"
          placeholder = "https://example.com/very/long/url"
          value = {url}
          onChange = {(e) => setUrl(e.target.value)}
        />

        <label>Custom Alias</label>
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
        
        
        {error && (
          <p className= "text-red-600 mt-2 font-medium text-center">{error}</p>
        )}
        
        <div className = "mt-4 flex items-center space-x-2">
          <span>
            Your shortened URL:{" "}
            { shortenedUrl ? (
              <a
                href = {shortenedUrl}
                className = "underline text-white-500"
                target = "_blank"
                rel = "noopener noreferrer"
              >
                {shortenedUrl}
              </a>
            ) : (
              <span className="text-black-400">Not yet generated</span>
            )}
          </span>
          <button
            onClick= {() => shortenedUrl && navigator.clipboard.writeText(shortenedUrl)}
            className = {`px-2 py-1 text-sm bg-gray-100 rounded transition ${
              shortenedUrl
                ? "bg-gray-500 hover:bg-gray-400 text-white"
                : "bg-gray-300 cursor-not-allowed text-gray-500"
            }`}
          >
            Copy
          </button>
        </div>
      </div>
    </main>
  );
}


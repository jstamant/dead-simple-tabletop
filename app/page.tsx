'use client'
// TODO place client components in their own
import Link from 'next/link';

import axios from 'axios';

export default function Home() {
  const handleTest = (event) => {
    event.preventDefault();
    console.log('button clicked!')
    axios.post('http://localhost:3001/login');
  }
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <p>This might be a landing-page. Or it might be the app login page. Not sure.</p>
        <p>TODO replace this with a component like a log-in box.</p>
        <Link href="/dashboard">Go to the app?</Link>
        <form>
          <label htmlFor="user">User</label>
          <input id="user" type="text" />
          <label htmlFor="user">User</label>
          <input id="password" type="password" />
          <button type="submit" onClick={handleTest}>Log in?</button>
        </form>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <p>This is the footer.</p>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Go to nextjs.org
        </a>
      </footer>
    </div>
  );
}

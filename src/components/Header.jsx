function Header() {
  return (
    <header className="border-b border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-5">
        <h1 className="text-2xl font-bold text-white">
          The Subreddit Vibe Check
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Analyze the vibe of any subreddit
        </p>
      </div>
    </header>
  );
}

export default Header;
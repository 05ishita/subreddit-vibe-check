function SearchBar({
  subreddit,
  setSubreddit,
  onSearch,
  loading,
}) {
  return (
    <form
      onSubmit={onSearch}
      className="flex flex-col gap-3 sm:flex-row"
    >
      <div className="flex flex-1 items-center rounded-xl border border-slate-700 bg-slate-900 px-4">
        <span className="text-slate-500">r/</span>

        <input
          type="text"
          value={subreddit}
          onChange={(e) => setSubreddit(e.target.value)}
          placeholder="programming"
          className="w-full bg-transparent px-2 py-3 text-white outline-none placeholder:text-slate-600"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Analyzing..." : "Analyze Vibe"}
      </button>
    </form>
  );
}

export default SearchBar;
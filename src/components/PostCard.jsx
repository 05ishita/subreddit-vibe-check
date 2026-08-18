function PostCard({ post }) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">
      <div className="mb-3 flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold text-white">
          {post.title}
        </h3>

        <span className="shrink-0 rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300">
          {post.sentiment.emoji} {post.sentiment.label}
        </span>
      </div>

      <div className="flex flex-wrap gap-4 text-sm text-slate-400">
        <span>u/{post.author || "unknown"}</span>
        <span>⬆ {post.score}</span>
        <span>💬 {post.comments}</span>
      </div>

      <a
        href={post.url}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-block text-sm text-blue-400 hover:text-blue-300"
      >
        View on Reddit →
      </a>
    </div>
  );
}

export default PostCard;
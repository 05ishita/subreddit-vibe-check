import { useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import StatsCard from "./components/StatsCard";
import PostCard from "./components/PostCard";
import { fetchHotPosts } from "./services/redditApi";
import { analyzeSentiment } from "./utils/sentiment";

function App() {
  const [subreddit, setSubreddit] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    const cleanSubreddit = subreddit.trim().replace(/^r\//, "");

    if (!cleanSubreddit) {
      setError("Please enter a subreddit.");
      return;
    }

    setLoading(true);
    setError("");
    setPosts([]);

    try {
      const data = await fetchHotPosts(cleanSubreddit);

      const analyzedPosts = data.map((post) => ({
        ...post,
        sentiment: analyzeSentiment(post.title),
      }));

      setPosts(analyzedPosts);
    } catch (err) {
      setError(
        "Unable to fetch this subreddit. Please check the subreddit name."
      );
    } finally {
      setLoading(false);
    }
  };

  const positive = posts.filter(
    (post) => post.sentiment.label === "Positive"
  ).length;

  const neutral = posts.filter(
    (post) => post.sentiment.label === "Neutral"
  ).length;

  const negative = posts.filter(
    (post) => post.sentiment.label === "Negative"
  ).length;

  let overallVibe = "No Data";
  let overallEmoji = "📊";

  if (posts.length > 0) {
    if (positive >= neutral && positive >= negative) {
      overallVibe = "Positive";
      overallEmoji = "😊";
    } else if (negative >= positive && negative >= neutral) {
      overallVibe = "Negative";
      overallEmoji = "😞";
    } else {
      overallVibe = "Neutral";
      overallEmoji = "😐";
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mx-auto max-w-3xl">
          <SearchBar
            subreddit={subreddit}
            setSubreddit={setSubreddit}
            onSearch={handleSearch}
            loading={loading}
          />
        </div>

        {error && (
          <div className="mx-auto mt-6 max-w-3xl rounded-xl border border-red-900 bg-red-950/40 p-4 text-center text-red-300">
            {error}
          </div>
        )}

        {posts.length > 0 && (
          <>
            <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatsCard
                title="Posts Analyzed"
                value={posts.length}
                emoji="📊"
              />

              <StatsCard
                title="Positive"
                value={positive}
                emoji="😊"
              />

              <StatsCard
                title="Neutral"
                value={neutral}
                emoji="😐"
              />

              <StatsCard
                title="Negative"
                value={negative}
                emoji="😞"
              />
            </section>

            <section className="mt-8 rounded-2xl border border-slate-700 bg-slate-900 p-6 text-center">
              <p className="text-sm text-slate-400">Overall Subreddit Vibe</p>

              <div className="mt-2 text-4xl">
                {overallEmoji}
              </div>

              <h2 className="mt-2 text-2xl font-bold">
                {overallVibe}
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Based on the sentiment of {posts.length} hot post titles
              </p>
            </section>

            <section className="mt-10">
              <div className="mb-5">
                <h2 className="text-2xl font-bold">
                  Hot Posts
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Sentiment analysis of the latest hot posts
                </p>
              </div>

              <div className="grid gap-4">
                {posts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                  />
                ))}
              </div>
            </section>
          </>
        )}

        {!loading && posts.length === 0 && !error && (
          <div className="mx-auto mt-20 max-w-2xl text-center">
            <div className="text-6xl">🔍</div>

            <h2 className="mt-5 text-2xl font-bold">
              Check the vibe of a subreddit
            </h2>

            <p className="mt-2 text-slate-400">
              Enter a subreddit above to analyze its 50 hottest posts.
            </p>
          </div>
        )}

        {loading && (
          <div className="mt-20 text-center">
            <div className="text-4xl">⏳</div>
            <p className="mt-3 text-slate-400">
              Fetching and analyzing posts...
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
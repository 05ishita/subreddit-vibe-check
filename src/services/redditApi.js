export async function fetchHotPosts(subreddit) {
  const response = await fetch(
    `https://subreddit-vibe-check.onrender.com/api/reddit/${subreddit}/hot`
  );

  if (!response.ok) {
    throw new Error("Unable to fetch subreddit posts");
  }

  return await response.json();
}
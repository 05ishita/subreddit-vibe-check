export async function fetchHotPosts(subreddit) {
  const response = await fetch(
    `http://localhost:5000/api/reddit/${subreddit}/hot`
  );

  if (!response.ok) {
    throw new Error("Unable to fetch subreddit posts");
  }

  return await response.json();
}
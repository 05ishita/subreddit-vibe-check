const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/api/reddit/:subreddit/hot", async (req, res) => {
  try {
    const subreddit = req.params.subreddit;

    const response = await fetch(
      `https://www.reddit.com/r/${subreddit}/hot.json?limit=50`,
      {
        headers: {
          "User-Agent": "subreddit-vibe-check/1.0",
        },
      }
    );

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Reddit API request failed",
      });
    }

    const data = await response.json();

    const posts = data.data.children.map((post) => ({
      id: post.data.id,
      title: post.data.title,
      author: post.data.author,
      score: post.data.score,
      comments: post.data.num_comments,
      url: `https://www.reddit.com${post.data.permalink}`,
      subreddit: post.data.subreddit,
    }));

    res.json(posts);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Unable to fetch Reddit posts",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
 
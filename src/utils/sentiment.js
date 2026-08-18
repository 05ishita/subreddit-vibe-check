import Sentiment from "sentiment";

const sentiment = new Sentiment();

export function analyzeSentiment(title) {
  const result = sentiment.analyze(title);

  if (result.score > 0) {
    return {
      label: "Positive",
      score: result.score,
      emoji: "😊",
    };
  }

  if (result.score < 0) {
    return {
      label: "Negative",
      score: result.score,
      emoji: "😞",
    };
  }

  return {
    label: "Neutral",
    score: result.score,
    emoji: "😐",
  };
}
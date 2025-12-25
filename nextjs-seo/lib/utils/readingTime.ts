const readingTime = (content: string): number => {
  const WPS = 275 / 60; // words per second
  const words = content.trim().split(/\s+/).length;
  const time = Math.ceil(words / WPS);
  return Math.ceil(time / 60); // return minutes
};

export default readingTime;

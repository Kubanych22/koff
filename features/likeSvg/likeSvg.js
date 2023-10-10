export const likeSvg = async () => {
  // const likeURL = new URL('./like.svg', import.meta.url);
  const response = await fetch('/img/like.svg');
  const svg = await response.text();
  return new DOMParser()
      .parseFromString(svg, 'image/svg+xml')
      .querySelector('svg');
};

import http from 'https';

http.get('https://assets.mixkit.co/videos/preview/mixkit-cheering-with-glasses-of-champagne-at-a-party-42616-large.mp4', (res) => {
  console.log(res.statusCode);
});
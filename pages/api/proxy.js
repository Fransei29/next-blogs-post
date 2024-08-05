// pages/api/proxy.js
export default async function handler(req, res) {
    const response = await fetch('https://techcrunch.com/feed/');
    const data = await response.text();
    res.setHeader('Content-Type', 'application/rss+xml');
    res.status(200).send(data);
  }
  
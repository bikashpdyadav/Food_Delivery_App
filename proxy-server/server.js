import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();

app.use(cors());

let cachedData = null;
let etag = null;

app.get('/api/restaurants', async (req, res) => {
  try {
    const headers = {};
    if (etag) {
      headers['If-None-Match'] = etag;
    }

    const response = await fetch('https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.96340&lng=77.58550&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING', { headers });

    if (response.status === 304) {
      console.log("Returning cached data.");
      return res.json(cachedData);
    } else if (response.ok) {
      const data = await response.json();
      cachedData = data;
      etag = response.headers.get('etag');
      return res.json(data);
    } else {
      res.status(response.status).json({ error: 'Failed to fetch data' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


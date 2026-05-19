import Container from '@mui/material/Container';
import NewsFeed from './components/NewsFeed';
import NewsHeader from './components/NewsHeader';
import { useEffect, useState, useMemo, useRef } from 'react';
import { debounce } from 'lodash';

function App() {
  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const abortControllerRef = useRef(null);

  async function loadData(inputQuery) {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?q=${inputQuery}&country=us&apiKey=${API_KEY}`,
        { signal: abortControllerRef.current.signal }
      );

      const data = await response.json();

      return data.articles.map((article) => {
        const { title, description, author, publishedAt, urlToImage } = article;
        return {
          title,
          description,
          author,
          publishedAt,
          image: urlToImage,
        };
      });
    } catch (error) {
      if (error.name === 'AbortError') {
        return null;
      }
      console.error('API Error:', error);
      return [];
    }
  }

  const debouncedLoadData = debounce((newQuery) => {
    setLoading(true);
    loadData(newQuery).then((newData) => {
      setArticles(newData);
      setLoading(false);
    });
  }, 500);

  useEffect(() => {
    setLoading(true);
    loadData('').then((newData) => {
      setArticles(newData);
      setLoading(false);
    });
  }, []);

  const handleSearchChange = (newQuery) => {
    debouncedLoadData(newQuery);
  };

  return (
    <Container>
      <NewsHeader onSearchChange={handleSearchChange} />
      <NewsFeed articles={articles} loading={loading} />
    </Container>
  );
}

export default App;

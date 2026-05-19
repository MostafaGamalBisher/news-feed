import Container from '@mui/material/Container';
import NewsFeed from './components/NewsFeed';
import NewsHeader from './components/NewsHeader';
import { useEffect, useState, useMemo, useRef } from 'react';
import { debounce } from 'lodash';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const Footer = styled('div')(({ theme }) => ({
  padding: theme.spacing(2, 0),
  display: 'flex',
  justifyContent: 'space-between',
}));

function App() {
  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const pageNumber = useRef(1);
  const queryValue = useRef('');

  const abortControllerRef = useRef(null);

  async function loadData() {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?q=${queryValue.current}&page=${pageNumber.current}&pageSize=5&country=us&apiKey=${API_KEY}`,
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
  const fetchAndUpdateArticles = () => {
    setLoading(true);
    loadData().then((newData) => {
      setArticles(newData);
      setLoading(false);
    });
  };

  const debouncedLoadData = useMemo(
    () => debounce(fetchAndUpdateArticles, 500),
    []
  );

  useEffect(() => {
    fetchAndUpdateArticles();
  }, []);

  const handleSearchChange = (newQuery) => {
    pageNumber.current = 1;
    queryValue.current = newQuery;
    debouncedLoadData(newQuery, pageNumber.current);
  };

  const handleNextClick = () => {
    pageNumber.current += 1;

    fetchAndUpdateArticles();
  };

  const handlePreviousClick = () => {
    pageNumber.current -= 1;

    fetchAndUpdateArticles();
  };

  return (
    <Container>
      <NewsHeader onSearchChange={handleSearchChange} />
      <NewsFeed articles={articles} loading={loading} />
      <Footer>
        <Button variant="outlined" onClick={handlePreviousClick}>
          Previous
        </Button>
        <Button variant="outlined" onClick={handleNextClick}>
          Next
        </Button>
      </Footer>
    </Container>
  );
}

export default App;

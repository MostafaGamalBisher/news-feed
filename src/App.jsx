import Container from '@mui/material/Container';
import NewsFeed from './components/NewsFeed';
import NewsHeader from './components/NewsHeader';
import { useEffect, useState, useMemo, useRef } from 'react';
import { debounce } from 'lodash';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const Footer = styled('div')(({ theme }) => ({
  padding: theme.spacing(2, 0),
  display: 'flex',
  justifyContent: 'space-between',
}));

const PAGE_SIZE = 5;

function App() {
  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [category, setCategory] = useState('general');
  const pageNumber = useRef(1);
  const queryValue = useRef('');

  const abortControllerRef = useRef(null);

  async function loadData(currentCategory) {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?category=${currentCategory}&q=${queryValue.current}&page=${pageNumber.current}&pageSize=${PAGE_SIZE}&country=us&apiKey=${API_KEY}`,
        { signal: abortControllerRef.current.signal }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch news from the server.');
      }

      const data = await response.json();

      return data.articles.map((article) => {
        const { title, description, author, publishedAt, urlToImage, url } =
          article;
        return {
          url,
          title,
          description,
          author,
          publishedAt,
          image: urlToImage,
        };
      });
    } catch (er) {
      if (er.name === 'AbortError') {
        return null;
      }
      setError(er.message);
      return [];
    }
  }
  const fetchAndUpdateArticles = (currentCategory) => {
    setError('');
    setLoading(true);
    loadData(currentCategory ?? category).then((newData) => {
      if (newData) {
        setArticles(newData);
        setLoading(false);
      }
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

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    pageNumber.current = 1;
    fetchAndUpdateArticles(event.target.value);
  };

  return (
    <Container>
      <NewsHeader
        onSearchChange={handleSearchChange}
        category={category}
        onCategoryChange={handleCategoryChange}
      />
      <NewsFeed articles={articles} loading={loading} />
      {error.length ? (
        <Typography color="error" align="center">
          {error}
        </Typography>
      ) : null}
      <Footer>
        <Button
          variant="outlined"
          onClick={handlePreviousClick}
          disabled={loading || pageNumber.current === 1}
        >
          Previous
        </Button>
        <Button
          variant="outlined"
          onClick={handleNextClick}
          disabled={loading || articles.length < PAGE_SIZE}
        >
          Next
        </Button>
      </Footer>
    </Container>
  );
}

export default App;

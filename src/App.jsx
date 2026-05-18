import Container from '@mui/material/Container';
import NewsFeed from './components/NewsFeed';
import NewsHeader from './components/NewsHeader';
import { useEffect, useState } from 'react';

function App() {
  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadData(inputQuery) {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?q=${inputQuery}&country=us&apiKey=${API_KEY}`
    );

    const data = await response.json();
    console.log(data);
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
  }

  console.log('App reevaluated');

  useEffect(() => {
    setLoading(true);
    loadData('').then((newData) => {
      setArticles(newData);
      setLoading(false);
    });
  }, []);

  const handleSearchChange = (newQuery) => {
    loadData(newQuery).then(setArticles);
  };

  return (
    <Container>
      <NewsHeader onSearchChange={handleSearchChange} />
      <NewsFeed articles={articles} />
    </Container>
  );
}

export default App;

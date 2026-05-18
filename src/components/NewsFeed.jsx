import NewsArticle from './NewsArticle';

function NewsFeed({ articales }) {
  return (
    <div>
      {articales.map((articale) => (
        <NewsArticle key={JSON.stringify(articale)} {...articale} />
      ))}
    </div>
  );
}

export default NewsFeed;

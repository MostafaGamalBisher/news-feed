import NewsArticle from './NewsArticle';

function NewsFeed(props) {
  const { articales } = props;

  return (
    <div>
      {articales.map((articale) => (
        <NewsArticle key={JSON.stringify(articale)} {...articale} />
      ))}
    </div>
  );
}

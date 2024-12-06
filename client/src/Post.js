export default function Post({ title, summary, cover, content, createdAt }) {
  return (
      <div className="post">
          <div className="image">
              <img src={cover} alt="Cover image" />
          </div>
          <div className="texts">
              <h2>{title}</h2>
              <p className="info">
                  <a href="#" className="author">Henry</a>
                  <time>{createdAt}</time>
              </p>
              <p className="summary">{summary}</p>
          </div>
      </div>
  );
}

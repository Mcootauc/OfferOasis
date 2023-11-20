export default function Nav({ articles, onClick }) {
  return (
    <nav>
      {!articles
        ? 'No articles'
        : articles.map(a => (
            <p
              key={a.id}
              onClick={() => {
                onClick(a)
              }}
            >
              {a.title}
            </p>
          ))}
    </nav>
  )
}

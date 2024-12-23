export default async function Page() {
  const data = await fetch('https://api.vercel.app/blog')
  const posts = await data.json()
  return (
    <div className="main-content">
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  )
}
export default function MovieSearchForm() {
  return (
    <form method="get" action="/">
      <input name="name" required type="text" />
      <button type="submit">Search</button>
    </form>
  );
}

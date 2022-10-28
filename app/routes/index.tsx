import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import MovieSearchForm from "~/components/MovieSearchForm";
import type { IMovieDetails } from "~/types";
import { fetchTmdb, tmdbApi } from "~/utils";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const name = url.searchParams.get("name");
  if (name) {
    const { searchMovie } = tmdbApi.methods;
    const { path, queryString } = searchMovie({ name });
    const { results } = await fetchTmdb({ path, queryString });
    return json(results);
  }
  return [];
};

export default function MovieSearch() {
  const movies = useLoaderData();
  return (
    <div>
      <MovieSearchForm />
      <ul>
        {movies.map(({ id, overview, title }: IMovieDetails) => (
          <li key={id}>
            <h2>
              <Link to={`/movie/${id}`}>{title}</Link>
            </h2>
            <div>{overview}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

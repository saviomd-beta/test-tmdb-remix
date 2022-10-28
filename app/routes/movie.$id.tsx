import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { fetchTmdb, tmdbApi } from "~/utils";

interface ILoader {
  params: {
    id: number;
  };
}

export async function loader({ params }: ILoader) {
  const { id } = params;
  const { moviesDetails } = tmdbApi.methods;
  const movie = await fetchTmdb({ path: moviesDetails({ id }) });
  return json({
    budget: movie.budget,
    overview: movie.overview,
    release_date: movie.release_date,
    revenue: movie.revenue,
    runtime: movie.runtime,
    title: movie.title,
  });
}

export default function Movie() {
  const movie = useLoaderData();
  return (
    <div>
      <h1>{movie.title}</h1>
      <p>release_date: {movie.release_date}</p>
      <p>runtime: {movie.runtime}</p>
      <p>overview: {movie.overview}</p>
      <p>budget: {movie.budget}</p>
      <p>revenue: {movie.revenue}</p>
    </div>
  );
}

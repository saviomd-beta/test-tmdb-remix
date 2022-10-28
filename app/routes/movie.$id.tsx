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
      <h1 className="font-bold text-2xl">{movie.title}</h1>
      <p className="mb-4">
        <span className="font-bold">release_date:</span> {movie.release_date}
      </p>
      <p className="mb-4">
        <span className="font-bold">runtime:</span> {movie.runtime}
      </p>
      <p className="mb-4">
        <span className="font-bold">overview:</span> {movie.overview}
      </p>
      <p className="mb-4">
        <span className="font-bold">budget:</span> {movie.budget}
      </p>
      <p className="mb-4">
        <span className="font-bold">revenue:</span> {movie.revenue}
      </p>
    </div>
  );
}

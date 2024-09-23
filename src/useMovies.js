import { useState, useEffect } from "react";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setErrorMessage("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=97f182fc&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok)
            throw new Error(
              "Something went wrong while fetching the movies list"
            );
          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");
          setMovies(data.Search);
          setIsLoading(false);
          setErrorMessage("");
        } catch (error) {
          if (!error.name !== "AbortError") {
            setErrorMessage(error.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setErrorMessage("");
        return;
      }
      fetchMovies();
    },
    [query]
  );
  return { movies, isLoading, errorMessage };
}

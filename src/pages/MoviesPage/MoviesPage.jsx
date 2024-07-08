import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { fetchMovieByQuery } from "../../apiServise/apiServise";
import MovieList from "../../components/MovieList/MovieList";

export default function MoviesPage() {
  const [query, setQuery] = useState("");
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState("");

  const [params, setParams] = useSearchParams();
  const location = useLocation();

  const searchQuery = params.get("search");

   useEffect(() => {
     if (searchQuery) {
       setQuery(searchQuery); 
     }

     const getMovies = async () => {
       setIsLoading(true);
       setError(false);

       try {
         const { data } = await fetchMovieByQuery(searchQuery, page);
         setSearchedMovies((prev) =>
           page === 1 ? data.results : [...prev, ...data.results]
         );
         setIsVisible(data.results.length > 0);
         setStatus(data.results.length > 0 ? "success" : "rejected");
       } catch (error) {
         setError(true);
       } finally {
         setIsLoading(false);
       }
     };

     getMovies();
   }, [searchQuery, page]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!query.trim()) {
      return;
    }

    setParams({ search: query });
    setPage(1);
  };

  const handleOnChange = (event) => {
    setQuery(event.target.value);
  };

  const LoadMoreBtn = ({ onClick }) => {
    return <button onClick={onClick}>Load more</button>;
  };

  return (
    <>
      <h1>Movies Search</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          value={query}
          onChange={handleOnChange}
        />
        <button type="submit">Search</button>
      </form>

      {isLoading && <p>Loading..</p>}
      {error && <p>Error loading movies</p>}
      {status === "rejected" && <p>No movies were found</p>}

      <MovieList
        movies={searchedMovies}
        state={{ from: location, searchQuery, page }}
      />
      {isVisible && <LoadMoreBtn onClick={handleLoadMore} />}
    </>
  );
}

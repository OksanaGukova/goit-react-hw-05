import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { fetchMovieDetails } from "../../apiServise/apiServise";
import css from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const defaultImg = "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";
  const backLink = location.state?.from ?? "/movies";

  const [selectedMovie, setSelectedMovie] = useState(location.state?.movie ?? null);
  const [isLoading, setIsLoading] = useState(!selectedMovie);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    async function fetchDetails() {
      try {
        const { data } = await fetchMovieDetails(movieId);
        setSelectedMovie(data);
        setIsLoading(false);
      } catch (error) {
        setError("Error fetching movie details");
        setIsLoading(false);
      }
    }

    if (!selectedMovie) {
      fetchDetails();
    }
  }, [movieId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Link className={css.link} to={backLink}>
        Go back
      </Link>
      <div className={css.detailsContainer}>
        <div>
          <img
            className={css.img}
            src={
              selectedMovie.poster_path
                ? `https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`
                : defaultImg
            }
            alt={selectedMovie.title}
          />
        </div>
        <div>
          <h2>{selectedMovie.title}</h2>
          <p>{selectedMovie.overview}</p>
          <p>Release date - {selectedMovie.release_date}</p>
          <p>Popularity - {selectedMovie.popularity}</p>
        </div>
      </div>
      <div className={css.txtContainer}>
        <nav>
          <NavLink className={css.cast} to="cast">
            Cast
          </NavLink>
          <NavLink className={css.reviews} to="reviews">
            Reviews
          </NavLink>
        </nav>
        <Outlet />
      </div>
    </div>
  );
}
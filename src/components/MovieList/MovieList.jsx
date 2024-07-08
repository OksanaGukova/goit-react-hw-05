import { Link } from "react-router-dom";

export default function MovieList({ movies, state }) {
  return (
    <>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link
              to={`/movies/${movie.id}`}
              state={{ ...state, movie }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <div >
                <h2 >{movie.title}</h2>
                <p>{movie.release_date}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
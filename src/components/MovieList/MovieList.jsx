import { Link } from "react-router-dom";
import css from './MovieList.module.css'

 const defaultImg =
   "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";
    

export default function MovieList({ movies, state }) {
  return (
    <>
      <ul className={css.list}>
        {movies.map((movie) => (
          <li className={css.listItem} key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={{ ...state, movie }}>
              <div className={css.imgContainer}>
                 <img
                className={css.imgtItem}
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`: defaultImg}
                alt={movie.title}
              />
              </div>
              <div className={css.textContainer}>
                <h2 className={css.title}>{movie.title}</h2>
                <p className={css.text}>{movie.release_date}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
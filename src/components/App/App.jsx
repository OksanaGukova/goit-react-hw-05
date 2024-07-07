import { Routes, Route } from "react-router-dom";
import HomePage from '../../pages/HomePage/HomePage'
import MovieDetailsPage from '../../pages/MovieDetailsPage/MovieDetailsPage'
import MoviesPage from '../../pages/MoviesPage/MoviesPage'
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage'
import MovieCast from '../MovieCast/MovieCast'
import MovieReviews from '../MovieReviews/MovieReviews'

function App() {
     return (
       <div>
         <nav>
           <Link to="/">Home</Link>
           <Link to="/movies">Movies</Link>
         </nav>
         <Routes>
           <Route path="/" element={<HomePage />} />
           <Route path="/movies" element={<MoviesPage />} />
           <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
             <Route path="cast" element={<MovieCast />} />
             <Route path="reviews " element={<MovieReviews />} />
           </Route>
           <Route path="*" element={<NotFoundPage />} />
         </Routes>
       </div>
     );
}

export default App;

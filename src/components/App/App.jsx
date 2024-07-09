import { Routes, Route, Link } from "react-router-dom";
import { lazy, Suspense } from "react";
import MovieCast from "../MovieCast/MovieCast";
import MovieReviews from '../MovieReviews/MovieReviews'

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("../../pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() =>
  import("../../pages/MovieDetailsPage/MovieDetailsPage")
);
const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage")
);

function App() {
     return (
       <div>
         <nav>
           <Link to="/">Home</Link>
           <Link to="/movies">Movies</Link>
         </nav>
         <Suspense fallback={<div>Loading page...</div>}>
           <Routes>
             <Route path="/" element={<HomePage />} />
             <Route path="/movies" element={<MoviesPage />} />
             <Route path="/movies/:movieId/*" element={<MovieDetailsPage />}>
               <Route path="cast" element={<MovieCast />} />
               <Route path="reviews" element={<MovieReviews />} />
             </Route>
             <Route path="*" element={<NotFoundPage />} />
           </Routes>
         </Suspense>
       </div>
     );
}

export default App;

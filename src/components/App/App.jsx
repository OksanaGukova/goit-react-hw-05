import { Routes, Route, Link } from "react-router-dom";
import { lazy } from "react";


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
         <Routes>
           <Route path="/" element={<HomePage />} />
           <Route path="/movies" element={<MoviesPage />} />
           <Route path="/movies/:movieId/*" element={<MovieDetailsPage />} />
           <Route path="*" element={<NotFoundPage />} />
         </Routes>
       </div>
     );
}

export default App;

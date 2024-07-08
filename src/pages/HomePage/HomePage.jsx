import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchTrendingMovies } from "../../apiServise/apiServise";
import MovieList from '../../components/MovieList/MovieList'

export default function HomePage() {
     const [trendingMovies, setTrendingMovies] = useState([]);
     const location = useLocation();

     useEffect(() => {
       async function fetchTrending() {
         try {
           const data = await fetchTrendingMovies();
           setTrendingMovies(data);
         } catch (error) {
           console.log(error);
         }
       }
       fetchTrending();
     }, []);

     return (
       <div>
         <h1>Trending movies</h1>
         {trendingMovies.length && <MovieList movies={trendingMovies} />}
       </div>
     );
}
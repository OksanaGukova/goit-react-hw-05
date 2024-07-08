import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { fetchMovieDetails } from "../../apiServise/apiServise";


export default function MovieDatailsPage() {

   const { movieId } = useParams();
   const location = useLocation();
  
 const backLink = location.state?.from ?? "/movies";
   const [selectedMovie, setSelectedMovie] = useState(
     location.state?.movie ?? ""
   );

   useEffect(() => {
     async function fetchDetails() {
       try {
         const { data } = await fetchMovieDetails(movieId);
         setSelectedMovie(data);
       } catch (error) {
         alert("Error fetching movie details");
       }
     }

     if (!selectedMovie) {
       fetchDetails();
     }
   }, [movieId, selectedMovie]);

   if (!selectedMovie) {
     return <div >Loading...</div>;
   }

   return (
     <div>
       <Link to={backLink}>Go back</Link>
       <div>
         <div>
           <img
             src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
             alt={selectedMovie.title}
           />
         </div>
         <div>
           <h2>{selectedMovie.title}</h2>
           <p>{selectedMovie.overview}</p>
         </div>
       </div>
       <div>
         <nav>
           <NavLink to="cast">Cast</NavLink>
           <NavLink to="reviews">Reviews</NavLink>
         </nav>
         <Outlet />
       </div>
     </div>
   );
}

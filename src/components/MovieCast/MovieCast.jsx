import { Link, useLocation, useParams } from "react-router-dom";
import { fetchMovieDetails } from "../../apiServise/apiServise";
import { useEffect, useState } from "react";

export default function MovieCast() {
     const { movieId } = useParams();
     const [cast, setCast] = useState([]);
    const location = useLocation();
      const defaultImg =
        "<https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster>";
    
    const BackLink = ({ to, children }) => {
      return <Link to={to}>{children}</Link>;
    };

     useEffect(() => {
       async function fetchCast() {
         try {
           const data = await fetchMovieDetails(movieId);
           setCast(data);
         } catch (error) {
           console.log(error);
         }
       }
       fetchCast();
     }, [movieId]);

     return (
       <div>
         <BackLink to={location.state?.from ?? `/movies/${movieId}`}>
           Go back
         </BackLink>
         <h2>Movie Cast</h2>
         {cast.length === 0 ? (
           <p>No information</p>
         ) : (
           <ul>
             {cast.map((actor) => (
               <li key={actor.id}>
                 <img
                   src={
                     actor.profile_path
                       ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                       : defaultImg
                   }
                   alt={actor.name}
                 />
                 <div>
                   <h3>{actor.name}</h3>
                   <p>Character: {actor.character}</p>
                 </div>
               </li>
             ))}
           </ul>
         )}
       </div>
     );
}
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieReviews } from "../../apiServise/apiServise";
import css from './MovieReviews.module.css'

export default function Reviews() {
  const [reviewsList, setReviewsList] = useState([]);
  const { movieId } = useParams();

   const BackLink = ({ to, children }) => {
     return <Link to={to}>{children}</Link>;
   };

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await fetchMovieReviews(movieId);
        setReviewsList(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReview();
  }, [movieId]);

  return (
    <div>
      <div className={css.goBack}>
        <BackLink to={location.state?.from ?? `/movies/${movieId}`}>
          Go back
        </BackLink>
      </div>
      <ul>
        {reviewsList.length > 0
          ? reviewsList.map(({ author, content, id }) => (
              <li key={id}>
                <h3>{author}</h3>
                <p>{content}</p>
              </li>
            ))
          : "Sorry, we don't have any review for this movie"}
      </ul>
    </div>
  );
}

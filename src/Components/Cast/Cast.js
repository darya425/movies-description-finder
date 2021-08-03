import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as fetchShelMovies from '../../Services/movies-api';
import BASE_IMAGE_URL from '../../constants';

import './Cast.scss';

const Cast = () => {
  const { movieId } = useParams();
  const [casts, setCasts] = useState([]);

  useEffect(() => {
    fetchShelMovies.fetchCastById(movieId).then(({ cast }) => {
      setCasts(cast.filter(cast => !cast.profile_path === false));
    });
  }, [movieId]);

  return (
    <>
      {casts && (
        <div className="wrapper-info">
          <ul className="additional">
            {casts.map(({ cast_id, name, profile_path }) => (
              <li key={cast_id} className="additional-item">
                <img
                  src={`${BASE_IMAGE_URL}/${profile_path}`}
                  alt={name}
                  className="additional-img"
                />
                <h3 className="additional-name">{name}</h3>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Cast;

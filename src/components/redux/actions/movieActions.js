import axios from 'axios';

export const fetchMovies = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        'https://api.themoviedb.org/3/movie/now_playing?api_key=ac0f6066dac6b62088f80248468d7bfb&language=en-US'
      );
      dispatch({
        type: 'FETCH_MOVIES',
        payload: response.data.results,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

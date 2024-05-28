import React, { useState } from 'react';
import "../style/cards.css";
import Details from './Details';

export default function Cards(props) {
  const [popup, setPopup] = useState(false);

  function handleClick() {
    window.scrollTo({ top: 25, behavior: "smooth" });
    setPopup(prev => !prev);
  }

  const handleLinkClick = (event) => {
    event.stopPropagation(); // Prevent triggering the popup
    window.open(`https://www.themoviedb.org/movie/${props.id}`, '_blank');
  };

  return (
    <div className='card_container'>
      {popup && <Details popup={setPopup} data={props} />} 
      <div className="cards" onClick={handleClick}>
        <div className='card_description'>
          <div className='rating'>{props.vote_average}</div>
          <img
            src={"https://www.themoviedb.org/t/p/w220_and_h330_face" + props.poster_path}
            alt='Poster'
          />
          <h3 className='name'>{props.original_title}</h3>
          <button onClick={handleLinkClick} className='download_btn'>More Info / Download</button>
        </div>
      </div>
    </div>
  );
}

// Listing.js
import React, { useState } from 'react';

const Listing = ({ listing, onDelete }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div>
      <h3>{listing.description}</h3>
      <p>{listing.location}</p>
      <img src={listing.image} alt={listing.description} />
      <button onClick={toggleFavorite}>
        {isFavorite ? 'Unfavorite' : 'Favorite'}
      </button>
      <button onClick={() => onDelete(listing.id)}>Delete</button>
    </div>
  );
};

export default Listing;

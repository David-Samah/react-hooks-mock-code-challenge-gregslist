
import React, { useState, useEffect } from 'react';
import Listing from './Listing';

const ListingList = () => {
  const [listings, setListings] = useState([]);
    const [sorted, setSorted] = useState(false);
  
  useEffect(() => {
    fetch('http://localhost:6001/listings')
      .then((response) => response.json())
      .then((data) => setListings(data));
  }, []);

  return (
    <div>
      {listings.map((listing) => (
        <Listing key={listing.id} listing={listing} onDelete={deleteListing} />
      ))}
    </div>
  );

  const deleteListing = (id) => {
    fetch(`http://localhost:6001/listings/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setListings(listings.filter((listing) => listing.id !== id));
      });
  };



  const sortListings = () => {
    const sortedListings = [...listings].sort((a, b) => a.location.localeCompare(b.location));
    setListings(sortedListings);
    setSorted(!sorted);
  };

  return (
    <div>
      <button onClick={sortListings}>
        Sort by Location {sorted ? '↓' : '↑'}
      </button>
      {listings.map((listing) => (
        <Listing key={listing.id} listing={listing} onDelete={deleteListing} />
      ))}
    </div>
  );
};


export default ListingList;

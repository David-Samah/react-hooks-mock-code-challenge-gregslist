import React, { useState, useEffect } from 'react';
import Listing from './Listing';
import NewListingForm from './NewListingForm'; 

export default function App() {
  const [listings, setListings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('http://localhost:6001/listings')
      .then((response) => response.json())
      .then((data) => setListings(data))
      .catch((error) => console.error('Error fetching listings:', error));
  }, []);

  const deleteListing = (id) => {
    fetch(`http://localhost:6001/listings/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setListings((prevListings) =>
          prevListings.filter((listing) => listing.id !== id)
        );
      })
      .catch((error) => console.error('Error deleting listing:', error));
  };

  
  const toggleFavorite = (id) => {
    setListings((prevListings) =>
      prevListings.map((listing) =>
        listing.id === id
          ? { ...listing, isFavorite: !listing.isFavorite }
          : listing
      )
    );
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  const filteredListings = listings.filter((listing) =>
    listing.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1>gregslist - Free Items Near You</h1>
      <input
        type="text"
        placeholder="Search listings"
        value={searchQuery}
        onChange={handleSearch}
      />
      <NewListingForm setListings={setListings}  />
      <div>
        {filteredListings.map((listing) => ( 
          <Listing
            key={listing.id}
            listing={listing}
            onDelete={deleteListing}
            onFavorite={toggleFavorite}
          />
        ))}
      </div>
    </div>
  );
}

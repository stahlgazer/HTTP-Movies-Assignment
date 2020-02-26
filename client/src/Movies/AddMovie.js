import React, { useState } from "react";
import axios from "axios";

export const AddMovie = props => {
  const [newMovie, setNewMovie] = useState({
    title: "",
    director: "",
    metascore: "",
    stars: [],
  });

  const handleChange = event => {
    setNewMovie({
      ...newMovie,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = e => {
    let stars;

    if (newMovie.stars instanceof Array) {
      stars = newMovie.stars;
    } else {
      stars = newMovie.stars.split(",");
    }
    let data = { ...newMovie, stars };

    e.preventDefault();
    axios
      .post(`http://localhost:5000/api/movies/`, data)
      .then(res => {
        console.log(res, "addmovie data response");
        props.history.push("/");
      })
      .catch(err => console.log(err));
    console.log("adding Movie:", data);
  };

  console.log("add movie ran");

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Movie Title: </label>
        <input name="title" type="text" onChange={handleChange} />

        <label>Director: </label>
        <input name="director" type="text" onChange={handleChange} />

        <label>Metascore: </label>
        <input name="metascore" type="text" onChange={handleChange} />
        
        <label>Stars: </label>
        <input name="stars" type="text" onChange={handleChange} />

        <button>Add Movie</button>
      </form>
    </div>
  );
};

import React, { useState } from "react";
import axios from "axios";

export const AddMovie = props => {
  const [newMovie, setNewMovie] = useState({
    title: "",
    director: "",
    metascore: "",
    stars: []
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
      <form onSubmit={handleSubmit} className="addmovie">
        <label>Movie Title: </label>
        <input name="title" type="text" placeholder="Interstellar" onChange={handleChange} required />

        <label>Director: </label>
        <input name="director" type="text" placeholder="Christopher Nolan" onChange={handleChange} required />

        <label>Metascore: </label>
        <input name="metascore" type="text" placeholder="74" onChange={handleChange} required />

        <label>Stars: (Separate with Commas)</label>
        <input name="stars" type="text" placeholder="Matthew McConaughey, Anne Hathaway, Jessica Chastain, Michael Caine" onChange={handleChange} required />

        <button>Add Movie</button>
      </form>
    </div>
  );
};

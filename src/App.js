import React, { useState, useEffect } from "react";
import axios from "axios"

import './App.css';

function App() {
  const [jokes, setJokes] = useState([]);
  const [checkedValues, setCheckedValues] = useState([]);
  const [post, setPost] = useState({
    category : "",
    joke: ""
  })
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setCheckedValues([...checkedValues, value]);
    } else {
      setCheckedValues(checkedValues.filter((item) => item !== value));
    }

  };
  const getJoke = () => {
    axios
      .get(`https://v2.jokeapi.dev/joke/${checkedValues}?type=single`)
      .then((res) => {
        setJokes(res.data);
        console.log(jokes.category)
        console.log(jokes.joke)
        console.log(post)
      })
      .catch((error) => {
        console.log(error);
      });
    setPost({
      category: jokes.category,
      joke: jokes.joke
    });  
  };

  function postJoke (event) {
    event.preventDefault()
    axios.post('http://127.0.0.1:8000/api/joke/', post)
    .then(response => console.log(response))
    .catch(err => console.log(err))
  }

  return (
    
    <div>
      <input value="Programming" type="checkbox" onChange={handleCheckboxChange} />
      <label>Pun</label>
      <input value={"Misc"} type="checkbox" onChange={handleCheckboxChange} />
      <label>Misc</label>
      {/* <p>Checked values: {checkedValues.join(', ')}</p> */}
      {/* <input value={name || ''} type="checkbox" onChange={(e) => setName(e.target.value)} /> */}
      <label>Programming</label>
      {/* <input value={name || ''} type="checkbox" onChange={(e) => setName(e.target.value)} /> */}
      <label>Misc</label>
      <button onClick={getJoke}>Get Joke</button>
      <p>{jokes.category}</p>
      <p>{jokes.joke}</p>
      {/* <p>{jokes.setup}</p>
      <p>{jokes.delivery}</p> */}
      <button onClick={postJoke}>Post joke</button>
    </div>
  );
}

export default App;

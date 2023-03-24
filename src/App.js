import React, { useState, useEffect } from "react";
import axios from "axios"

import './App.css';

function App() {
  const [jokes, setJokes] = useState([]);
  const [checkedValues, setCheckedValues] = useState([]);
  const [jokeId, setJokeId] = useState(1)
  const [post, setPost] = useState({
    category : "",
    joke: ""
  })
  const [flag, setFlag] = useState({
    nsfw: false,
    religious: false,
    political: false,
    racist: false,
    sexist: false,
    explicit: false,
    type: null,
    setup: null,
    delivery: null,
    safe: true,
    lang: 'en',
    joke_id : jokeId
  })
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setCheckedValues([...checkedValues, value]);
    } else {
      setCheckedValues(checkedValues.filter((item) => item !== value));
    }

  };
  const handleFlagChange = (event) => {
    const { name, checked } = event.target;
    setFlag((prevState) => ({
      ...prevState,
      [name]: checked
    }));
  };
  
  const getJoke = () => {
    axios
      .get(`https://v2.jokeapi.dev/joke/${checkedValues}?type=single`)
      .then((res) => {
        setJokes(res.data);
        console.log(jokes.category)
        console.log(jokes.joke)
        console.log(post)
        console.log(flag)
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
    axios.post('http://127.0.0.1:8000/api/joke/', post,flag,jokeId )
    .then(response => console.log(response))
    .catch(err => console.log(err))
  }
  return (
    <div>
      <input
        value="Programming"
        type="checkbox"
        onChange={handleCheckboxChange}
      />
      <label>Programming</label>
      <input value={"Misc"} type="checkbox" onChange={handleCheckboxChange} />
      <label>Misc</label>
      <label>
        NSFW:
        <input
          type="checkbox"
          name="nsfw"
          checked={flag.nsfw}
          onChange={handleFlagChange}
        />
      </label>
      <label>
        Religious:
        <input
          type="checkbox"
          name="religious"
          checked={flag.religious}
          onChange={handleFlagChange}
        />
      </label>
      <label>
        Political:
        <input
          type="checkbox"
          name="political"
          checked={flag.political}
          onChange={handleFlagChange}
        />
      </label>
      <label>
        Racist:
        <input
          type="checkbox"
          name="racist"
          checked={flag.racist}
          onChange={handleFlagChange}
        />
      </label>
      <label>
        Sexist:
        <input
          type="checkbox"
          name="sexist"
          checked={flag.sexist}
          onChange={handleFlagChange}
        />
      </label>
      <label>
        Explicit:
        <input
          type="checkbox"
          name="explicit"
          checked={flag.explicit}
          onChange={handleFlagChange}
        />
      </label>

      <button onClick={getJoke}>Get Joke</button>

      <button onClick={postJoke}>Post joke</button>
    </div>
  );
}

export default App;

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
  const [data,setData] = useState([])
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
    axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/api/joke/',
      data: {
        category: jokes.category,
        joke: jokes.joke,
        flag,
        joke_id: jokes.id
      }

    })
    .then(response => console.log(response))
  }
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/joke/')
      .then(reponse => {
        setData(reponse.data);
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  return (
    <div>
      <div className="category_checkbox">
        <h1>Category</h1>
        <label>
          Programming
          <input
            value="Programming"
            type="checkbox"
            onChange={handleCheckboxChange}
          />
        </label>
        <label>
          Misc
          <input
            value={"Misc"}
            type="checkbox"
            onChange={handleCheckboxChange}
          />
        </label>
        <label>
          Dark
          <input
            value={"Dark"}
            type="checkbox"
            onChange={handleCheckboxChange}
          />
        </label>
        <label>
          Pun
          <input
            value={"Pun"}
            type="checkbox"
            onChange={handleCheckboxChange}
          />
        </label>
        <label>
          Spooky
          <input
            value={"Spooky"}
            type="checkbox"
            onChange={handleCheckboxChange}
          />
        </label>
        <label>
          Christmas
          <input
            value={"Christmas"}
            type="checkbox"
            onChange={handleCheckboxChange}
          />
        </label>
      </div>
      <div className="flag_checkbox">
        <h1>Flags</h1>
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
      </div>

      <button onClick={getJoke}>Get Joke</button>

      <button onClick={postJoke}>Post joke</button>

      <div>
        {data.map((item) => (
          <div key={item}>
            <p>{item.joke}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

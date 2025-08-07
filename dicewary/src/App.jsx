import './App.css'
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {

  const [wordlist, setWordlist] = useState(new Map());
  const [passphrase, setPassphrase] = useState("");

  useEffect(() => {
      axios.get("/eff_large_wordlist.json").then((res) => {
      const map = new Map(Object.entries(res.data.words));
      setWordlist(map);
    });
  }, []);

  /*
    This function modified from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    with the help of AI
    Returns an integer in the range [min, max)
    Behavior undefined if min and max are not integers
  */
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }


  function generate(numWords) {
    console.log("generate() called");

    let words = [];

    for (let i = 0; i < numWords; i++) {
      let currWord = "";
      for (let j = 0; j < 5; j++) {
        currWord += randomInt(1, 6)
      }
      let nextWord = wordlist.get(currWord);
      nextWord = nextWord.at(0).toUpperCase() + nextWord.substring(1);
      words[i] = nextWord;
    }

    let newPassphrase = "";

    for (let i = 0; i < numWords; i++) {
      newPassphrase += words[i];
    }

    setPassphrase(newPassphrase);
    return newPassphrase;
  }

  return (
    <>
      <div>

        <Typography
          variant="h1"
        >
          Dicewary
        </Typography>

        <Typography
          variant="body1"
          sx={{ margin: 2 }}
        >
          {passphrase}
        </Typography>

        <Button variant='contained'
          onClick={() => {
            generate(5);
          }}
        >
          Generate
        </Button>

      </div>
      
    </>
  )
}

export default App

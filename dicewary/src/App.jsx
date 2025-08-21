import './App.css'
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';
import { Box } from '@mui/material';
import { Link } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { createTheme, responsiveFontSizes } from '@mui/material/styles';


function App() {

  let theme = createTheme({
    typography: {
      body1: {
        fontSize: 24,
      },
    },
  });
  // theme = responsiveFontSizes(theme);

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

  // this function from GeeksForGeeks at https://www.geeksforgeeks.org/reactjs/how-to-copy-text-to-the-clipboard-in-react-js/
  const handleCopyClick = async () => {
        try {
            await window.navigator.clipboard.writeText(passphrase);
            alert("Copied to clipboard!");
        } catch (err) {
            console.error(
                "Unable to copy to clipboard.",
                err
            );
            alert("Copy to clipboard failed.");
        }
    };

    function TitleBox() {
      return (
        <Box
          sx={{ mb: 5 }}
        >
          <Typography
            variant="h1"
          >
            Dicewary
          </Typography>

          <Typography
            variant="caption"
          >
            Quickly generate complex passwords--backed by mathematics! <br/>
            Based on the <Link href="https://theworld.com/~reinhold/diceware.html" underline='hover' rel="noopener noreferrer">method </Link>
             outlined by Arnold G. Reinhold<br/>
            using the EFF's improved <Link href="https://www.eff.org/files/2016/07/18/eff_large_wordlist.txt" underline='hover' rel="noopener noreferrer">wordlist</Link>
          </Typography>
        </Box>
      )
    }

    function Footer() {
      return (
        <Box
          sx={{margin: "auto", alignItems: "flex-end"}}
          bottom={0}
        >
          Made by Andrew Marston | andrew.marston21@gmail.com | <Link href="https://github.com/andrewmarston21">My GitHub</Link> | <Link href="https://www.linkedin.com/in/andrewmarston21/">My LinkedIn</Link>
        </Box>
      )
    }

  if (passphrase != "") {
    return (
        <>
          <ThemeProvider theme={theme}>
            <div>

              <TitleBox/>

              <Box
                sx={{  }}
              >
                <Typography
                  variant="body1"
                  sx={{ margin: 2 }}
                >
                  {passphrase}
                </Typography>
              </Box>
              
              <Grid
                container spacing={1}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Button 
                  variant='contained'
                  onClick={() => {
                    generate(5);
                  }}
                >
                  Generate
                </Button>
                <Button
                  variant='contained'
                  onClick={() => {
                    handleCopyClick();
                  }}
                >
                  Copy to clipboard
                </Button>
              </Grid>
              <Footer/>
            </div>
          </ThemeProvider>
        </>
      )
  } else {
    return (
      <>
      <ThemeProvider theme={theme}>
          <div>

            <TitleBox/>

            <Box>
              <Typography
                variant="body1"
                sx={{ margin: 2 }}
              >
                Click generate to make a password!
              </Typography>
            </Box>

            <Grid
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Button variant='contained'
                onClick={() => {
                  generate(5);
                }}
              >
                Generate
              </Button>
            </Grid>
            <Footer/>
          </div>
        </ThemeProvider>
      </>
    )
  }

  
}

export default App

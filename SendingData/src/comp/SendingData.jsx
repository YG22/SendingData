import React, { useState } from "react";
import SendIcon from "@material-ui/icons/Send";
import CancelIcon from "@material-ui/icons/Cancel";
import { CircularProgress, TextField, Box, Button } from "@material-ui/core";
const axios = require("axios").default;

function SendingData() {
  const [message, setMessage] = useState("");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [urlPath, setUrlPath] = useState("");
  const [resultOfRequest, setResultOfRequest] = useState([]);
  const [style, setStyle] = useState("");
  const [color, setColor] = useState("primary");
  const options = ["people", "planets", "species", "starships", "vehicles"];

  function handleInput(event) {
    setInput(event.target.value);
    setUrlPath(event.target.value);
  }

  function Close() {
    setStyle("none");
  }
  function handleClick() {
    setResultOfRequest([]);

    for (let name of options) {
      if (!options.includes(input)) {
        setMessage("Entering an incorrect option");
        setStyle("none");
        setColor("secondary");
      } else {
        setMessage("");
        setColor("primary");
      }
    }
    // setInput("");
    setLoading(true);
    axios
      .get(`https://swapi.dev/api/${urlPath}/`)
      .then(function (response) {
        setLoading(false);
        setResultOfRequest(response.data.results);
        setMessage("");
        setStyle("resultOfRequest");
        console.log(response.data.results);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <div>
      <div>
        <h1>Enter one of the following options:</h1>
        <h3>people , planets , species , starships , vehicles</h3>
      </div>
      <Box m={2}>
        <TextField
          onChange={handleInput}
          id="outlined-basic"
          label="Enter Your Selection"
          variant="outlined"
        />
      </Box>
      <Box m={2}>
        <Button
          onClick={handleClick}
          variant="contained"
          color={color}
          endIcon={<SendIcon />}
        >
          send
        </Button>
        <h2>{input}</h2>
        <h2 style={{ color: "#f50057" }}>{message}</h2>
      </Box>
      {loading ? <CircularProgress color="secondary" /> : ""}
      <Box mt={2}>
        <div className={style}>
          {style === "resultOfRequest" ? (
            <Button onClick={Close}>
              <CancelIcon className="closeBtn" color="primary" />
            </Button>
          ) : (
            ""
          )}
          {resultOfRequest.map((item, index) => {
            return (
              <div>
                <h3 key={index}>{item.name}</h3>
              </div>
            );
          })}
        </div>
      </Box>
    </div>
  );
}
export default SendingData;

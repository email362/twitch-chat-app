import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import tmi from "tmi.js";
import TodoList from "./components/TodoList";

// const emoteArray = [
//   "batPls",
//   "PepeLaugh",
//   "catJAM",
//   "forsenPls",
//   "BatChest",
//   "PepePls",
//   "nyanPls",
//   "muniDance",
//   "xqcKek",
//   "LUL",
//   "PogU",
//   "monkaW",
//   "PagMan",
//   "muniPANIC",
//   "RIPBOZO",
//   "LULW",
//   "PogChamp",
//   "PauseChamp",
//   "WeirdChamp",
// ];
// let foundEmote = false;
// let counter = 0;


const CHAT_CHANNEL = "EsfandTV";
const AUTH_NAME = "ChrisPocket";
const AUTH_TOKEN = "oauth:f2hutx5iaqamnlnc1nt84ivxrfs411";

const client = new tmi.Client({
  channels: [CHAT_CHANNEL],
  identity: {
    username: AUTH_NAME,
    password: AUTH_TOKEN,
  },
});

client.connect();


const App = () => {
  //  const params = new URLSearchParams();
  //  params.append('client_id','cwkcuiz8yzy7g5gojv1u9i35i395mz');
  //  params.append('client_secret',`dsbse5p2x7r67j2vpgrjuhzrynt0f1`);
  //  params.append('grant_type','client_credentials');
  //
  //  axios.post('https://id.twitch.tv/oauth2/token',params)
  //  .then(res => {
  //    console.log(res.data?.access_token);
  //    const authInstance = axios.create({
  //      headers:{
  //        'Authorization':`Bearer ${res.data['access_token']}`,
  //        'Client-Id':`cwkcuiz8yzy7g5gojv1u9i35i395mz`
  //      }
  //    });
  //    authInstance.get('https://api.twitch.tv/helix/users?login=zfiesty')
  //    .then(res => Object.keys(res.data.data[0]).forEach(item => console.log(`${item} : ${res.data.data[0][item]}`)))
  //    .catch(err => console.log(err));
  //  })
  //  .catch(err => console.log(err));
  const [message, setMessage] = useState(null);
  const [messageList, setMessageList] = useState([]);
  const [connected, setConnected] = useState(true);

  // useEffect(() => {
  //   client.connect();
  //   return () => client.disconnect();
  // }, []);

  

useEffect(()=> {

  client.on("message", (channel, tags, message, self) => {
    // console.log(`${tags["display-name"]}: ${message}`);
    if( message !== null ) {
      setMessage(prev => message);
    }
  });
  return () => {
    client.disconnect();
  }
}, []);

useEffect(()=> {
  setMessageList(prev => {
    if(message !== null) {
      return [...prev, message];
    } else {
      return [...prev];
    }
  });
},[message]);

const handleDisconnect = () => {
  if (connected) {
    client.disconnect();
    setConnected(prev => false);
  } else {
    console.log('Already disconnected');
  }
};

const handleConnect = () => {
  if(!connected) {
    client.connect();
    setConnected(prev => true);
  } else {
    console.log('Already connected');
  }
};

  return (
    <div>
      <TodoList data={messageList} />
      <button onClick={handleDisconnect}>
        Disconnect
      </button>
      <button onClick={handleConnect}>
        Connect
      </button>
    </div>
  );
};

export default App;

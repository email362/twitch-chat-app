import React, { useEffect } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import tmi from 'tmi.js';

const emoteArray = ['batPls','PepeLaugh','catJAM','forsenPls','BatChest','PepePls','nyanPls','muniDance','xqcKek','LUL','PogU','monkaW','PagMan','muniPANIC','RIPBOZO','LULW','PogChamp','PauseChamp','WeirdChamp'];
let foundEmote = false;
let counter = 0;



const App = () => {

  const params = new URLSearchParams();
  params.append('client_id','cwkcuiz8yzy7g5gojv1u9i35i395mz');
  params.append('client_secret',`dsbse5p2x7r67j2vpgrjuhzrynt0f1`);
  params.append('grant_type','client_credentials');

  axios.post('https://id.twitch.tv/oauth2/token',params)
  .then(res => {
    console.log(res.data?.access_token);
    const authInstance = axios.create({
      headers:{
        'Authorization':`Bearer ${res.data['access_token']}`,
        'Client-Id':`cwkcuiz8yzy7g5gojv1u9i35i395mz`
      }
    });
    authInstance.get('https://api.twitch.tv/helix/users?login=zfiesty')
    .then(res => Object.keys(res.data.data[0]).forEach(item => console.log(`${item} : ${res.data.data[0][item]}`)))
    .catch(err => console.log(err));
  })
  .catch(err => console.log(err));

  const client = new tmi.Client({
    channels: [ 'chrispocket' ],
    identity: {
      username: 'ChrisPocket',
      password: 'oauth:f2hutx5iaqamnlnc1nt84ivxrfs411'
    }
  });
  useEffect( () => {
    client.connect();
  }, []);
  
  client.on('message', (channel, tags, message, self) => {
    // "Alca: Hello, World!"
    while (!foundEmote && counter < emoteArray.length) {
      if(message.includes(emoteArray[counter])) {
        foundEmote = true;
      } else {
        counter++;
      }
    }
    if(!foundEmote) {
      console.log(`${tags['display-name']}: ${message}`);
    }
    foundEmote = false;
    counter = 0;
  });

  

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={() => client.say('ChrisPocket', 'New React Message')}>
          Send Message
        </button>
      </header>
    </div>
  );
};

export default App;

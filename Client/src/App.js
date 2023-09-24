import './App.css';
import { useRoutes } from "react-router-dom";
import MenuChooseGame from './MenuChooseGame';
import MenuJoinGame from './MenuJoinGame';
import LobbyServer from './LobbyServer';
import LobbyClient from './LobbyClient';
import { Stack } from '@mui/material';

function App() {

  let routes = [
    {
      path: "/",
      element: <MenuChooseGame />,
    },
    {
      path: "use",
      element: <LobbyServer />,
    },
    {
      path: "use/:code",
      element: <LobbyClient />,
    },
    {
      path: "use/join",
      element: <MenuJoinGame />,
    },
    {
      path: "/useyourword",
      element: <p> use your word component </p>,
    },
    {
      path: "*",
      element: <p>Error</p>
    }
  ];

  let element = useRoutes(routes);

  return (
    <Stack alignContent={'center'} alignItems={'center'}>
      <p>Header</p>
      {element}
    </Stack>
  );
}

export default App;

import './App.css';
import { useRoutes } from "react-router-dom";
import MenuChooseGame from './MenuChooseGame';
import MenuJoinGame from './MenuJoinGame';
import LobbyServer from './LobbyServer';
import { Stack } from '@mui/material';

function App() {

  let routes = [
    {
      path: "/",
      element: <MenuChooseGame />,
    },
    {
      path: "/lobbyServer/:game",
      element: <LobbyServer />,
    },
    {
      path: "/lobbyClient/:game/:code",
      element: <LobbyServer />,
    },
    {
      path: "/joinGame/:game",
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

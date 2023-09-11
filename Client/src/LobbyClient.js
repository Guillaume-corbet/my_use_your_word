import * as React from 'react';
import Button from '@mui/material/Button';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {socket} from "./socket";

function LobbyClient() {

    let {game, code} = useParams();
    const navigate = useNavigate();

    const test = (res) => {
      console.log(res)
    }

    const NoRoom = (res) => {
      navigate('../joinGame/' + game)
    }

    React.useEffect(() => {
      socket.emit("joinRoom", code);
      socket.on("RoomJoined", test)
      socket.on("NoRoom", NoRoom)
      return () => {
        socket.off('RoomJoined', test)
        socket.off('NoRoom', NoRoom)
      }
    }, [])

    return (
      <Link to="../">
        <Button variant="contained" color="success">
          {game}, {code}
        </Button>
      </Link>
    )
}

export default LobbyClient;
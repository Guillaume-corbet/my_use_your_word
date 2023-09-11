import * as React from 'react';
import Button from '@mui/material/Button';
import { Link, useParams } from 'react-router-dom';
import {socket} from "./socket";

function LobbyServer() {

    let {game} = useParams();
    const [roomCode, setRoomCode] = React.useState('');

    const RoomCreated = (code) => {
      setRoomCode(code.code)
    }

    React.useEffect(() => {
      socket.emit("createRoom");
      socket.on("RoomCreated", RoomCreated)
      return () => {
        socket.off('RoomCreated', RoomCreated)
      }
    }, [])

    return (
        
          <Link to="../">
            <Button variant="contained" color="success">
                {game} {roomCode}
            </Button>
          </Link>
    )
}

export default LobbyServer;
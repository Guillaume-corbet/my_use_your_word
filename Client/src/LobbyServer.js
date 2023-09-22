import * as React from 'react';
import Button from '@mui/material/Button';
import { Link, useParams } from 'react-router-dom';
import {socket} from "./socket";

function LobbyServer() {

    let {game} = useParams();
    const [roomCode, setRoomCode] = React.useState('');
    const [members, setMembers] = React.useState([])

    const RoomCreated = (code) => {
      setRoomCode(code.code)
    }

    const UserJoined = (user) => {
      setMembers([...members, user])
    }

    React.useEffect(() => {
      console.log(game)

      socket.emit("createRoom");
      socket.on("RoomCreated", RoomCreated)
      return () => {
        socket.off('RoomCreated', RoomCreated)
      }
    }, [])

    React.useEffect(() => {
      socket.on('UserJoined', UserJoined)
      return () => {
        socket.off('UserJoined', UserJoined)
      }
    }, [members])

    return (
        <div>
          <p>Lobby Server</p>
          <p>Room code: {roomCode}</p>
          {members.map(member => (
            <p key={member}>{member}</p>
          ))}
          <Link to="../">
            <Button variant="contained" color="success">
                Menu principale
            </Button>
          </Link>
        </div>
    )
}

export default LobbyServer;
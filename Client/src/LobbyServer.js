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
      console.log("enter")
      console.log(user)
      console.log(members)
      setMembers([...members, user])
      console.log(user)
      console.log(members)
    }

    React.useEffect(() => {
      console.log(game)

      socket.emit("createRoom");
      socket.on("RoomCreated", RoomCreated)
      socket.on('UserJoined', UserJoined)
      return () => {
        socket.off('RoomCreated', RoomCreated)
        socket.off('UserJoined', UserJoined)
      }
    }, [])

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
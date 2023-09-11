import * as React from 'react';
import Button from '@mui/material/Button';
import { Link, useParams } from 'react-router-dom';
import { Stack, TextField } from '@mui/material';

function MenuJoinGame() {

    let {game} = useParams();
    const [code, setCode] = React.useState('');

    function getPath(server) {
        if (server) {
            return ("../lobbyServer/" + game)
        } else {
            return ("../lobbyClient/" + game + "/" + code)
        }
    }

    return (
        <Stack>
            <Link to={getPath(true)}>
                <Button variant="contained" color="success">
                    create new one
                </Button>
            </Link>
            <TextField
                id="GameCode"
                label="Code"
                value={code}
                onChange={(event) => {
                    setCode(event.target.value);
                }}
            />
            <Link to={getPath(false)}>
                <Button variant="contained" color="success">
                    Join one
                </Button>
            </Link>
        </Stack>
    )
}

export default MenuJoinGame;
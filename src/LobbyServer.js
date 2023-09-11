import * as React from 'react';
import Button from '@mui/material/Button';
import { Link, useParams } from 'react-router-dom';

function LobbyServer() {

    let {game} = useParams();

    return (
        
          <Link to="../">
            <Button variant="contained" color="success">
                {game}
            </Button>
          </Link>
    )
}

export default LobbyServer;
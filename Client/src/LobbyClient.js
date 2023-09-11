import * as React from 'react';
import Button from '@mui/material/Button';
import { Link, useParams } from 'react-router-dom';

function lobbyClient() {

    let {game, code} = useParams();

    return (
      <Link to="../">
        <Button variant="contained" color="success">
          {game}, {code}
        </Button>
      </Link>
    )
}

export default lobbyClient;
import * as React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function MenuChooseGame() {
    return (
      <div>
        <Link to="../use/join">
          <Button variant="contained" color="success">
              Use your word
          </Button>
        </Link>
      </div>
    )
}

export default MenuChooseGame;
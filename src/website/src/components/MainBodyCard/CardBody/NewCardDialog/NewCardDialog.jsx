import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText,
} from '@material-ui/core';

export default function NewCardDialog(props) {
  const { openDialog, setOpenDialog, createNewCard } = props;
  const [tag, setTag] = useState('');

  const handleTagInputChange = () => (event) => {
    setTag(event.target.value);
  };

  return (
    <div>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Create a new card by specifying a tag. The tag is used for identifying which service this card is for
          </DialogContentText>
          <TextField
            label="Tag"
            placeholder="eg Spotify"
            onChange={handleTagInputChange()}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} autoFocus>
            cancel
          </Button>
          <Button
            onClick={() => {
              createNewCard(tag);
              setOpenDialog(false);
            }}
            autoFocus
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

NewCardDialog.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  setOpenDialog: PropTypes.func.isRequired,
  createNewCard: PropTypes.func.isRequired,
}
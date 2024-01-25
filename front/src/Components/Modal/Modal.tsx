import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Box, TextField } from '@mui/material';
import InputFile from '../InputFile/InputFile';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { IMessageCreate } from '../../types';
import { fetchData, postData } from '../../store/messageThunk';

export default function Modal() {
  const [open, setOpen] = React.useState(false);

  const [state, setState] = useState<IMessageCreate>({
    author: '',
    message: '',
    image: null
  });
  const dispatch = useDispatch<AppDispatch>();
  const {postLoad} = useSelector((state:RootState) => state.messages)


  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setState(prevState => ({...prevState, [name]: value}));
  };
  const onChangeFiles = (e: React.ChangeEvent<HTMLInputElement>) => {

    const {name, files} = e.target;

    if (files) {
      setState(prevState => ({...prevState, [name]: files[0]}));
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(postData(state));
    await dispatch(fetchData());
    setState({author: '', message: '', image: null});
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Message
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >

        <DialogContent>
          <Box
            component="form"
            onSubmit={onSubmit}
            display="flex"
            sx={{'& > :not(style)': {m: 1}}}

          >
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
              <TextField
                id="input-with-sx"
                label="Author"
                name="author"
                sx={{width: '100%'}}
                onChange={onChange}
                value={state.author}
              />

              <TextField
                id="filled-multiline-static"
                label="Message"
                multiline
                required
                rows={2}
                sx={{width: '100%', marginTop: '5px', marginBottom: '5px'}}
                name="message"
                onChange={onChange}
                value={state.message}
              />

              <InputFile
                onChange={onChangeFiles}
                name={'image'}
                label={'image'}
              />
              <Button
                type={'submit'}
                sx={{
                  width: '100%',
                  marginTop: '5px',
                  background: 'green'
                }}
                variant={'contained'}
              >
                {
                  postLoad ? 'Load' : 'Send'
                }
              </Button>

            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              background: 'red',
              color: 'white'
            }}
            variant={'contained'}
            onClick={handleClose}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

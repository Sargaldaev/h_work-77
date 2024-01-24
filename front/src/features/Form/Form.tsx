import React, { useState } from 'react';
import InputFile from '../../Components/InputFile/InputFile';
import { IMessageCreate } from '../../types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { Box, Button, TextField } from '@mui/material';
import { fetchData, postData } from '../../store/messageThunk';

const Form = () => {

  const dispatch = useDispatch<AppDispatch>();
  const [state, setState] = useState<IMessageCreate>({
    author: '',
    message: '',
    image: null
  });


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
    setState({author:'',message:'',image:null})
  };

  return (
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
          variant="standard"
          name="author"
          onChange={onChange}
          value={state.author}
        />

        <TextField
          id="filled-multiline-static"
          label="Message"
          multiline
          rows={2}
          variant="filled"
          name="message"
          onChange={onChange}
          value={state.message}
        />

        <InputFile onChange={onChangeFiles} name={'image'} label={'image'}/>

        <Button
          type={'submit'}
          variant={'contained'}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default Form;
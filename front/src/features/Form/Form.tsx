import React, { useState } from 'react';
import InputFile from '../../Components/InputFile/InputFile';
import { IMessageCreate } from '../../types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { Box, TextField } from '@mui/material';

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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    // <Box
    //   component={'form'}
    // >
    //   <TextField
    //     name={'author'}
    //     onChange={onChange}
    //     value={state.author}
    //   />
    //
    //   <TextField
    //     name={'message'}
    //     onChange={onChange}
    //     value={state.message}
    //   />
    //
    //   <InputFile onChange={onChangeFiles} name={'image'} label={'image'}/>
    // </Box>

    <Box
      component="form"
      onSubmit={onSubmit}
      display="flex"
      sx={{'& > :not(style)': {m: 1}, background: 'rgb(180, 180, 180)', borderRadius: '20px', marginTop: '10px'}}

    >
      <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
        <TextField
          id="input-with-sx"
          label="Author"
          variant="standard"
          name="author"
          onChange={onChange}
          value={state.author}
        />
      </Box>

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

    </Box>
  );
};

export default Form;
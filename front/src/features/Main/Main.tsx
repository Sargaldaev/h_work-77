import React, { useEffect } from 'react';
import { AppDispatch, RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { Box, CardMedia, Typography } from '@mui/material';
import { fetchData } from '../../store/messageThunk';
import Modal from '../../Components/Modal/Modal';

const Main = () => {
  const {messages, fetchLoad} = useSelector((state: RootState) => state.messages);
  const dispatch: AppDispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);


  return (
    <>
      <Box
        component="div"
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{
          marginTop: '40px',
        }}
      >
        <Modal/>
        <Box
          component="div"
          maxHeight="500px"
          sx={{
            overflowY: 'scroll',
            borderRadius: '10px',
            scrollbarWidth: 'thin',
            '&::-webkit-scrollbar': {
              width: '12px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'lightgray',
              borderRadius: '6px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'transparent',
            },
            marginTop: '10px'
          }}
          border="4px solid #000"
          padding="20px"
        >

          {
            fetchLoad ? 'Load...' :
              messages.map(item => {
                return (
                  <Box key={item.id} sx={{width: '500px', position: 'relative'}}>
                    <Box
                      component="div"
                      sx={{
                        padding: '30px',
                        marginBottom: '10px',
                        background: 'rgb(106, 90, 205)',
                        color: 'white',
                        borderRadius: '10px',
                      }}
                    >
                      <Typography>
                        <b> Author: </b>
                        {item.author}
                      </Typography>
                      <Typography>
                        <b> Message: </b>
                        {item.message}
                      </Typography>

                      {
                        !item.image ? '' :
                          <CardMedia
                            component="img"
                            height="200"
                            width={'200'}
                            image={`http://localhost:8000/${item.image}`}
                            alt="Paella dish"
                          />
                      }

                    </Box>
                  </Box>
                );
              })
          }
        </Box>
      </Box>
    </>

  );
};

export default Main;
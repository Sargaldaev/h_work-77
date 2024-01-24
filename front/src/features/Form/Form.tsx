import React from 'react';
import InputFile from '../../Components/InputFile/InputFile';

const Form = () => {


  const onChangeFiles = (e: React.ChangeEvent<HTMLInputElement>) => {

    // const {name, files} = e.target;
    //
    // if (files) {
    //   setState(prevstate) => ({
    //     ...prevstate,
    //     [name]: files[0]
    //   })
    // }
  };


  return (
    <div>
      <InputFile onChange={onChangeFiles} name={'image'} label={'image'}/>
    </div>
  );
};

export default Form;
import express from 'express';
import fileDb from '../fileDb';
import {IMessageCreate} from '../types';
import {imagesUpload} from '../multer';

const messagesRouter = express.Router();

messagesRouter.get('/', async (req, res) => {

  const messages = await fileDb.getItems();

  res.send(messages);

});


messagesRouter.post('/', imagesUpload.single('image'), async (req, res) => {

  try {
    const message: IMessageCreate = {
      author: req.body.author,
      message: req.body.message,
      image: req.file ? req.file.filename : null
    };

    await fileDb.addItem(message);
    res.send(message);
  } catch (error) {
    console.error(error);
    res.status(500).send({error: 'Internal Server Error'});
  }
});

export default messagesRouter;
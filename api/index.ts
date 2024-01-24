import express from 'express';
import fileDb from './fileDb';
import cors from 'cors';
import messagesRouter from './routers/messages';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use('/messages', messagesRouter);


const run = async () => {
  await fileDb.init();

  app.listen(port, () => {
    console.log(`server running in ${port} port`);
  });
};

run().catch(e => console.error(e));


import {promises as fs} from 'fs';
import {randomUUID} from 'crypto';
import {IMessageCreate, IMessages} from './types';


const filename = './db.json';
let data: IMessages[] = [];

const fileDb = {

  async init() {
    try {
      const fileContents = await fs.readFile(filename);
      data = JSON.parse(fileContents.toString());
    } catch (e) {
      data = [];
    }
  },

  async getItems() {
    return data;
  },

  async addItem(item: IMessageCreate) {

    if (!item.author) {
      item.author = 'Anonymous';
    }
    const message = {
      ...item,
      id: randomUUID(),
    };

    data.push(message);

    await this.save();
    return message.id;

  },

  async save() {
    return fs.writeFile(filename, JSON.stringify(data));
  }

};

export default fileDb;
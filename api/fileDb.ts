import {promises as fs} from 'fs';
import {randomUUID} from 'crypto';


const filename = './db.json';
let data: any[] = [];

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

  async addItem(item: any) {

    const message = {
      ...item,
      id: randomUUID(),
      datetime: new Date().toISOString()
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
export interface IMessages {
  id: string;
  author: string;
  message: string;
  image: string | null;
}

export interface IMessageCreate {
  author: string;
  message: string;
  image: string | null;
}
import { IAuthor } from "./IAuthor";

export interface IBook {
  id: string;
  title: string;
  author: IAuthor;
  year: number;
}

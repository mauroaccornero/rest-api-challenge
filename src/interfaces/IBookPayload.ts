import { IBook } from "./IBook";
import {IAuthor} from "./IAuthor";

export interface IBookPayload {
  id?: IBook['id'];
  title: IBook['title'];
  author: IAuthor;
  year: string;
}

import { IAuthor } from "./Author";

export declare interface IBook {
  id: string;
  title: string;
  author: IAuthor;
  year: number;
}

import { IAuthor } from "./Author";

export declare interface IBookPayload {
  id?: string;
  title: string;
  author: IAuthor;
  year: number;
}

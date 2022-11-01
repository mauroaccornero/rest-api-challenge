import {NavLink, useNavigate} from "react-router-dom";
import PATHS from "../../../constants/paths";
import { IBook } from "../../../interfaces/IBook";

import "./table.css";
import Button from "../Button/Button";
import {memo, useState} from "react";
import axios from "axios";
import DeleteModal, {IDeleteModalProps} from "./components/DeleteModal";

declare interface ITableProps {
  books: IBook[];
}

const Table = memo(({ books }: ITableProps) => {
    const [processStatus, setProcessStatus] = useState<IDeleteModalProps["processStatus"]>(null)
    const [itemToDelete, setItemToDelete] = useState<null | IBook["id"]>(null)

    const navigate = useNavigate();

  const handleDelete = (bookId: IBook["id"]) => {
      // start processing
      setProcessStatus("confirm")
      setItemToDelete(bookId)
  };

    const deleteItem = () => {
        axios({
            url:`${process.env.REACT_APP_API_URL}/books/${itemToDelete}`,
            method: "delete"
        }).then(response => {
            setProcessStatus("success")
        }).catch(err => {
            setProcessStatus("error")
        }).finally(() => {
            // end processing
            setTimeout(function(){
                setProcessStatus(null)
                navigate(0)
            }, 3000)
        })
    }

    const abortDelete= () => {setItemToDelete(() => null);setProcessStatus(null)};

  return (<>
          {processStatus !== null && (<DeleteModal processStatus={processStatus} deleteItem={deleteItem} abortDelete={abortDelete} />)}
    <table id={"table"}>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Year</th>
          <th>Update</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.id}>
            <td>
              <NavLink data-testid="detail-link" to={`${PATHS.DETAIL}/${book.id}`}>{book.title}</NavLink>
            </td>
            <td>{book.author.name}</td>
            <td>{book.year}</td>
            <td>
              <NavLink to={`${PATHS.UPDATE}/${book.id}`}>Update</NavLink>
            </td>
            <td>
              <Button
                handleClick={() => handleDelete(book.id)}
                label={"Delete"}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
      </>
  );
});

Table.displayName = "Table";

export default Table;

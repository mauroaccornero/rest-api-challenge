import Button from "../Button/Button";
import { IBook } from "../../../interfaces/IBook";
import { IAuthor } from "../../../interfaces/Author";

import "./form.css";
import useInput from "./hooks/useInput";
import {useMemo, useState} from "react";
import createYears from "../../../utils/createYears";
import {IBookPayload} from "../../../interfaces/IBookPayload";
import {AxiosResponse} from "axios";
import Message, {IMessageProps} from "../Message/Message";
import PATHS from "../../../constants/paths";
import {useNavigate} from "react-router-dom";

declare interface IFormProps {
  book?: IBook | null;
  submitCallback: (item: IBookPayload) => Promise<AxiosResponse>;
  buttonLabel: string;
  authors: IAuthor[];
}

const Form = ({
  book = null,
  authors,
  submitCallback,
  buttonLabel = "Save",
}: IFormProps) => {
  const { value: title, setValue: setTitle } = useInput<string>(
    book?.title || ""
  );
  const { value: year, setValue: setYear } = useInput<number>(book?.year || 0);
  const { value: author, setValue: setAuthor } = useInput<IAuthor>(
    book?.author || {id:"", name: ""}
  );
  const [message, setMessage] = useState<{type: null | IMessageProps["type"], message: string}>({type: null, message: ""})
  const [isProcessing, setIsProcessing] = useState<boolean>(false)

    const navigate = useNavigate();

  const years = useMemo(createYears,[]);

  const handleSubmit = () => {
      const payload: IBookPayload = {  title, year, author }
      if(book && 'id' in book){
          payload.id = book.id
      }
      // start processing
      setMessage(() => ({type: "info", message: `Processing request please wait...`}))
      setIsProcessing(true)
    submitCallback(payload).then(response => {
        // show success message
        setMessage(() => ({type: "success", message: `Book '${response.data.title}' added successfully `}))
    }).catch(err => {
        // show error message
        setMessage(() => ({type: "error", message: `An error occurred ${err?.message}`}))
    }).finally(() => {
        // end processing
        setIsProcessing(false)
        // redirect to list
        setTimeout(function() {
            navigate(PATHS.LIST);
        }, 3000)
    });
  };

  return (<>
    <form id={"form"}>
        {message.type !== null && (<Message message={message.message} type={message.type} />)}
      <div>
        <label htmlFor="title">Book title</label>
        <input
          placeholder="add a book title"
          type="text"
          id={"title"}
          name={"title"}
          value={title}
          disabled={isProcessing}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="year">Book year</label>
        <select
          name="year"
          id={"year"}
          value={year}
          disabled={isProcessing}
          onChange={(e) => setYear(parseInt(e.target.value))}
        >
          <option value="0" disabled>
            Please choose a year
          </option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="author">Book author</label>
        <select
          name={"author"}
          id={"author"}
          value={author.id}
          disabled={isProcessing}
          onChange={(e) => {
            const author = authors.find(a => a.id === e.target.value)
            if(author){
              setAuthor(author)
            }
          }}
        >
          <option value="" disabled>
            Please choose an author
          </option>
          {authors.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>
      </div>
      <Button disabled={isProcessing} handleClick={handleSubmit} label={buttonLabel} />
    </form>
      </>
  );
};

export default Form;

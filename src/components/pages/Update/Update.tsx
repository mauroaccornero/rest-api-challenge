import Layout from "../../layout/Layout/Layout";
import { useParams } from "react-router-dom";
import Form from "../../layout/Form/Form";
import useAxios from "../../../hooks/useAxios";
import { IBook } from "../../../interfaces/IBook";
import { IAuthor } from "../../../interfaces/Author";
import Loading from "../../layout/Loading/Loading";
import Message from "../../layout/Message/Message";
import {IBookPayload} from "../../../interfaces/IBookPayload";
import axios from "axios";

const Update = () => {
  const { id } = useParams();
  const { loading, data, error } = useAxios<IBook>(`/books/${id}`);
  const {
    loading: loadingAuthors,
    data: dataAuthors,
    error: errorAuthors,
  } = useAxios<IAuthor[]>(`/authors`);

  const submitCallback = (item: IBookPayload) => axios({
      url:`${process.env.REACT_APP_API_URL}/books/${item.id}`,
      method: "put",
      data: item
    });

  return (
    <Layout>
      <div id="update-page">
        <h2>Update book</h2>
        {data !== null && dataAuthors != null && (
          <Form
            book={data}
            authors={dataAuthors}
            submitCallback={submitCallback}
            buttonLabel={"Save book"}
          />
        )}
        {(loading || loadingAuthors) && <Loading />}
        {(error || errorAuthors) && <Message message={`Some error occurred. ${ error?.message || errorAuthors?.message}`} type={"error"} />}
      </div>
    </Layout>
  );
};

export default Update;

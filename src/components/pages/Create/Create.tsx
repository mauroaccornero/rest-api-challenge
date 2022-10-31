import Layout from "../../layout/Layout/Layout";
import Form from "../../layout/Form/Form";
import useAxios from "../../../hooks/useAxios";
import { IAuthor } from "../../../interfaces/Author";
import Loading from "../../layout/Loading/Loading";
import Message from "../../layout/Message/Message";
import {IBookPayload} from "../../../interfaces/IBookPayload";
import axios from "axios";

const Create = () => {
  const {
    loading: loadingAuthors,
    data: dataAuthors,
    error: errorAuthors,
  } = useAxios<IAuthor[]>(`/authors`);

  const submitCallback = (item: IBookPayload) => axios({
      url:"http://localhost:4000/books/",
      method: "post",
      data: item
    });

  return (
    <Layout>
      <div id="create-page">
        <h2>Create new book</h2>
        {dataAuthors !== null && (
          <Form
            authors={dataAuthors}
            submitCallback={submitCallback}
            buttonLabel={"Save book"}
          />
        )}
        {loadingAuthors && <Loading />}
        {errorAuthors && <Message message={`Some error occurred. ${errorAuthors?.message}`} type={"error"} />}
      </div>
    </Layout>
  );
};

export default Create;

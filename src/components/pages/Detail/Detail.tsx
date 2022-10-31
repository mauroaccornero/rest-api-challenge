import { useParams } from "react-router-dom";
import Layout from "../../layout/Layout/Layout";
import useAxios from "../../../hooks/useAxios";
import { IBook } from "../../../interfaces/IBook";
import Card from "../../layout/Card/Card";
import Loading from "../../layout/Loading/Loading";
import Message from "../../layout/Message/Message";

const Detail = () => {
  const { id } = useParams();
  const { loading, data, error } = useAxios<IBook>(`/books/${id}`);

  return (
    <Layout>
      <div id="detail-page">
        <h2>Book detail</h2>
        {data !== null && <Card>
            <ul>
                <li><strong>Id</strong>: {data.id}</li>
                <li><strong>Title</strong>: {data.title}</li>
                <li><strong>Year</strong>: {data.year}</li>
                <li><strong>Author</strong>: {data.author.name}</li>
            </ul>
        </Card>}
          {loading && <Loading />}
          {error && <Message message={`Some error occurred. ${error?.message}`} type={"error"} />}
      </div>
    </Layout>
  );
};

export default Detail;

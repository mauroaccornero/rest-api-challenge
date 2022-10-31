import Layout from "../../layout/Layout/Layout";
import useAxios from "../../../hooks/useAxios";
import Table from "../../layout/Table/Table";
import { IBook } from "../../../interfaces/IBook";
import Loading from "../../layout/Loading/Loading";
import Message from "../../layout/Message/Message";

const List = () => {
  const { loading, data, error } = useAxios<IBook[]>("/books");

  return (
    <Layout>
      <div id="list-page">
        <h2>All books</h2>
        {data !== null && <Table books={data} />}
        {loading && <Loading />}
        {error && <Message message={`Some error occurred. ${error?.message}`} type={"error"} />}
      </div>
    </Layout>
  );
};

export default List;

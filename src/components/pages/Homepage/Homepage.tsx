import Layout from "../../layout/Layout/Layout";

const Homepage = () => {
  return (
    <Layout>
      <div id="home-page" data-testid={"Homepage"}>
        <h2>Welcome to the Rest API code challenge boilerplate</h2>

        <p>
          This a simple app boilerplate to freely code during the technical
          interview.
        </p>
        <p>
          Please use the menu to navigate inside this app or check the code.
        </p>
      </div>
    </Layout>
  );
};

export default Homepage;

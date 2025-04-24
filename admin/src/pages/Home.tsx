import CategoryInDB from "../components/Dashboard/CategoryInDB";
import ContentRow from "../components/Dashboard/ContentRow";
import LastProductInDB from "../components/Dashboard/LastProductInDB";

const Home = () => {
  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">App Home</h1>
      </div>

      <ContentRow />

      <div className="row">
        <LastProductInDB />
        <CategoryInDB />
      </div>
    </div>
  );
};

export default Home;

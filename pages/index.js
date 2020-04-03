import Layout from "./components/layout";
import TotalCard from "./components/totalCard";
import Chart from "./components/chart";

const Index = () => {
  return (
    <Layout>
      <div className="inc-exp-container">
        <TotalCard total={121} description="infectados" />
        <TotalCard total={121} description="infectados" />
        <TotalCard total={-121} description="infectados" />
      </div>
      <div className="row">
        <div className="col-6">
          <Chart total={121} description="infectados" />
        </div>
        <div className="col-6">
          <Chart total={121} description="infectados" />
        </div>
      </div>
    </Layout>
  );
};

export default Index;

import Layout from "./components/layout";
import TotalCard from "./components/totalCard";
import Plot from "./components/plot";

const Index = () => {
  return (
    <Layout>
      <div className="inc-exp-container">
        <TotalCard total={121} description="infectados" />
        <TotalCard total={121} description="infectados" />
        <TotalCard total={-121} description="infectados" />
      </div>
      <div className="inc-exp-container">
        <Plot total={121} description="infectados" type="line" />
        <Plot total={121} description="infectados" type="bar" />
      </div>
    </Layout>
  );
};

export default Index;

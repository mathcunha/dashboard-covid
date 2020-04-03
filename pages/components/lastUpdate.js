const LastUpdate = ({ dataset, estado }) => {
  if (!dataset) {
    dataset = [];
  }
  if (estado !== "todos")
    dataset = dataset.filter(item => item.state === estado);

  const lastUpdate = dataset.reduce(
    (acc, item) => (acc > new Date(item.date) ? acc : new Date(item.date)),
    new Date("2019-04-02")
  );

  return <p>Brasil.io em {lastUpdate.toLocaleDateString()}</p>;
};

export default LastUpdate;

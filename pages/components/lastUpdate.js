const LastUpdate = ({ dataset, estado }) => {
  if (!dataset) {
    dataset = [];
  }
  if (estado !== "todos")
    dataset = dataset.filter(item => item.state === estado);

  const lastUpdate = dataset.reduce(
    (acc, item) => (acc > item.date ? acc : item.date),
    "2019-04-02"
  );

  return <p>Brasil.io atualizou em {lastUpdate}</p>;
};

export default LastUpdate;

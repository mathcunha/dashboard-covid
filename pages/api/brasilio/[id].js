export default async (req, res) => {
  const {
    query: { id, name },
    method,
  } = req;
  const body = await fetch(
    "https://brasil.io/dataset/covid19/caso?format=csv"
  ).then((res) => res.text());

  switch (method) {
    case "GET":
      // Get data from your database
      res.status(200).send(body);
      break;
    case "PUT":
      // Update or create data in your database
      res.status(200).json({ id, name: name || `User ${id}` });
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

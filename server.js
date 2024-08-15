import server from "./index.js";

//port number where server is running
const port = 5000;

server.listen(port, () => {
  console.log(`Server is Listening at Port Number ${port}`);
});

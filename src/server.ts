import http, { IncomingMessage, ServerResponse } from "http";
// import { ItemsRoute } from "./routes/List.js";

const Port = 4000;

const requestListener = (req: IncomingMessage, res: ServerResponse) => {
    console.log(req.url, 'url');



const server = http.createServer(requestListener);

server.listen(Port, () => {
    console.log(`Server is running on http://localhost:${Port}`);   
});

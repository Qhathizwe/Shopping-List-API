import http, { IncomingMessage, ServerResponse } from "http";
import { ItemsRoute } from "./routes/List.js";

const Port = 4000;

const requestListener = (req: IncomingMessage, res: ServerResponse) => {
    console.log(req.url, 'url');

    
    if (req.url?.startsWith('/items')) {
        ItemsRoute(req, res);
        return;
    }else{
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify({ message: "Hello, World!" }));
    }
    }


const server = http.createServer(requestListener);

server.listen(Port, () => {
    console.log(`Server is running on http://localhost:${Port}`);   
});

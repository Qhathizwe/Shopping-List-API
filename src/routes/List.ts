import { IncomingMessage, ServerResponse } from "http"; 
import { getList, getItemById, addItem, deleteItemById, updateItem } from '../controllers/list.js';

export const ItemsRoute = async (req: IncomingMessage, res: ServerResponse) => {
  if (req.url?.startsWith('/items')) {
    console.log(req.url, 'request url');
    const urlParts = req.url.split('/');
    console.log(urlParts, 'url parts');
    const id = urlParts[2] ? parseInt(urlParts[2]) : undefined;

    // Helper function to send uniform JSON responses
    const sendResponse = (statusCode: number, payload: any) => {
      res.writeHead(statusCode, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(payload));
    };

    // 1. GET ALL ITEMS
    if (req.method === 'GET' && !id) {
      const list = getList();
      return sendResponse(200, list);
    }
  // 2. GET SINGLE ITEM BY ID
    if (req.method === 'GET' && id) {
      if (isNaN(id)) {
        return sendResponse(400, { error: "Invalid item Id format" });
      }
      const item = getItemById(id);
      if (!item) {
        return sendResponse(404, { message: 'Item not found' });
      }
      return sendResponse(200, item);
    }

   // 3. POST - ADD NEW ITEM
    if (req.method === 'POST') {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });

      req.on('end', () => {
        try {
          if (!body.trim()) {
            return sendResponse(400, { error: "Request body cannot be empty" });
          }

          const parsedBody = JSON.parse(body);
          const { name, quantity, category, notes, isPurchased } = parsedBody;


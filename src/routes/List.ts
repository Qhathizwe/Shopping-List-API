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

          // Validation logic: Notes and isPurchased are optional, rest are required.
          const missingFields: string[] = [];
          if (!name || typeof name !== 'string' || !name.trim()) missingFields.push('name (non-empty string)');
          if (quantity === undefined || typeof quantity !== 'number') missingFields.push('quantity (number)');
          if (!category || typeof category !== 'string' || !category.trim()) missingFields.push('category (non-empty string)');
          

          if (missingFields.length > 0) {
            return sendResponse(400, { 
              error: "Validation failed", 
              message: `The following fields are required or invalid: ${missingFields.join(', ')}`,
              hint: "Only 'notes' and 'isPurchased' are optional." 
            });
          }

          const newItem = addItem(name, quantity, category, notes || '', isPurchased);

          return sendResponse(201, {
            message: `Success: Added '${name}' to the list.`,
            item: newItem
          });

        } catch (error) {
          return sendResponse(400, { error: "Malformed payload. Invalid JSON structure." });
        }
      });
      return;
    }

    // 4. DELETE ITEM BY ID (Now returns notification)
    if (req.method === "DELETE" && id) {
      if (isNaN(id)) {
        return sendResponse(400, { error: "Invalid item Id" });
      }

 // Fetch item first to know its name for the confirmation message
      const targetItem = getItemById(id);
      if (!targetItem) {
        return sendResponse(404, { error: "Item not found" });
      }

      const deleted = deleteItemById(id);
      if (!deleted) {
        return sendResponse(404, { error: "Item could not be deleted" });
      }

      //Successful deletion, return a message with the name of the deleted item
      return sendResponse(200, {
        message: `Success: Removed '${targetItem.name}' from your shopping list.`
      });
    }
  }
}
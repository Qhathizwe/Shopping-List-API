# 🛒 Shopping List API

A lightweight, native **Node.js** and **TypeScript** REST API for managing a shopping list. Built completely from scratch without external framework dependencies like Express, using native HTTP modules.

---

## 🚀 Getting Started

### 1. Installation
Install your dependencies first:
```bash
npm install
```

### 2. Run the Server
Launch the local server using your development script configuration:
```bash
npm run dev
```
The server will start listening for requests on your designated local port (e.g., `http://localhost:4000`).

---

## ⚡ Testing with Thunder Client

You can easily interact with this API using the **Thunder Client** extension inside VS Code. 

### Quick Setup in Thunder Client:
1. Open the **Thunder Client** tab in VS Code.
2. Click **New Request**.
3. Set your target URL (e.g., `http://localhost:4000/items`).
4. Select the appropriate HTTP method (`GET`, `POST`, `PUT`, `DELETE`).
5. For `POST` and `PUT` requests, go to the **Body** tab, select **JSON**, and paste your payload structure.

---

## 🛠️ Data Model & Validations

When creating items via `POST`, your JSON payloads must conform to the following fields:

| Field | Type | Required | Notes / Validation Rules |
| :--- | :--- | :--- | :--- |
| `name` | `string` | **Yes** | Must be a non-empty string. |
| `quantity` | `number` | **Yes** | Must be a valid number greater than 0. |
| `category` | `string` | **Yes** | Product classification (e.g., "Dairy", "Produce"). |
| `isPurchased` | `boolean` | **Yes** | Status flag (`true` or `false`). |
| `notes` | `string` | No | Optional fields for additional context. Defaults to `""`. |

---

## 📡 API Endpoints

### 1. Get All Items
* **Method:** `GET`
* **URL:** `http://localhost:4000/items`
* **Success Response (200 OK):**
  ```json
  [
    {
      "id": 1,
      "name": "Almond Milk",
      "quantity": 2,
      "category": "Dairy",
      "notes": "Unsweetened",
      "isPurchased": false
    }
  ]
  ```

### 2. Get Single Item
* **Method:** `GET`
* **URL:** `http://localhost:4000/items/:id`
* **Success Response (200 OK):**
  ```json
  {
    "id": 1,
    "name": "Almond Milk",
    "quantity": 2,
    "category": "Dairy",
    "notes": "Unsweetened",
    "isPurchased": false
  }
  ```
* **Error Response (404 Not Found):**
  ```json
  { "message": "Item not found" }
  ```

### 3. Add a New Item
* **Method:** `POST`
* **URL:** `http://localhost:4000/items`
* **Thunder Client Body (JSON):**
  ```json
  {
    "name": "Apples",
    "quantity": 6,
    "category": "Produce",
    "isPurchased": false
  }
  ```
* **Success Response (201 Created):**
  ```json
  {
    "message": "Success: Added 'Apples' to the list.",
    "item": {
      "id": 2,
      "name": "Apples",
      "quantity": 6,
      "category": "Produce",
      "notes": "",
      "isPurchased": false
    }
  }
  ```

### 4. Update an Item
* **Method:** `PUT`
* **URL:** `http://localhost:4000/items/:id`
* **Thunder Client Body (JSON):** *(Accepts full or partial updates)*
  ```json
  {
    "isPurchased": true
  }
  ```
* **Success Response (200 OK):**
  ```json
  {
    "message": "Success: Updated details for 'Apples'.",
    "item": {
      "id": 2,
      "name": "Apples",
      "quantity": 6,
      "category": "Produce",
      "notes": "",
      "isPurchased": true
    }
  }
  ```

### 5. Delete an Item
* **Method:** `DELETE`
* **URL:** `http://localhost:4000/items/:id`
* **Success Response (200 OK):**
  ```json
  {
    "message": "Success: Removed 'Apples' from your shopping list."
  }
  ```

---

## ⚠️ Example Validation Error Responses

If a request fails validation or contains bad data formats, the server rejects it gracefully:

#### Malformed JSON Payload (400 Bad Request)
```json
{
  "error": "Malformed payload. Invalid JSON structure."
}
```

#### Missing Required Fields (400 Bad Request)
```json
{
  "error": "Validation failed",
  "message": "The following fields are required or invalid: name (non-empty string), quantity (number)",
  "hint": "Only 'notes' is optional."
}
```

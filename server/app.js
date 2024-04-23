// To use enable ESM support, adding "type": "module" to your package.json file
import express from "express";
import bodyParser from "body-parser";
import fs from "node:fs/promises";

const app = express();
app.use(bodyParser.json());
// Tell Express to serve static files for the images
app.use(express.static("public"));

// Key: Allow CORS to enable communication between frontend and backend
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Route to get available meals
app.get("/meals", async (req, res) => {
  const meals = await fs.readFile("./data/available-meals.json", "utf8");
  // Check the available meals in the browser
  res.json(JSON.parse(meals));
});

// Route to submit orders to the server
app.post("/orders", async (req, res) => {
  const orderData = req.body.order;

  // Validate customer data before saving it to the server
  if (orderData === undefined) {
    return res.status(400).json({ message: "Missing data." });
  }

  if (
    orderData.customer.email === null ||
    !orderData.customer.email.includes("@") ||
    orderData.customer.name === null ||
    orderData.customer.name.trim() === "" ||
    orderData.customer.street === null ||
    orderData.customer.street.trim() === "" ||
    orderData.customer["postal-code"] === null ||
    orderData.customer["postal-code"].trim() === "" ||
    orderData.customer.city === null ||
    orderData.customer.city.trim() === ""
  ) {
    return res.status(400).json({
      message:
        "Missing data: Email, name, street, postal code or city is missing.",
    });
  }

  // Create a new order object with a unique ID
  const newOrder = {
    ...orderData,
    id: (Math.random() * 1000).toString(),
  };

  // Read the existing orders from the server
  const orders = await fs.readFile("./data/orders.json", "utf8");
  // Parse the JSON data to an array
  const allOrders = JSON.parse(orders);

  // Add the new order to the existing orders
  allOrders.push(newOrder);
  await fs.writeFile("./data/orders.json", JSON.stringify(allOrders));
  res.status(201).json({ message: "Order submitted successfully." });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

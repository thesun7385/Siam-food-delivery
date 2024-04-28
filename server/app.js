// To use enable ESM support, adding "type": "module" to your package.json file
import express from "express";
import bodyParser from "body-parser";

import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file
// Import the MongoDB client
import { MongoClient } from "mongodb";

const app = express();
// Key: Allow CORS to enable communication between frontend and backend
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(bodyParser.json());
// Tell Express to serve static files for the images
app.use(express.static("public"));

// Connect to MongoDB and get the database
MongoClient.connect(process.env.CONNECTION_URL, (error, client) => {
  if (error) {
    console.log("Failed to connect with MongoDB!");
    return;
  }
  const database = client.db("siamDelivery");
  console.log("Successfully Connected to MongoDB!");

  // Route to fetch all meals
  app.get("/meals", (req, res) => {
    database
      .collection("available-meals")
      .find({})
      .toArray((err, meal) => {
        if (err) {
          console.error("Error fetching meals:", err);
          res.status(500).json({ message: "Internal server error" });
          return;
        }
        // Send the result as JSON
        res.json(meal);
      });
  });

  // Route to send orders to the server
  app.post("/orders", (req, res) => {
    const orderData = req.body.order; // Define orderData here

    // Validate if orderData is missing
    if (orderData === undefined) {
      return res.status(400).json({ message: "Missing data." });
    }

    // Validate customer data before saving it to the server
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

    // Insert the new order to the database
    database.collection("order").insertOne(orderData, (err, result) => {
      if (err) {
        console.error("Error inserting order:", err);
        res.status(500).json({ message: "Internal server error" });
        return;
      } else {
        res.status(201).json({ message: "Order submitted successfully." });
        console.log("Order submitted successfully.");
      }
    });
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

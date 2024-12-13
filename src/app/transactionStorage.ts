import fs from "fs/promises";
import path from "path";

// Path to the transactions.json file
const filePath = path.resolve("./transactions.json");

const TransactionStorage = {
  // Load transactions from the JSON file
  load: async () => {
    try {
      await fs.access(filePath);
      const rawData = await fs.readFile(filePath, "utf-8");
      return JSON.parse(rawData);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") {
        console.log("transactions.json does not exist, creating it.");
        await fs.writeFile(filePath, JSON.stringify({}, null, 2));
        return {};
      }
      throw error;
    }
  },

  // Save transactions back to the JSON file
  save: async (data: any) => {
    try {
      await fs.writeFile(filePath, JSON.stringify(data, null, 2));
      console.log("Data saved successfully");
    } catch (error) {
      console.error("Error saving data:", error);
      throw error;
    }
  },

  // Add a new transaction
  addTransaction: async (transactionId: string, metadata: any) => {
    try {
      const data = await TransactionStorage.load();
      data[transactionId] = metadata;
      await TransactionStorage.save(data);
      console.log(`Transaction ${transactionId} added successfully`);
      // console.log("Transaction data saved:", data);
    } catch (error) {
      console.error(`Error adding transaction ${transactionId}:`, error);
      throw error;
    }
  },

  // Retrieve metadata for a specific transaction
  getTransaction: async (transactionId: string) => {
    try {
      const data = await TransactionStorage.load();
      return data[transactionId] || null;
    } catch (error) {
      console.error(`Error retrieving transaction ${transactionId}:`, error);
      throw error;
    }
  },
};

export default TransactionStorage;

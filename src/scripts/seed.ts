import "dotenv/config";
import { createPool } from "mysql2/promise";
import { drizzle } from "drizzle-orm/singlestore";
import { files, folders } from "./schema-seed";
import { mockDataFile, mockDataFolder } from "@/lib/mock-data";

// Create database connection
const conn = createPool({
  host: process.env.SINGLESTORE_HOST!,
  port: parseInt(process.env.SINGLESTORE_PORT!),
  user: process.env.SINGLESTORE_USER!,
  password: process.env.SINGLESTORE_PASS!,
  database: process.env.SINGLESTORE_DB_NAME!,
  ssl: {},
  maxIdle: 0,
});

const db = drizzle(conn, { schema: { files, folders } });

async function seedDatabase() {
  try {
    console.log("Starting database seeding...");
    
    // Clear existing data
    console.log("Clearing existing data...");
    await db.delete(files);
    await db.delete(folders);
    
    // Insert folders first (they are referenced by files)
    console.log("Inserting folders...");
    for (const folder of mockDataFolder) {
      await db.insert(folders).values({
        id: folder.id,
        name: folder.name,
        parentId: folder.parentId,
        childrenCount: folder.childrenCount,
        createdAt: folder.createdAt,
        updatedAt: folder.updatedAt,
      });
    }
    
    // Insert files
    console.log("Inserting files...");
    for (const file of mockDataFile) {
      await db.insert(files).values({
        id: file.id,
        name: file.name,
        url: file.url,
        parentId: file.parentId,
        type: file.type,
        extension: file.extension,
        size: file.size,
        createdAt: file.createdAt,
        updatedAt: file.updatedAt,
      });
    }
    
    console.log("Database seeding completed successfully!");
    console.log(`Inserted ${mockDataFolder.length} folders and ${mockDataFile.length} files.`);
    
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  } finally {
    // Close the connection
    await conn.end();
    process.exit(0);
  }
}

// Run the seed function
seedDatabase(); 
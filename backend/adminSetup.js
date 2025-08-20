const bcrypt = require("bcrypt");
const db = require("./db");

async function setupAdmin() {
  try {
    const newEmail = "malabanbannorte1@gmail.com";
    const newPass = "@malabanbannorte1";
    const hashedPassword = await bcrypt.hash(newPass, 10);

    // Check if admin already exists
    const [rows] = await db.query("SELECT * FROM users WHERE role = 'Admin' LIMIT 1");

    if (rows.length === 0) {
      await db.query(
        "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
        ["System Admin", newEmail, hashedPassword, "Admin"]
      );
      console.log("✅ Admin created:", newEmail);
    } else {
      await db.query(
        "UPDATE users SET email = ?, password = ? WHERE role = 'Admin'",
        [newEmail, hashedPassword]
      );
      console.log("✅ Admin updated:", newEmail);
    }

    // Verify the admin was created/updated
    const [result] = await db.query("SELECT id, name, email, role FROM users WHERE role = 'Admin'");
    console.log("Admin in database:", result[0]);
    
    process.exit();
  } catch (err) {
    console.error("❌ Error setting up admin:", err);
    process.exit(1);
  }
}

setupAdmin();
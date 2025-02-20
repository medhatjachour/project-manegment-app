import "dotenv/config";
import mongoose from "mongoose";
import connectDatabase from "../config/database.config";
import RoleModel from "../models/roles-permission.model";
import { RolePermissions } from "../utils/role-permission";

const seedRoles = async () => {
  console.log("Seeding roles started...");

  try {
    await connectDatabase();

    console.log("Clearing existing roles...");
    await RoleModel.deleteMany({}); // Deleting all existing roles

    // Iterating over the RolePermissions object to seed roles
    for (const roleName in RolePermissions) {
      const role = roleName as keyof typeof RolePermissions;
      const permissions = RolePermissions[role];

      // Check if the role already exists
      const existingRole = await RoleModel.findOne({ name: role });
      if (!existingRole) {
        const newRole = new RoleModel({
          name: role,
          permissions: permissions,
        });
        await newRole.save(); // Saving the new role
        console.log(`Role ${role} added with permissions.`);
      } else {
        console.log(`Role ${role} already exists.`);
      }
    }

    console.log("Seeding completed successfully.");
  } catch (error) {
    console.error("Error during seeding:", error);
  }
};

seedRoles().catch((error) =>
  console.error("Error running seed script:", error)
);

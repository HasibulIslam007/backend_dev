import bcryptjs from "bcryptjs";

import { envVars } from "../modules/config/env.js";
import { User } from "../modules/user/user.model.js";

import type { IUser, AuthenticatedUser } from "../modules/user/user.interface.js";
import { UserRole } from "../modules/user/user.interface.js";

export const seedSuperAdmin = async () => {
  try {
    const isSuperAdminExist = await User.findOne({
      role: UserRole.SUPER_ADMIN,
    });

    if (isSuperAdminExist) {
      console.log("Super Admin already exists!");
      return;
    }

    console.log("Creating Super Admin...");

    const hashedPassword = await bcryptjs.hash(
      envVars.SUPER_ADMIN_PASSWORD,
      Number(envVars.BCRYPT_SALT_ROUND)
    );

    const authProvider: AuthenticatedUser = {
      provider: "credentials",
      providerId: envVars.SUPER_ADMIN_EMAIL,
    };

    const payload: IUser = {
      name: "Super Admin",
      role: UserRole.SUPER_ADMIN,
      email: envVars.SUPER_ADMIN_EMAIL,
      password: hashedPassword,
      isVerified: true,
      auths: [authProvider],
    };

    const superAdmin = await User.create(payload);

    console.log("Super Admin created successfully!");
    console.log(superAdmin);
  } catch (error) {
    console.error("Super Admin seed error:", error);
  }
};
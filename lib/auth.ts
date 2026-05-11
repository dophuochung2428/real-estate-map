import { betterAuth } from "better-auth";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const auth = betterAuth({
  database: pool,

  emailAndPassword: {
    enabled: true,
  },

  user: {
    additionalFields: {
      phone: {
        type: "string",
        required: true,
      },
    },
  },

  trustedOrigins: [process.env.NEXT_PUBLIC_APP_URL!],
});

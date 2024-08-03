/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://PrepPal_owner:zs9rCNKnIgc8@ep-icy-cake-a5t5em3v.us-east-2.aws.neon.tech/PrepPal?sslmode=require',
    }
  };
import { serial, text, varchar, pgTable } from "drizzle-orm/pg-core";

export const PrepPal = pgTable("prepPal", {
    id:serial('id').primaryKey(),
    jsonPrepResp:text('jsonPrepResp').notNull(),
    jobPosition:varchar('jobPosition').notNull(),
    jobDesc:varchar('jobDesc').notNull(),
    jobExperience:varchar('jobExperience').notNull(),
    createdBy:varchar('createdBy').notNull(),
    createdAt:varchar('createdAt'),
    prepId:varchar('mockId').notNull()
})
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { Ingredients, EvidenceEntries, Claims, LegalDocuments, Pages } from "./cms/collections";

/**
 * CHUNK 4 — Payload 3 runs inside this Next.js app (route group
 * /admin-cms), sharing the operational Postgres. Admin users carry a
 * `role` field mirroring db/schema.sql admin_role; the claims gate
 * hook makes prohibited publishing impossible at the CMS layer, the
 * build-time linter catches it at the code layer, and the frontend
 * EvidenceCard enforces limitations at render — three independent
 * fences around the same field.
 */
export default buildConfig({
  secret: process.env.PAYLOAD_SECRET ?? "",
  db: postgresAdapter({ pool: { connectionString: process.env.DATABASE_URL } }),
  editor: lexicalEditor(),
  collections: [
    {
      slug: "admin-users",
      auth: true,
      admin: { useAsTitle: "email" },
      fields: [
        { name: "name", type: "text", required: true },
        {
          name: "role", type: "select", required: true, defaultValue: "content",
          options: ["owner", "ops", "content", "compliance", "support"],
        },
      ],
    },
    Ingredients,
    EvidenceEntries,
    Claims,
    LegalDocuments,
    Pages,
  ],
  typescript: { outputFile: "cms/payload-types.ts" },
});

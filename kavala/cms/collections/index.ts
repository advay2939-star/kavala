import type { CollectionConfig } from "payload";
import { claimsGate } from "../hooks/claimsGate";

/**
 * CHUNK 4 — Payload 3 collections. Content team edits everything here;
 * the claims gate makes non-compliant publishing structurally
 * impossible. RBAC mirrors db/schema.sql admin_role.
 */

const isCompliance = ({ req }: { req: { user?: { role?: string } | null } }) =>
  req.user?.role === "compliance" || req.user?.role === "owner";
const isContent = ({ req }: { req: { user?: { role?: string } | null } }) =>
  ["content", "compliance", "owner"].includes(req.user?.role ?? "");

export const Ingredients: CollectionConfig = {
  slug: "ingredients",
  versions: { drafts: true },
  access: { read: () => true, update: isContent, create: isContent, delete: isCompliance },
  hooks: { beforeChange: [claimsGate("ingredient monograph")] },
  admin: { useAsTitle: "name" },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "sanskrit", type: "text", required: true },
    { name: "latin", type: "text", required: true },
    { name: "role", type: "textarea", required: true, label: "In the tradition" },
    { name: "sensory", type: "textarea", required: true, label: "In the mouth" },
    { name: "sortOrder", type: "number", defaultValue: 0 },
  ],
};

export const EvidenceEntries: CollectionConfig = {
  slug: "evidence-entries",
  versions: { drafts: true },
  // Evidence is compliance-owned: content can read, only compliance writes.
  access: { read: () => true, update: isCompliance, create: isCompliance, delete: isCompliance },
  admin: { useAsTitle: "citation" },
  fields: [
    { name: "citation", type: "textarea", required: true },
    {
      name: "sourceClass", type: "select", required: true,
      options: ["rct", "clinical_comparative", "review", "tradition"],
    },
    { name: "population", type: "text", required: true },
    { name: "duration", type: "text", required: true },
    { name: "findings", type: "textarea", required: true },
    {
      name: "limitations", type: "textarea", required: true,
      admin: { description: "Mandatory. The frontend refuses to render an entry without it." },
    },
    {
      name: "confidence", type: "select", required: true,
      options: ["promising_but_limited", "mixed", "insufficient"],
    },
  ],
};

export const Claims: CollectionConfig = {
  slug: "claims",
  access: { read: isContent, update: isCompliance, create: isCompliance, delete: isCompliance },
  admin: { useAsTitle: "claimText", description: "The claims registry. Every marketing string maps here." },
  fields: [
    { name: "claimText", type: "textarea", required: true },
    { name: "channel", type: "select", defaultValue: "site", options: ["site", "email", "ads", "packaging"] },
    { name: "status", type: "select", required: true, options: ["approved", "restricted", "prohibited"] },
    {
      name: "evidence", type: "relationship", relationTo: "evidence-entries", hasMany: true,
      admin: { condition: (data) => data?.status === "restricted", description: "Restricted claims must cite evidence." },
    },
    { name: "note", type: "textarea" },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data?.status === "restricted" && (!data.evidence || data.evidence.length === 0)) {
          throw new Error("Restricted claims must link at least one evidence entry.");
        }
        return data;
      },
    ],
  },
};

export const LegalDocuments: CollectionConfig = {
  slug: "legal-documents",
  versions: { drafts: true, maxPerDoc: 50 },
  access: { read: () => true, update: isCompliance, create: isCompliance, delete: () => false },
  admin: { useAsTitle: "title" },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "docType", type: "select", required: true, options: ["privacy", "terms", "shipping", "returns", "medical_disclaimer", "accessibility"] },
    { name: "effectiveFrom", type: "date", required: true },
    { name: "sections", type: "array", required: true, fields: [
      { name: "heading", type: "text", required: true },
      { name: "body", type: "textarea", required: true },
    ]},
  ],
};

export const Pages: CollectionConfig = {
  slug: "pages",
  versions: { drafts: true },
  access: { read: () => true, update: isContent, create: isContent, delete: isCompliance },
  hooks: { beforeChange: [claimsGate("page")] },
  admin: { useAsTitle: "title" },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true },
    { name: "modules", type: "array", fields: [
      { name: "eyebrow", type: "text" },
      { name: "headline", type: "text" },
      { name: "body", type: "textarea" },
    ]},
  ],
};

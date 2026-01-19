import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, boolean, index, json, integer, uniqueIndex } from "drizzle-orm/pg-core";

// ==================== AUTH TABLES ====================

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

// ==================== CORE TABLES ====================

export const project = pgTable('project', {
  id: text('id').primaryKey(),
  ownerId: text('owner_id').notNull().references(() => user.id, { onDelete: "cascade" }),
  name: text('name').notNull(),
  description: text('description'),
  slug: text('slug').unique(),
  isPublic: boolean('is_public').default(false).notNull(),
  isArchived: boolean('is_archived').notNull().default(false),
  settings: json('settings'),
  allowedFeatures: text('allowed_features').array(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull(),
}, (table) => [
  index('project_ownerId_idx').on(table.ownerId),
  index('project_slug_idx').on(table.slug),
]);

export const document = pgTable('document', {
  id: text('id').primaryKey(),
  projectId: text('project_id').notNull().references(() => project.id, { onDelete: 'cascade' }),
  createdByUserId: text('created_by_user_id').references(() => user.id, { onDelete: 'set null' }),
  lastEditedByUserId: text('last_edited_by_user_id').references(() => user.id, { onDelete: 'set null' }),
  title: text('title').notNull(),
  allVersionsIds: text('all_versions_ids').array().notNull().default([]),
  isDeleted: boolean('is_deleted').notNull().default(false),
  isPublished: boolean('is_published').default(false).notNull(),
  publishedAt: timestamp('published_at'),
  lockedByUserId: text('locked_by_user_id').references(() => user.id, { onDelete: 'set null' }),
  lockedAt: timestamp('locked_at'),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull(),
}, (table) => [
  index('document_projectId_idx').on(table.projectId),
  index('document_createdByUserId_idx').on(table.createdByUserId),
  index('document_isDeleted_idx').on(table.isDeleted),
]);

export const documentVersion = pgTable('document_version', {
  id: text('id').primaryKey(),
  documentId: text('document_id').references(() => document.id, { onDelete: 'cascade' }).notNull(),
  content: json('content').notNull(),
  versionNumber: integer('version_number').notNull().default(1),
  createdByUserId: text('created_by_user_id').references(() => user.id, { onDelete: 'set null' }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => [
  index('documentVersion_documentId_idx').on(table.documentId),
  index('documentVersion_documentId_versionNumber_idx').on(table.documentId, table.versionNumber),
  uniqueIndex('documentVersion_unique_version').on(table.documentId, table.versionNumber),
]);

export const subscription = pgTable('subscription', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => user.id, { onDelete: 'cascade' }).notNull().unique(),
  plan: text('plan', { enum: ['free', 'pro'] }).notNull(),
  status: text('status', { enum: ['active', 'canceled', 'trial', 'past_due'] }).notNull(),
  provider: text('provider', { enum: ['stripe', 'other'] }).notNull(),
  providerSubId: text('provider_sub_id').notNull().unique(),
  currentPeriodEnd: timestamp('current_period_end', { mode: 'date' }).notNull(),
  trialEndsAt: timestamp('trial_ends_at'),
  canceledAt: timestamp('canceled_at'),
  cancelAtPeriodEnd: boolean('cancel_at_period_end').default(false),
  metadata: json('metadata'),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull(),
}, (table) => [
  index('subscription_userId_idx').on(table.userId),
  index('subscription_status_idx').on(table.status),
  index('subscription_providerSubId_idx').on(table.providerSubId),
]);

// ==================== RELATIONS ====================

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  projects: many(project),
  createdDocuments: many(document, { relationName: 'createdDocuments' }),
  editedDocuments: many(document, { relationName: 'editedDocuments' }),
  lockedDocuments: many(document, { relationName: 'lockedDocuments' }),
  documentVersions: many(documentVersion),
  subscription: many(subscription),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const projectRelations = relations(project, ({ one, many }) => ({
  owner: one(user, {
    fields: [project.ownerId],
    references: [user.id],
  }),
  documents: many(document),
}));

export const documentRelations = relations(document, ({ one, many }) => ({
  project: one(project, {
    fields: [document.projectId],
    references: [project.id],
  }),
  createdBy: one(user, {
    fields: [document.createdByUserId],
    references: [user.id],
    relationName: 'createdDocuments',
  }),
  lastEditedBy: one(user, {
    fields: [document.lastEditedByUserId],
    references: [user.id],
    relationName: 'editedDocuments',
  }),
  lockedBy: one(user, {
    fields: [document.lockedByUserId],
    references: [user.id],
    relationName: 'lockedDocuments',
  }),
  versions: many(documentVersion),
}));

export const documentVersionRelations = relations(documentVersion, ({ one }) => ({
  document: one(document, {
    fields: [documentVersion.documentId],
    references: [document.id],
  }),
  createdBy: one(user, {
    fields: [documentVersion.createdByUserId],
    references: [user.id],
  }),
}));

export const subscriptionRelations = relations(subscription, ({ one }) => ({
  user: one(user, {
    fields: [subscription.userId],
    references: [user.id],
  }),
}));
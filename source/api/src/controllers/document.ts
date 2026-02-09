import { Hono } from 'hono';
import { validator } from 'hono/validator';
import { HTTPException } from 'hono/http-exception';
import { and, or, ilike, asc, desc, sql, eq, arrayContains } from "drizzle-orm";
import { isCuid } from '@paralleldrive/cuid2';

import { db } from '@/db';
import { document, project } from '@/db/schema';

import { generalApiResponse } from '@/lib/utils';
import { documentPaginationAndFilters, updateDocumentSchema } from '@/constants/types';

export const documentController = new Hono()
    // ? Create document
    .post(
        '/',
        async (c) => {
            try {
                let creatorId = c.get('session').user.id;

                const doc: typeof document.$inferInsert = {
                    title: 'Untitled Document',
                    createdByUserId: creatorId,
                    lastEditedByUserId: creatorId
                }

                let createdDoc = await db.insert(document).values(doc).returning();

                return c.json(
                    generalApiResponse({
                        success: true,
                        message: "Document created successfully",
                        data: createdDoc,
                        statusCode: 201,
                    }),
                    201
                );
            } catch (error: any) {
                if (error instanceof HTTPException) {
                    throw error;
                }

                return c.json(
                    generalApiResponse({
                        success: false,
                        message: "Failed to create document!",
                        statusCode: 500,
                        errors: error
                    }),
                    500
                );
            }
        }
    )
    // ? Get all documents with pagination, search, and sorting
    .get(
        "/",
        validator("query", (value, c) => {
            const result = documentPaginationAndFilters.safeParse({
                ...value,
                limit: Number(value.limit),
                page: Number(value.page)
            });

            if (!result.success) {
                const issue = result.error.issues[0];

                return c.json(
                    generalApiResponse({
                        success: false,
                        message: `Invalid  format'${String(issue.path[0])}': ${issue.message}`,
                        statusCode: 400,
                        errors: result.error.flatten().fieldErrors,
                    }),
                    400
                );
            }

            return result.data;
        }),
        async (c) => {
            try {
                let creatorId = c.get('session').user.id;
                const { page, limit, search, sortBy, sortOrder } = c.req.valid("query");

                const offset = (page - 1) * limit;

                /* ---------------- WHERE ---------------- */
                const whereClause = and(
                    eq(document.isDeleted, false),
                    eq(document.createdByUserId, creatorId),
                    search ? ilike(document.title, `%${search}%`) : undefined
                );

                /* ---------------- ORDER ---------------- */
                const orderBy = sortOrder === "asc" ? asc(document[sortBy]) : desc(document[sortBy]);

                /* ---------------- DATA ---------------- */
                const documents = await db
                    .select()
                    .from(document)
                    .where(whereClause)
                    .orderBy(orderBy)
                    .limit(limit)
                    .offset(offset);

                /* ---------------- COUNT ---------------- */
                const [{ count }] = await db
                    .select({ count: sql<number>`count(*)` })
                    .from(document)
                    .where(whereClause);

                const totalPages = Math.ceil(count / limit);

                return c.json(
                    generalApiResponse({
                        success: true,
                        message: "All documents",
                        statusCode: 200,
                        data: documents,
                        meta: {
                            pagination: {
                                page,
                                total: totalPages,
                                limit,
                                count,
                                hasNextPage: page < totalPages,
                                hasPrevPage: page > 1,
                            }
                        }
                    }),
                    200
                );
            } catch (error: any) {
                console.error("Error fetching documents:", error);

                return c.json(
                    generalApiResponse({
                        success: false,
                        message: `Failed to et all documents`,
                        statusCode: 500,
                        errors: error,
                    }),
                    500
                );
            }
        }
    )
    // ? Get all favorite documents with pagination, search, and sorting
    .get(
        "/favorites",
        validator("query", (value, c) => {
            const result = documentPaginationAndFilters.safeParse({
                ...value,
                limit: Number(value.limit),
                page: Number(value.page)
            });

            if (!result.success) {
                const issue = result.error.issues[0];

                return c.json(
                    generalApiResponse({
                        success: false,
                        message: `Invalid  format'${String(issue.path[0])}': ${issue.message}`,
                        statusCode: 400,
                        errors: result.error.flatten().fieldErrors,
                    }),
                    400
                );
            }

            return result.data;
        }),
        async (c) => {
            try {
                let creatorId = c.get('session').user.id;
                const { page, limit, search, sortBy, sortOrder } = c.req.valid("query");

                const offset = (page - 1) * limit;

                /* ---------------- WHERE ---------------- */
                const whereClause = and(
                    eq(document.createdByUserId, creatorId),
                    eq(document.isDeleted, false),
                    eq(document.isFavorite, true),
                    search ? ilike(document.title, `%${search}%`) : undefined
                );

                /* ---------------- ORDER ---------------- */
                const orderBy = sortOrder === "asc" ? asc(document[sortBy]) : desc(document[sortBy]);

                /* ---------------- DATA ---------------- */
                const documents = await db
                    .select()
                    .from(document)
                    .where(whereClause)
                    .orderBy(orderBy)
                    .limit(limit)
                    .offset(offset);

                /* ---------------- COUNT ---------------- */
                const [{ count }] = await db
                    .select({ count: sql<number>`count(*)` })
                    .from(document)
                    .where(whereClause);

                const totalPages = Math.ceil(count / limit);

                return c.json(
                    generalApiResponse({
                        success: true,
                        message: "All favorite documents",
                        statusCode: 200,
                        data: documents,
                        meta: {
                            pagination: {
                                page,
                                total: totalPages,
                                limit,
                                count,
                                hasNextPage: page < totalPages,
                                hasPrevPage: page > 1,
                            }
                        }
                    }),
                    200
                );
            } catch (error: any) {
                console.error("Error fetching documents:", error);

                return c.json(
                    generalApiResponse({
                        success: false,
                        message: `Failed to et all documents`,
                        statusCode: 500,
                        errors: error,
                    }),
                    500
                );
            }
        }
    )
    // TODO list of all endpoints needed
    // ? Get all documents of projectId
    .get(
        '/:projectId/documents',
        validator("param", (value, c) => {
            if (!isCuid(value.projectId)) {
                return c.json(
                    generalApiResponse({
                        success: false,
                        message: `Invalid Id`,
                        statusCode: 400,
                    }),
                    400
                );
            } else return value;
        }),
        validator("query", (value, c) => {
            const result = documentPaginationAndFilters.safeParse({
                ...value,
                limit: Number(value.limit),
                page: Number(value.page)
            });

            if (!result.success) {
                const issue = result.error.issues[0];

                return c.json(
                    generalApiResponse({
                        success: false,
                        message: `Invalid  format'${String(issue.path[0])}': ${issue.message}`,
                        statusCode: 400,
                        errors: result.error.flatten().fieldErrors,
                    }),
                    400
                );
            }

            return result.data;
        }),
        async (c) => {
            try {
                const { projectId } = c.req.valid("param");
                let creatorId = c.get('session').user.id;
                const { page, limit, search, sortBy, sortOrder } = c.req.valid("query");

                const offset = (page - 1) * limit;

                /* ---------------- WHERE ---------------- */
                const whereClause = and(
                    eq(document.projectId, projectId),
                    eq(document.isDeleted, false),
                    eq(document.createdByUserId, creatorId),
                    search ? ilike(document.title, `%${search}%`) : undefined
                );

                /* ---------------- ORDER ---------------- */
                const orderBy = sortOrder === "asc" ? asc(document[sortBy]) : desc(document[sortBy]);

                /* ---------------- DATA ---------------- */
                const documents = await db
                    .select()
                    .from(document)
                    .where(whereClause)
                    .orderBy(orderBy)
                    .limit(limit)
                    .offset(offset);

                /* ---------------- COUNT ---------------- */
                const [{ count }] = await db
                    .select({ count: sql<number>`count(*)` })
                    .from(document)
                    .where(whereClause);

                const totalPages = Math.ceil(count / limit);

                return c.json(
                    generalApiResponse({
                        success: true,
                        message: "All documents of this project",
                        statusCode: 200,
                        data: documents,
                        meta: {
                            pagination: {
                                page,
                                total: totalPages,
                                limit,
                                count,
                                hasNextPage: page < totalPages,
                                hasPrevPage: page > 1,
                            }
                        }
                    }),
                    200
                );
            } catch (error: any) {
                console.error("Error fetching documents:", error);

                return c.json(
                    generalApiResponse({
                        success: false,
                        message: `Failed to et all documents`,
                        statusCode: 500,
                        errors: error,
                    }),
                    500
                );
            }
        }
    )
    // ? Create a document inside 'projectId' project
    .post(
        '/:projectId/project',
        validator("param", (value, c) => {
            if (!isCuid(value.projectId)) {
                return c.json(
                    generalApiResponse({
                        success: false,
                        message: `Invalid Project Id`,
                        statusCode: 400,
                    }),
                    400
                );
            } return value;
        }),
        async (c) => {
            try {
                let creatorId = c.get('session').user.id;
                const { projectId } = c.req.valid("param");

                let condition = and(eq(project.id, projectId), eq(project.ownerId, creatorId));

                const isProjectWithThisIdAvailable = await db.select({ id: project.id })
                    .from(project)
                    .where(condition)
                    .limit(1);

                if (isProjectWithThisIdAvailable.length === 0) {
                    return c.json(
                        generalApiResponse({
                            success: false,
                            message: "Project not found!",
                            statusCode: 404,
                        }),
                        404
                    );
                } else {
                    const doc: typeof document.$inferInsert = {
                        title: 'Untitled Document',
                        createdByUserId: creatorId,
                        lastEditedByUserId: creatorId,
                        projectId
                    }

                    let createdDoc = await db.insert(document).values(doc).returning();

                    return c.json(
                        generalApiResponse({
                            success: true,
                            message: "Document created successfully",
                            data: createdDoc,
                            statusCode: 201,
                        }),
                        201
                    );
                }

            } catch (error: any) {
                if (error instanceof HTTPException) {
                    throw error;
                }

                return c.json(
                    generalApiResponse({
                        success: false,
                        message: "Failed to create document!",
                        statusCode: 500,
                        errors: error
                    }),
                    500
                );
            }
        }
    )
    // ? Update a document with :docId
    .patch(
        '/:docId',
        validator("param", (value, c) => {
            if (!isCuid(value.docId)) {
                return c.json(
                    generalApiResponse({
                        success: false,
                        message: `Invalid Id`,
                        statusCode: 400,
                    }),
                    400
                );
            } return value;
        }),
        validator('json', (value, c) => {
            const result = updateDocumentSchema.safeParse(value);

            if (!result.success) {
                const issue = result.error.issues[0];

                return c.json(
                    generalApiResponse({
                        success: false,
                        message: `Invalid  format '${String(issue.path[0])}': ${issue.message}`,
                        statusCode: 400,
                        errors: result.error.flatten().fieldErrors,
                    }),
                    400
                );
            } return result.data;
        }),
        async (c) => {
            try {
                const { docId } = c.req.valid("param");
                let creatorId = c.get('session').user.id;
                const newInput = c.req.valid('json');

                const whereClause = and(
                    eq(document.createdByUserId, creatorId),
                    eq(document.isDeleted, false),
                    eq(document.id, docId),
                );

                const updated = await db.update(document).set(newInput).where(whereClause).returning()
                if (updated.length === 0) {
                    return c.json(
                        generalApiResponse({
                            success: false,
                            message: `Document with id ${docId} not found`,
                            statusCode: 404,
                        }),
                        404
                    );
                }

                return c.json(
                    generalApiResponse({
                        success: true,
                        message: `Updated Document`,
                        statusCode: 200,
                        data: updated[0],
                    }),
                    200
                );
            } catch (error: any) {
                console.error("Error Updating document", error);

                return c.json(
                    generalApiResponse({
                        success: false,
                        message: `Failed to update this document`,
                        statusCode: 500,
                        errors: error,
                    }),
                    500
                );
            }
        }
    )
    // ? Get all data of a document with :docId
    .get(
        '/:docId',
        validator("param", (value, c) => {
            if (!isCuid(value.docId)) {
                return c.json(
                    generalApiResponse({
                        success: false,
                        message: `Invalid Id`,
                        statusCode: 400,
                    }),
                    400
                );
            } return value;
        }),
        async (c) => {
            try {
                let creatorId = c.get('session').user.id;
                const { docId } = c.req.valid("param");

                const condition = and(
                    or(
                        eq(document.createdByUserId, creatorId),
                        arrayContains(document.editorsId, [creatorId])
                    ),
                    eq(document.id, docId)
                );

                const foundDoc = await db.select().from(document).where(condition).limit(1);

                return c.json(
                    generalApiResponse({
                        success: true,
                        message: "Document",
                        statusCode: 200,
                        data: foundDoc,
                    }),
                    200
                );
            } catch (error: any) {
                console.error("Error fetching document:", error);

                return c.json(
                    generalApiResponse({
                        success: false,
                        message: `Failed to get document`,
                        statusCode: 500,
                        errors: error,
                    }),
                    500
                );
            }
        }
    )
    // ? Toggle favorite of a document with :docId
    .patch(
        '/:docId/favorite',
        validator("param", (value, c) => {
            if (!isCuid(value.docId)) {
                return c.json(
                    generalApiResponse({
                        success: false,
                        message: `Invalid Id`,
                        statusCode: 400,
                    }),
                    400
                );
            } return value;
        }),
        async (c) => {
            try {
                const { docId } = c.req.valid("param");
                let creatorId = c.get('session').user.id;

                const condition = and(
                    or(
                        eq(document.createdByUserId, creatorId),
                        arrayContains(document.editorsId, [creatorId])
                    ),
                    eq(document.isDeleted, false),
                    eq(document.id, docId),
                );

                const updated = await db.update(document).set({ isFavorite: sql`NOT ${document.isFavorite}` }).where(condition).returning()

                if (updated.length === 0) {
                    return c.json(
                        generalApiResponse({
                            success: false,
                            message: `Document with id ${docId} not found`,
                            statusCode: 404,
                        }),
                        404
                    );
                } else {
                    return c.json(
                        generalApiResponse({
                            success: true,
                            message: `${updated[0].isFavorite ? 'Document added in Favorites' : 'Document removed from Favorites'}`,
                            statusCode: 200,
                            data: updated[0],
                        }),
                        200
                    );
                }
            } catch (error: any) {
                console.error("Error toggling favorite document", error);

                return c.json(
                    generalApiResponse({
                        success: false,
                        message: `Failed to update favorite status`,
                        statusCode: 500,
                        errors: error,
                    }),
                    500
                );
            }
        }
    )
    // ? Archive a document with :docId
    .patch(
        '/:docId/archive',
        validator("param", (value, c) => {
            if (!isCuid(value.docId)) {
                return c.json(
                    generalApiResponse({
                        success: false,
                        message: `Invalid Id`,
                        statusCode: 400,
                    }),
                    400
                );
            } return value;
        }),
        async (c) => {
            try {
                const { docId } = c.req.valid("param");
                let creatorId = c.get('session').user.id;

                const condition = and(
                    or(
                        eq(document.createdByUserId, creatorId),
                        arrayContains(document.editorsId, [creatorId])
                    ),
                    eq(document.id, docId),
                );

                const updated = await db.update(document).set({ isFavorite: sql`NOT ${document.isDeleted}` }).where(condition).returning()

                if (updated.length === 0) {
                    return c.json(
                        generalApiResponse({
                            success: false,
                            message: `Document with id ${docId} not found`,
                            statusCode: 404,
                        }),
                        404
                    );
                } else {
                    return c.json(
                        generalApiResponse({
                            success: true,
                            message: `${updated[0].isDeleted ? 'Document deleted' : 'Document removed from archive'}`,
                            statusCode: 200,
                            data: updated[0],
                        }),
                        200
                    );
                }
            } catch (error: any) {
                console.error("Error toggling archive document", error);

                return c.json(
                    generalApiResponse({
                        success: false,
                        message: `Failed to update favorite archive status`,
                        statusCode: 500,
                        errors: error,
                    }),
                    500
                );
            }
        }
    )
    // ? Delete all data (and its children) of a document with :docId
    .delete(
        '/:docId',
        validator("param", (value, c) => {
            if (!isCuid(value.docId)) {
                return c.json(
                    generalApiResponse({
                        success: false,
                        message: `Invalid Id`,
                        statusCode: 400,
                    }),
                    400
                );
            } return value;
        }),
        async (c) => {
            try {
                let creatorId = c.get('session').user.id;
                const { docId } = c.req.valid("param");

                const condition = and(
                    eq(document.createdByUserId, creatorId),
                    eq(document.id, docId)
                );

                const deletedDoc = await db.delete(document).where(condition).returning();

                return c.json(
                    generalApiResponse({
                        success: true,
                        message: "Document Deleted",
                        statusCode: 200,
                        data: deletedDoc,
                    }),
                    200
                );
            } catch (error: any) {
                console.error("Error deleting document:", error);

                return c.json(
                    generalApiResponse({
                        success: false,
                        message: `Failed to delete document`,
                        statusCode: 500,
                        errors: error,
                    }),
                    500
                );
            }
        }
    );
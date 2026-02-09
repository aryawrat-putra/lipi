import { Hono } from 'hono';
import { validator } from 'hono/validator';
import { HTTPException } from 'hono/http-exception';
import { and, or, ilike, arrayContains, desc, sql, eq } from "drizzle-orm";
import { isCuid } from "@paralleldrive/cuid2";

import { db } from "@/db";
import { documentVersion, document } from '@/db/schema';

import { generalApiResponse } from '@/lib/utils';
import { createDocumentVersionSchema, updateDocumentVersionSchema } from '@/constants/types';

export const documentVersionController = new Hono()
    // TODO list of all endpoints needed  |  cerate read update delete
    // ? Create a document version for
    .post(
        '/',
        validator('json', (value, c) => {
            const result = createDocumentVersionSchema.safeParse(value);
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
                let creatorId = c.get('session').user.id;
                const data = c.req.valid('json');

                const latestVersion = await db
                    .select({ versionNumber: documentVersion.versionNumber })
                    .from(documentVersion)
                    .where(eq(documentVersion.documentId, data.documentId))
                    .orderBy(desc(documentVersion.versionNumber))
                    .limit(1);

                const nextVersionNumber =
                    latestVersion.length > 0
                        ? latestVersion[0].versionNumber + 1
                        : 1;

                const [createdVersion] = await db
                    .insert(documentVersion)
                    .values({
                        documentId: data.documentId,
                        content: data.content,
                        createdByUserId: creatorId,
                        versionNumber: nextVersionNumber,
                    })
                    .returning();

                await db
                    .update(document)
                    .set({
                        allVersionsIds: sql`${document.allVersionsIds} || ${createdVersion.id}`,
                        lastEditedByUserId: creatorId,
                        updatedAt: new Date(),
                    })
                    .where(eq(document.id, data.documentId));

                return c.json(
                    generalApiResponse({
                        success: true,
                        message: 'Doc version created successfully',
                        data: createdVersion,
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
                        message: "Failed to create Doc version",
                        statusCode: 500,
                        errors: error
                    }),
                    500
                );
            }
        }
    )
    // ? Get a document version details by id :docVersionId
    .get(
        '/:docVersionId',
        validator("param", (value, c) => {
            if (!isCuid(value.docVersionId)) {
                return c.json(
                    generalApiResponse({
                        success: false,
                        message: `Invalid Dov Version Id`,
                        statusCode: 400,
                    }),
                    400
                );
            } return value;
        }),
        async (c) => {
            try {
                const { docVersionId } = c.req.valid("param");

                const version = await db
                    .select()
                    .from(documentVersion)
                    .where(eq(documentVersion.id, docVersionId))
                    .limit(1);

                if (version.length === 0) {
                    return c.json(
                        generalApiResponse({
                            success: false,
                            message: 'Document version not found',
                            statusCode: 404,
                        }),
                        404
                    );
                }

                return c.json(
                    generalApiResponse({
                        success: true,
                        message: 'Document version fetched successfully',
                        data: version[0],
                        statusCode: 200,
                    }),
                    200
                );
            } catch (error: any) {
                return c.json(
                    generalApiResponse({
                        success: false,
                        message: 'Failed to fetch document version',
                        statusCode: 500,
                        errors: error,
                    }),
                    500
                );
            }
        }
    )
    // ? Update a document version details by id :docVersionId
    .patch(
        '/:docVersionId',
        validator("param", (value, c) => {
            if (!isCuid(value.docVersionId)) {
                return c.json(
                    generalApiResponse({
                        success: false,
                        message: `Invalid Dov Version Id`,
                        statusCode: 400,
                    }),
                    400
                );
            } return value;
        }),
        validator('json', (value, c) => {
            const result = updateDocumentVersionSchema.safeParse(value);
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
                const { docVersionId } = c.req.valid("param");
                const userId = c.get('session').user.id;
                const updateInput = c.req.valid('json');

                const updated = await db
                    .update(documentVersion)
                    .set(updateInput)
                    .where(eq(documentVersion.id, docVersionId))
                    .returning();

                if (updated.length === 0) {
                    return c.json(
                        generalApiResponse({
                            success: false,
                            message: 'Document version not found',
                            statusCode: 404,
                        }),
                        404
                    );
                }

                await db
                    .update(document)
                    .set({
                        lastEditedByUserId: userId,
                        updatedAt: new Date(),
                    })
                    .where(eq(document.id, updated[0].documentId));

                return c.json(
                    generalApiResponse({
                        success: true,
                        message: 'Document version updated successfully',
                        data: updated[0],
                        statusCode: 200,
                    }),
                    200
                );
            } catch (error: any) {
                return c.json(
                    generalApiResponse({
                        success: false,
                        message: 'Failed to update document version',
                        statusCode: 500,
                        errors: error,
                    }),
                    500
                );
            }
        }
    )
    // ? Delete a document version details by id :docVersionId
    .delete(
        '/:docVersionId',
        validator("param", (value, c) => {
            if (!isCuid(value.docVersionId)) {
                return c.json(
                    generalApiResponse({
                        success: false,
                        message: `Invalid Dov Version Id`,
                        statusCode: 400,
                    }),
                    400
                );
            } return value;
        }),
        async (c) => {
            try {
                const { docVersionId } = c.req.valid("param");
                let creatorId = c.get('session').user.id;

                let condition = and(
                    eq(documentVersion.id, docVersionId),
                    eq(documentVersion.createdByUserId, creatorId),
                );

                const version = await db
                    .select()
                    .from(documentVersion)
                    .where(condition)
                    .limit(1);

                if (version.length === 0) {
                    return c.json(
                        generalApiResponse({
                            success: false,
                            message: 'Document version not found',
                            statusCode: 404,
                        }),
                        404
                    );
                }

                const versionsCount = await db
                    .select({ count: sql<number>`count(*)` })
                    .from(documentVersion)
                    .where(eq(documentVersion.documentId, version[0].documentId));

                if (versionsCount[0].count <= 1) {
                    return c.json(
                        generalApiResponse({
                            success: false,
                            message: 'Cannot delete the only document version',
                            statusCode: 400,
                        }),
                        400
                    );
                }

                await db.delete(documentVersion).where(condition);

                await db.update(document)
                    .set({
                        allVersionsIds: sql`array_remove(${document.allVersionsIds}, ${docVersionId})`,
                    })
                    .where(condition);

                return c.json(
                    generalApiResponse({
                        success: true,
                        message: 'Document version deleted successfully',
                        statusCode: 200,
                    }),
                    200
                );
            } catch (error: any) {
                return c.json(
                    generalApiResponse({
                        success: false,
                        message: 'Failed to delete document version',
                        statusCode: 500,
                        errors: error,
                    }),
                    500
                );
            }
        }
    )
    // ? Get all versions of a :docId document
    .get(
        '/:docId/versions',
        validator("param", (value, c) => {
            if (!isCuid(value.docId)) {
                return c.json(
                    generalApiResponse({
                        success: false,
                        message: `Invalid Doc Id`,
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

                // might be wrong
                const condition = and(
                    eq(documentVersion.documentId, docId),
                    or(
                        eq(document.createdByUserId, creatorId),
                        arrayContains(document.editorsId, [creatorId])
                    )
                );

                const versions = await db
                    .select()
                    .from(documentVersion)
                    .where(condition)
                    .orderBy(desc(documentVersion.versionNumber));

                return c.json(
                    generalApiResponse({
                        success: true,
                        message: 'Document versions fetched successfully',
                        data: versions,
                        statusCode: 200,
                    }),
                    200
                );
            } catch (error: any) {
                return c.json(
                    generalApiResponse({
                        success: false,
                        message: 'Failed to fetch document versions',
                        statusCode: 500,
                        errors: error,
                    }),
                    500
                );
            }
        }
    )
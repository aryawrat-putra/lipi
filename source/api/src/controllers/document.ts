import { Hono } from 'hono';
import { validator } from 'hono/validator';
import { HTTPException } from 'hono/http-exception';
import { and, or, ilike, asc, desc, sql, eq } from "drizzle-orm";

import { db } from '@/db';
import { document } from '@/db/schema';

import { generalApiResponse } from '@/lib/utils';
import { documentPaginationAndFilters } from '@/constants/types';

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
                    lastEditedByUserId: creatorId,
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

    // ? Get all categories with pagination, search, and sorting
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
    );



// // ? Get document by ID
// .get(
//     '/:document-id',
//     validator('param', (value, c) => {
//         const result = documentParamsSchema.safeParse(value);
//         if (!result.success) {
//             return c.json(genApiResponse('Invalid document ID', `-- ${result.error.issues[0].path[0]} -- ${result.error.issues[0].message}`), 400);
//         }
//         return result.data;
//     }),
//     async (c) => {
//         try {
//             const { 'document-id': documentId } = c.req.valid('param');

//             const document = await documentModel
//                 .findById(documentId)
//                 .populate('tasks')
//                 .lean();

//             if (!document) {
//                 return c.json(genApiResponse('Invalid query parameters'), 400);
//             }

//             return c.json(genApiResponse('document details', document, true), 200);
//         } catch (error) {
//             if (error instanceof HTTPException) {
//                 throw error;
//             }

//             console.error('Error fetching document:', error);
//             return c.json(genApiResponse('Failed to fetch document'), 500);
//         }
//     }
// )

// // ? Update document by ID
// .put(
//     '/:document-id',
//     // * Params Validator
//     validator('param', (value, c) => {
//         const result = documentParamsSchema.safeParse(value);
//         if (!result.success) {
//             return c.json(genApiResponse(`-- ${result.error.issues[0].path[0]} -- ${result.error.issues[0].message}`), 400);
//         }
//         return result.data;
//     }),
//     // * Update data Validator
//     validator('json', (value, c) => {
//         const result = updatedocumentSchema.safeParse(value);
//         if (!result.success) {
//             return c.json(genApiResponse('Invalid request body', `-- ${result.error.issues[0].path[0]} -- ${result.error.issues[0].message}`), 409);
//         }
//         return result.data;
//     }),
//     async (c) => {
//         try {
//             const { 'document-id': documentId } = c.req.valid('param');
//             const body = c.req.valid('json');

//             // * Check if document exists
//             const existingdocument = await documentModel.findById(documentId);
//             if (!existingdocument) {
//                 return c.json(genApiResponse('document not found'), 404);
//             }

//             // * Check for name conflicts if name is being updated
//             if (body.name && body.name !== document.name) {
//                 const duplicatedocument = await documentModel.findOne({
//                     name: { $regex: `^${body.name}$`, $options: 'i' },
//                     _id: { $ne: documentId },
//                 });

//                 if (duplicatedocument) {
//                     return c.json(genApiResponse('document with this name already exists'), 409);
//                 }
//             }

//             const updateddocument = await documentModel
//                 .findByIdAndUpdate(
//                     documentId,
//                     { $set: body },
//                     { new: true, runValidators: true }
//                 )
//                 // .populate('tasks')
//                 .lean();

//             return c.json(genApiResponse('document updated successfully', updateddocument, true), 200);
//         } catch (error: any) {
//             if (error instanceof HTTPException) {
//                 throw error;
//             }

//             console.error('Error updating document:', error);

//             // * Handle MongoDB validation errors
//             if (error.name === 'ValidationError') {
//                 return c.json(genApiResponse('Validation failed', error.errors), 400);
//             }

//             return c.json(genApiResponse('Failed to update document'), 500);
//         }
//     }
// )

// // ? Delete document by ID
// .delete(
//     '/:document-id',
//     validator('param', (value, c) => {
//         const result = documentParamsSchema.safeParse(value);
//         if (!result.success) {
//             return c.json(genApiResponse('Invalid document ID', `-- ${result.error.issues[0].path[0]} -- ${result.error.issues[0].message}`), 400);
//         }
//         return result.data;
//     }),
//     async (c) => {
//         try {
//             const { 'document-id': documentId } = c.req.valid('param');

//             const deleteddocument = await documentModel.findByIdAndDelete(documentId).lean<{ _id: string, name: string }>();

//             if (!deleteddocument) {
//                 return c.json(genApiResponse('document not found'), 404);
//             };

//             return c.json(genApiResponse('document deleted successfully', {
//                 deleteddocument: {
//                     id: document._id,
//                     name: document.name,
//                 },
//             }, true), 200);
//         } catch (error) {
//             if (error instanceof HTTPException) {
//                 throw error;
//             }
//             console.error('Error deleting document:', error);
//             return c.json(genApiResponse('Failed to delete document'), 500);
//         }
//     }
// )

// // ? Get document statistics
// .get(
//     '/:document-id/stats',
//     validator('param', (value, c) => {
//         const result = documentParamsSchema.safeParse(value);
//         if (!result.success) {
//             return c.json(genApiResponse('Invalid document ID', `-- ${result.error.issues[0].path[0]} -- ${result.error.issues[0].message}`), 400);
//         }
//         return result.data;
//     }),
//     async (c) => {
//         try {
//             const { 'document-id': documentId } = c.req.valid('param');

//             const document = await documentModel.findById(documentId).lean<{ name: string }>();
//             if (!document) {
//                 return c.json(genApiResponse('document not found'), 404);
//             }

//             const stats = await documentModel.aggregate([
//                 { $match: { _id: new Types.ObjectId(documentId) } },
//                 {
//                     $lookup: {
//                         from: 'tasks',
//                         localField: 'tasks',
//                         foreignField: '_id',
//                         as: 'taskDetails',
//                     },
//                 },
//                 {
//                     $project: {
//                         name: 1,
//                         totalTasks: { $size: '$taskDetails' },
//                         completedTasks: {
//                             $size: {
//                                 $filter: {
//                                     input: '$taskDetails',
//                                     cond: { $eq: ['$$this.done', true] },
//                                 },
//                             },
//                         },
//                         pendingTasks: {
//                             $size: {
//                                 $filter: {
//                                     input: '$taskDetails',
//                                     cond: { $ne: ['$$this.done', false] },
//                                 },
//                             },
//                         },
//                     },
//                 },
//             ]);

//             return c.json(genApiResponse(
//                 'document Stats',
//                 stats[0] || { name: document.name, totalTasks: 0, completedTasks: 0, pendingTasks: 0 },
//                 true), 200);
//         } catch (error) {
//             if (error instanceof HTTPException) {
//                 throw error;
//             }

//             console.error('Error fetching document stats:', error);
//             return c.json(genApiResponse('Failed to fetch document statistics'), 500);
//         }
//     }
// );
import { Hono } from 'hono';
import { validator } from 'hono/validator';
import { HTTPException } from 'hono/http-exception';
import { and, or, ilike, asc, desc, sql, eq } from "drizzle-orm";

import { db } from "@/db";
import { project } from '@/db/schema';

import { generalApiResponse } from '@/lib/utils';
import { createProjectSchema, projectPaginationAndFilters } from '@/constants/types';

export const projectController = new Hono()
    // ? Create Project
    .post(
        '/',
        validator('json', (value, c) => {
            const result = createProjectSchema.safeParse(value);

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
            }

            return result.data;
        }),
        async (c) => {
            try {
                let creatorId = c.get('session').user.id;
                const data = c.req.valid('json');

                const p: typeof project.$inferInsert = {
                    name: data.name,
                    description: data.description,
                    ownerId: creatorId,
                }

                let createdProject = await db.insert(project).values(p).returning();

                return c.json(
                    generalApiResponse({
                        success: true,
                        message: "Project created successfully",
                        data: createdProject,
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
                        message: "Failed to create project!",
                        statusCode: 500,
                        errors: error
                    }),
                    500
                );
            }
        }
    )

    // ? Get all projects with pagination, search, and sorting
    .get(
        "/",
        validator("query", (value, c) => {
            const result = projectPaginationAndFilters.safeParse({
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
                    eq(project.ownerId, creatorId),
                    eq(project.isArchived, false),
                    search ? ilike(project.name, `%${search}%`) : undefined,
                    search ? ilike(project.description, `%${search}%`) : undefined
                );

                /* ---------------- ORDER ---------------- */
                const orderBy = sortOrder === "asc" ? asc(project[sortBy]) : desc(project[sortBy]);

                /* ---------------- DATA ---------------- */
                const projects = await db
                    .select()
                    .from(project)
                    .where(whereClause)
                    .orderBy(orderBy)
                    .limit(limit)
                    .offset(offset);

                /* ---------------- COUNT ---------------- */
                const [{ count }] = await db
                    .select({ count: sql<number>`count(*)` })
                    .from(project)
                    .where(whereClause);

                const totalPages = Math.ceil(count / limit);

                return c.json(
                    generalApiResponse({
                        success: true,
                        message: "All Projects",
                        statusCode: 200,
                        data: projects,
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
                console.error("Error fetching projects:", error);

                return c.json(
                    generalApiResponse({
                        success: false,
                        message: `Failed to get all projects`,
                        statusCode: 500,
                        errors: error,
                    }),
                    500
                );
            }
        }
    );


// // ? Get category by ID
// .get(
//     '/:category-id',
//     validator('param', (value, c) => {
//         const result = categoryParamsSchema.safeParse(value);
//         if (!result.success) {
//             return c.json(genApiResponse('Invalid category ID', `-- ${result.error.issues[0].path[0]} -- ${result.error.issues[0].message}`), 400);
//         }
//         return result.data;
//     }),
//     async (c) => {
//         try {
//             const { 'category-id': categoryId } = c.req.valid('param');

//             const category = await CategoryModel
//                 .findById(categoryId)
//                 .populate('tasks')
//                 .lean();

//             if (!category) {
//                 return c.json(genApiResponse('Invalid query parameters'), 400);
//             }

//             return c.json(genApiResponse('Category details', category, true), 200);
//         } catch (error) {
//             if (error instanceof HTTPException) {
//                 throw error;
//             }

//             console.error('Error fetching category:', error);
//             return c.json(genApiResponse('Failed to fetch category'), 500);
//         }
//     }
// )

// // ? Update category by ID
// .put(
//     '/:category-id',
//     // * Params Validator
//     validator('param', (value, c) => {
//         const result = categoryParamsSchema.safeParse(value);
//         if (!result.success) {
//             return c.json(genApiResponse(`-- ${result.error.issues[0].path[0]} -- ${result.error.issues[0].message}`), 400);
//         }
//         return result.data;
//     }),
//     // * Update data Validator
//     validator('json', (value, c) => {
//         const result = updateCategorySchema.safeParse(value);
//         if (!result.success) {
//             return c.json(genApiResponse('Invalid request body', `-- ${result.error.issues[0].path[0]} -- ${result.error.issues[0].message}`), 409);
//         }
//         return result.data;
//     }),
//     async (c) => {
//         try {
//             const { 'category-id': categoryId } = c.req.valid('param');
//             const body = c.req.valid('json');

//             // * Check if category exists
//             const existingCategory = await CategoryModel.findById(categoryId);
//             if (!existingCategory) {
//                 return c.json(genApiResponse('Category not found'), 404);
//             }

//             // * Check for name conflicts if name is being updated
//             if (body.name && body.name !== existingCategory.name) {
//                 const duplicateCategory = await CategoryModel.findOne({
//                     name: { $regex: `^${body.name}$`, $options: 'i' },
//                     _id: { $ne: categoryId },
//                 });

//                 if (duplicateCategory) {
//                     return c.json(genApiResponse('Category with this name already exists'), 409);
//                 }
//             }

//             const updatedCategory = await CategoryModel
//                 .findByIdAndUpdate(
//                     categoryId,
//                     { $set: body },
//                     { new: true, runValidators: true }
//                 )
//                 // .populate('tasks')
//                 .lean();

//             return c.json(genApiResponse('Category updated successfully', updatedCategory, true), 200);
//         } catch (error: any) {
//             if (error instanceof HTTPException) {
//                 throw error;
//             }

//             console.error('Error updating category:', error);

//             // * Handle MongoDB validation errors
//             if (error.name === 'ValidationError') {
//                 return c.json(genApiResponse('Validation failed', error.errors), 400);
//             }

//             return c.json(genApiResponse('Failed to update category'), 500);
//         }
//     }
// )

// // ? Delete category by ID
// .delete(
//     '/:category-id',
//     validator('param', (value, c) => {
//         const result = categoryParamsSchema.safeParse(value);
//         if (!result.success) {
//             return c.json(genApiResponse('Invalid category ID', `-- ${result.error.issues[0].path[0]} -- ${result.error.issues[0].message}`), 400);
//         }
//         return result.data;
//     }),
//     async (c) => {
//         try {
//             const { 'category-id': categoryId } = c.req.valid('param');

//             const deletedCategory = await CategoryModel.findByIdAndDelete(categoryId).lean<{ _id: string, name: string }>();

//             if (!deletedCategory) {
//                 return c.json(genApiResponse('Category not found'), 404);
//             };

//             return c.json(genApiResponse('Category deleted successfully', {
//                 deletedCategory: {
//                     id: deletedCategory._id,
//                     name: deletedCategory.name,
//                 },
//             }, true), 200);
//         } catch (error) {
//             if (error instanceof HTTPException) {
//                 throw error;
//             }
//             console.error('Error deleting category:', error);
//             return c.json(genApiResponse('Failed to delete category'), 500);
//         }
//     }
// )

// // ? Get category statistics
// .get(
//     '/:category-id/stats',
//     validator('param', (value, c) => {
//         const result = categoryParamsSchema.safeParse(value);
//         if (!result.success) {
//             return c.json(genApiResponse('Invalid category ID', `-- ${result.error.issues[0].path[0]} -- ${result.error.issues[0].message}`), 400);
//         }
//         return result.data;
//     }),
//     async (c) => {
//         try {
//             const { 'category-id': categoryId } = c.req.valid('param');

//             const category = await CategoryModel.findById(categoryId).lean<{ name: string }>();
//             if (!category) {
//                 return c.json(genApiResponse('Category not found'), 404);
//             }

//             const stats = await CategoryModel.aggregate([
//                 { $match: { _id: new Types.ObjectId(categoryId) } },
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
//                 'Category Stats',
//                 stats[0] || { name: category.name, totalTasks: 0, completedTasks: 0, pendingTasks: 0 },
//                 true), 200);
//         } catch (error) {
//             if (error instanceof HTTPException) {
//                 throw error;
//             }

//             console.error('Error fetching category stats:', error);
//             return c.json(genApiResponse('Failed to fetch category statistics'), 500);
//         }
//     }
// );
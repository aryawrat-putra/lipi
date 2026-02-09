import { Hono } from 'hono';
import { validator } from 'hono/validator';
import { HTTPException } from 'hono/http-exception';
import { and, ilike, asc, desc, sql, eq } from "drizzle-orm";
import { isCuid } from "@paralleldrive/cuid2";

import { db } from "@/db";
import { project } from '@/db/schema';

import { generalApiResponse } from '@/lib/utils';
import { createProjectSchema, projectPaginationAndFilters, updateProjectSchema } from '@/constants/types';

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
    )
    // ? Get a project's details by projectId
    .get(
        '/:projectId',
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
        async (c) => {
            try {
                const { projectId } = c.req.valid("param");
                let creatorId = c.get('session').user.id;

                const whereClause = and(
                    eq(project.ownerId, creatorId),
                    eq(project.isArchived, false),
                    eq(project.id, projectId),
                );

                const foundProject = await db.select().from(project).where(whereClause);

                if (foundProject.length !== 1) {
                    return c.json(
                        generalApiResponse({
                            success: false,
                            message: `Project with id ${projectId} not found`,
                            statusCode: 404,
                        }),
                        404
                    );
                } else {
                    return c.json(
                        generalApiResponse({
                            success: true,
                            message: `Project : ${projectId}`,
                            statusCode: 200,
                            data: foundProject,
                        }),
                        200
                    );
                }

            } catch (error: any) {
                console.error("Error Getting project", error);

                return c.json(
                    generalApiResponse({
                        success: false,
                        message: `Failed to get this project`,
                        statusCode: 500,
                        errors: error,
                    }),
                    500
                );
            }
        }
    )
    // TODO list of all endpoints needed --test
    // ? Update a project's details by projectId
    .patch(
        '/:projectId',
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
            } return value;
        }),
        validator('json', (value, c) => {
            const result = updateProjectSchema.safeParse(value);

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
                const { projectId } = c.req.valid("param");
                let creatorId = c.get('session').user.id;
                const newInput = c.req.valid('json');

                const whereClause = and(
                    eq(project.ownerId, creatorId),
                    eq(project.isArchived, false),
                    eq(project.id, projectId),
                );

                const updated = await db.update(project).set(newInput).where(whereClause).returning()
                if (updated.length === 0) {
                    return c.json(
                        generalApiResponse({
                            success: false,
                            message: `Project with id ${projectId} not found`,
                            statusCode: 404,
                        }),
                        404
                    );
                }

                return c.json(
                    generalApiResponse({
                        success: true,
                        message: `Updated Project`,
                        statusCode: 200,
                        data: updated[0],
                    }),
                    200
                );
            } catch (error: any) {
                console.error("Error Updating project", error);

                return c.json(
                    generalApiResponse({
                        success: false,
                        message: `Failed to update this project`,
                        statusCode: 500,
                        errors: error,
                    }),
                    500
                );
            }
        }
    )
    // ? Archive a project by projectId
    .patch(
        '/:projectId/archive',
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
                const { projectId } = c.req.valid("param");
                let creatorId = c.get('session').user.id;

                const whereClause = and(
                    eq(project.ownerId, creatorId),
                    eq(project.isArchived, false),
                    eq(project.id, projectId),
                );

                const updated = await db.update(project).set({ isArchived: true }).where(whereClause).returning()
                if (updated.length === 0) {
                    return c.json(
                        generalApiResponse({
                            success: false,
                            message: `Project with id ${projectId} not found`,
                            statusCode: 404,
                        }),
                        404
                    );
                } return c.json(
                    generalApiResponse({
                        success: true,
                        message: `Project ${updated[0].name} ${updated[0].isArchived ? 'Archived' : 'Unarchived'}!`,
                        statusCode: 200,
                        data: updated[0],
                    }),
                    200
                );
            } catch (error: any) {
                console.error("Error Archive/Unarchive project", error);

                return c.json(
                    generalApiResponse({
                        success: false,
                        message: `Failed to Archive/Unarchive this project`,
                        statusCode: 500,
                        errors: error,
                    }),
                    500
                );
            }
        }
    )
    // ? Delete a project by projectId
    .delete(
        '/:projectId',
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
                const { projectId } = c.req.valid("param");
                let creatorId = c.get('session').user.id;

                const whereClause = and(
                    eq(project.ownerId, creatorId),
                    eq(project.id, projectId),
                );

                const deleted = await db.delete(project).where(whereClause).returning()
                if (deleted.length === 0) {
                    return c.json(
                        generalApiResponse({
                            success: false,
                            message: `Project with id ${projectId} not found`,
                            statusCode: 404,
                        }),
                        404
                    );
                } return c.json(
                    generalApiResponse({
                        success: true,
                        message: `Project ${deleted[0].name} Deleted!`,
                        statusCode: 200,
                        data: deleted[0],
                    }),
                    200
                );
            } catch (error: any) {
                console.error("Error deleting project", error);

                return c.json(
                    generalApiResponse({
                        success: false,
                        message: `Failed to deleting this project`,
                        statusCode: 500,
                        errors: error,
                    }),
                    500
                );
            }
        }
    );
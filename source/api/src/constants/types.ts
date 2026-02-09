import { z } from 'zod';

export interface ApiResponse<T = unknown> {
    success: boolean;
    message: string;
    data: T | null;
    statusCode: number;
    errors?: Record<string, string[]> | null;
    meta?: {
        timestamp?: string;
        requestId?: string;
        pagination?: {
            page: number;
            limit: number;
            total: number;
            count: number;
            hasNextPage: boolean;
            hasPrevPage: boolean;
        };
    };
}

export const documentPaginationAndFilters = z.object({
    page: z.number().optional().default(1).transform((v) => Math.max(1, Number(v) || 1)),
    limit: z.number().optional().default(10).transform((v) => Math.min(100, Math.max(1, Number(v) || 10))),
    search: z.string().optional(),
    sortBy: z.enum(["title", "createdAt", "updatedAt"]).optional().default("createdAt"),
    sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
});

export const projectPaginationAndFilters = z.object({
    page: z.number().optional().default(1).transform((v) => Math.max(1, Number(v) || 1)),
    limit: z.number().optional().default(10).transform((v) => Math.min(100, Math.max(1, Number(v) || 10))),
    search: z.string().optional(),
    sortBy: z.enum(["name", "createdAt", "updatedAt"]).optional().default("createdAt"),
    sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
});

import { document, project, documentVersion } from '../db/schema';
import { createInsertSchema, createUpdateSchema } from 'drizzle-zod';

export const createProjectSchema = createInsertSchema(project);
export const updateProjectSchema = createUpdateSchema(project);

export const updateDocumentSchema = createUpdateSchema(document);

export const createDocumentVersionSchema = createInsertSchema(documentVersion);
export const updateDocumentVersionSchema = createUpdateSchema(documentVersion);
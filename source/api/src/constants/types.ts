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

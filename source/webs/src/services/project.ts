import http from '@/lib/http';
import { HTTPError } from 'ky';

import { project } from '../../../api/src/db/schema';
import { type ApiResponse } from '../../../api/src/constants/types';
import { createProjectSchema } from '../../../api/src/constants/types';

export async function postProject(body: z.infer<typeof createProjectSchema>) {
    try {
        return await http.post('api/project', { json: body }).json<ApiResponse<typeof project.$inferSelect[]>>();
    } catch (error) {
        if (error instanceof HTTPError) {
            const errorBody = await error.response.json();
            throw new Error(`${errorBody.message} - ${errorBody.payload}`);
        } else {
            console.error('[postProject] Unexpected Error:', error);
            throw new Error('Unexpected error occurred');
        }
    }
};

import { documentPaginationAndFilters } from '../../../api/src/constants/types';
import type z from 'zod';

export async function getAllProjects(params: z.infer<typeof documentPaginationAndFilters>) {
    try {
        return await http.get('api/project', {
            searchParams: {
                page: params.page,
                limit: params.limit,
                ...(params.search && { search: params.search }),
                ...(params.sortBy && { sortBy: params.sortBy }),
                ...(params.sortOrder && { sortOrder: params.sortOrder }),
            }
        }).json<ApiResponse<typeof project.$inferSelect[]>>();
    } catch (error) {
        if (error instanceof HTTPError) {
            const errorBody = await error.response.json();
            throw new Error(`${errorBody.message} - ${errorBody.payload}`);
        } else {
            console.error('[getAllProjects] Unexpected Error:', error);
            throw new Error('Unexpected error occurred');
        }
    }
};
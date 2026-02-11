import http from '@/lib/http';
import { HTTPError } from 'ky';

import { document } from '../../../api/src/db/schema';
import { type ApiResponse } from '../../../api/src/constants/types';

export async function postDoc() {
    try {
        return await http.post('api/document',).json<ApiResponse<typeof document.$inferSelect[]>>();
    } catch (error) {
        if (error instanceof HTTPError) {
            const errorBody = await error.response.json();
            throw new Error(`${errorBody.message} - ${errorBody.payload}`);
        } else {
            console.error('[postDoc] Unexpected Error:', error);
            throw new Error('Unexpected error occurred');
        }
    }
};

export async function postDocInProjectId(id: string) {
    try {
        return await http.post(`api/document/${id}/project`,).json<ApiResponse<typeof document.$inferSelect[]>>();
    } catch (error) {
        if (error instanceof HTTPError) {
            const errorBody = await error.response.json();
            throw new Error(`${errorBody.message} - ${errorBody.payload}`);
        } else {
            console.error('[postDoc] Unexpected Error:', error);
            throw new Error('Unexpected error occurred');
        }
    }
};

import { documentPaginationAndFilters } from '../../../api/src/constants/types';
import type z from 'zod';

export async function getAllDocs(params: z.infer<typeof documentPaginationAndFilters>) {
    try {
        return await http.get('api/document', {
            searchParams: {
                page: params.page,
                limit: params.limit,
                ...(params.search && { search: params.search }),
                ...(params.sortBy && { sortBy: params.sortBy }),
                ...(params.sortOrder && { sortOrder: params.sortOrder }),
            }
        }).json<ApiResponse<typeof document.$inferSelect[]>>();
    } catch (error) {
        if (error instanceof HTTPError) {
            const errorBody = await error.response.json();
            throw new Error(`${errorBody.message} - ${errorBody.payload}`);
        } else {
            console.error('[postDoc] Unexpected Error:', error);
            throw new Error('Unexpected error occurred');
        }
    }
};

export async function getAllDocsOfProjectId({ params, id }: { params: z.infer<typeof documentPaginationAndFilters>, id: string }) {
    try {
        return await http.get(`api/document/${id}/documents`, {
            searchParams: {
                page: params.page,
                limit: params.limit,
                ...(params.search && { search: params.search }),
                ...(params.sortBy && { sortBy: params.sortBy }),
                ...(params.sortOrder && { sortOrder: params.sortOrder }),
            }
        }).json<ApiResponse<typeof document.$inferSelect[]>>();
    } catch (error) {
        if (error instanceof HTTPError) {
            const errorBody = await error.response.json();
            throw new Error(`${errorBody.message} - ${errorBody.payload}`);
        } else {
            console.error('[postDoc] Unexpected Error:', error);
            throw new Error('Unexpected error occurred');
        }
    }
};

export async function getAllFavoriteDocs(params: z.infer<typeof documentPaginationAndFilters>) {
    try {
        return await http.get('api/document/favorites', {
            searchParams: {
                page: params.page,
                limit: params.limit,
                ...(params.search && { search: params.search }),
                ...(params.sortBy && { sortBy: params.sortBy }),
                ...(params.sortOrder && { sortOrder: params.sortOrder }),
            }
        }).json<ApiResponse<typeof document.$inferSelect[]>>();
    } catch (error) {
        if (error instanceof HTTPError) {
            const errorBody = await error.response.json();
            throw new Error(`${errorBody.message} - ${errorBody.payload}`);
        } else {
            console.error('[postDoc] Unexpected Error:', error);
            throw new Error('Unexpected error occurred');
        }
    }
};

export async function toggleDocFav(id: string) {
    try {
        return await http.patch(`api/document/${id}/favorite`).json<ApiResponse<typeof document.$inferSelect[]>>();
    } catch (error) {
        if (error instanceof HTTPError) {
            const errorBody = await error.response.json();
            throw new Error(`${errorBody.message} - ${errorBody.payload}`);
        } else {
            console.error('[postDoc] Unexpected Error:', error);
            throw new Error('Unexpected error occurred');
        }
    }
};

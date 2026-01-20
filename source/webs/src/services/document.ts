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

// export async function postDoc(): Promise<> {
//     try {
//         const res = await http.post('auth', { json: { pin } }).json<RegisterResType>();
//         return res;
//     } catch (error) {
//         if (error instanceof HTTPError) {
//             const errorBody = await error.response.json<GeneralErrorResponseType>();
//             throw new Error(`${errorBody.message} - ${errorBody.payload}`);
//         } else {
//             console.error('[authentication] Unexpected Error:', error);
//             throw new Error('Unexpected error occurred');
//         }
//     }
// }
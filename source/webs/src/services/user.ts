import http from '@/lib/http';
import { HTTPError } from 'ky';

import { user } from '../../../api/src/db/schema';
import { type ApiResponse } from '../../../api/src/constants/types';

export async function getUserDetailsById(id: string) {
    try {
        return await http.get(`api/user/${id}`).json<ApiResponse<typeof user.$inferSelect[]>>();
    } catch (error) {
        if (error instanceof HTTPError) {
            const errorBody = await error.response.json();
            throw new Error(`${errorBody.message} - ${errorBody.payload}`);
        } else {
            console.error('[getUserDetailsById] Unexpected Error:', error);
            throw new Error('Unexpected error occurred');
        }
    }
};
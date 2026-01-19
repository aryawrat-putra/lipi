import http from '@/lib/http';
import { HTTPError } from 'ky';

export async function postDoc(): Promise<> {
    try {
        const res = await http.post('auth', ).json();
        return res;
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
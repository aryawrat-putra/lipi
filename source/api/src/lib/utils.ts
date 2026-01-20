import { ApiResponse } from "@/constants/types";

export function generalApiResponse<T>({
    success,
    message,
    data = null,
    statusCode = 200,
    errors = null,
    meta,
}: {
    success: boolean;
    message: string;
    data?: T | null;
    statusCode?: number;
    errors?: Record<string, string[]> | null;
    meta?: ApiResponse["meta"];
}): ApiResponse<T> {
    return {
        success,
        message,
        data,
        statusCode,
        errors,
        meta: {
            timestamp: new Date().toISOString(),
            ...meta,
        },
    };
}

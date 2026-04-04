import { Hono } from 'hono';
import { validator } from 'hono/validator';
import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { user } from '@/db/schema';

import { generalApiResponse } from '@/lib/utils';

export const userController = new Hono()
    // ? Get a user's details by userId
    .get(
        '/:userId',
        validator("param", (value, c) => {
            if (!value.userId) {
                return c.json(
                    generalApiResponse({
                        success: false,
                        message: `No User Id provided`,
                        statusCode: 400,
                    }),
                    400
                );
            } else return value;
        }),
        async (c) => {
            try {
                const { userId } = c.req.valid("param");

                const whereClause = and(
                    eq(user.id, userId),
                );

                const foundUser = await db.select().from(user).where(whereClause);
                if (foundUser.length !== 1) {
                    return c.json(
                        generalApiResponse({
                            success: false,
                            message: `User with id ${userId} not found`,
                            statusCode: 404,
                        }),
                        404
                    );
                } else {
                    return c.json(
                        generalApiResponse({
                            success: true,
                            message: `User : ${userId}`,
                            statusCode: 200,
                            data: foundUser,
                        }),
                        200
                    );
                }

            } catch (error: any) {
                console.error("Error Getting user", error);

                return c.json(
                    generalApiResponse({
                        success: false,
                        message: `Failed to get this user`,
                        statusCode: 500,
                        errors: error,
                    }),
                    500
                );
            }
        }
    )
import * as z from "zod";

const ActivityType = z.object({
    id: z.string(),
    type: z.enum(['edited', 'changed name', 'shared']),
    done_date: z.iso.datetime().default(new Date(Date.now()).toUTCString()),
    did_by: z.string().min(3).max(64).default('Untitled Doc'),
});

export type ActivityT = z.infer<typeof ActivityType>;
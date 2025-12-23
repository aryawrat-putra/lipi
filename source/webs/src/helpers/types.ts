import * as z from "zod";

const DocumentType = z.object({
    id: z.string(),
    last_mod: z.iso.datetime().default(new Date(Date.now()).toUTCString()),
    name: z.string().min(3).max(64).default('Untitled Doc'),
});

const ActivityType = z.object({
    id: z.string(),
    type: z.enum(['edited', 'changed name', 'shared']),
    done_date: z.iso.datetime().default(new Date(Date.now()).toUTCString()),
    did_by: z.string().min(3).max(64).default('Untitled Doc'),
});

import { type LucideIcon } from "lucide-react";

const NotificationsType = z.object({
    id: z.string(),
    type: z.enum(['info', 'warning', 'success', 'update']),
    title: z.string(),
    description: z.string(),
    timestamp: z.string(),
    read: z.boolean().default(false),
    icon: z.custom<LucideIcon>(),
})

export type DocumentT = z.infer<typeof DocumentType>;
export type ActivityT = z.infer<typeof ActivityType>;
export type NotificationsT = z.infer<typeof NotificationsType>;
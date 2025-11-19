import * as z from "zod";

const DocumentType = z.object({
    id: z.string(),
    last_mod: z.iso.datetime().default(new Date(Date.now()).toUTCString()),
    name: z.string().min(3).max(64).default('Untitled Doc'),
});

export type DocumentT = z.infer<typeof DocumentType>;
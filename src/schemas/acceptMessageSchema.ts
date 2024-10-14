import {z} from "zod"

export const AcceptMessages = z.object({
    acceptMessages: z.boolean()
})
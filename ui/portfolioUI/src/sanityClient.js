import { createClient } from "@sanity/client";

export const client = createClient ({
    projectId: "zr1c570a",
    dataset: "production"
})
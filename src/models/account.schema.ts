

export const commonResponseSchema = {
    type: "object",
    properties: {
        responseCode: { type: "ingeter" },
        message: { type: "string" },
    },
    required: ["responseCode", "message"],
};

export const userDetailSchema = {
    type: "object",
    properties: {
        responseCode: { type: "integer" },
        user: {
            type: "object",
            properties: {
                id: { type: "integer" },
                name: { type: "string" },
                email: { type: "string" },
                title: { type: "string" },
                birth_date: { type: "string" },
                birth_month: { type: "string" },
                birth_year: { type: "string" },
                firstname: { type: "string" },
                lastname: { type: "string" },
                company: { type: "string" },
                address1: { type: "string" },
                address2: { type: "string" },
                country: { type: "string" },
                state: { type: "string" },
                city: { type: "string" },
                zipcode: { type: "string" },
                mobile_number: { type: "string" },
            },
            required: ["id", "name", "email", "title", "birth_date", "birth_month", "birth_year", "firstname", "lastname", "company", "address1", "address2", "country", "state", "city", "zipcode", "mobile_number"],
        },
    },
    required: ["responseCode", "user"],
}


export const allProductsListSchema = {
    type: "object",
    properties: {
        responseCode: { type: "integer" },
        products: {
            type: "array",
            minItems: 0,
            items: {
                type: "object",
                properties: {
                    id: { type: "integer", minimum: 1 },
                    name: { type: "string" },
                    price: { type: "string", pattern: "^Rs\\. \\d+$" },
                    brand: { type: "string" },
                    category: { 
                        type: "object",
                        properties: {
                            usertype: {
                                type: "object",
                                properties: {
                                    usertype: { type: "string" }
                                },
                                required: ["usertype"]
                            },
                            category: { type: "string" }
                        },
                        required: ["usertype", "category"] 
                    },
                },
                required: ["id", "name", "price", "brand", "category"]
            }
        },
    },
    required: ["responseCode", "products"]
};

export const brandListSchema = {
    type: "object",
    properties: {
        responseCode: { type: "integer" },
        brands: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    id: { type: "integer", minimum: 1 },
                    brand: { type: "string" },
                },
                required: ["id", "brand"]
            }
        }
    },
    required: ["responseCode", "brands"]
};



export const bio_fields_constant = ['pre_district', 'per_district', 'candidate','age','marital_status','special']

export interface User {
    permanent_addresses?: {
        some: {
            district: {
                equals: string; // Assuming 'equals' property is of type string
            };
        };
    };
    present_addresses?: {
        some: {
            district: {
                equals: string;
            };
        };
    };
    general_Info?: {
        some: {
            bio_type?: {
                equals: string;
            };
            birth_date?: {
                gte: string;
                lt: string;
            };
            marital_status?: {
                equals: string;
            };
        };
    };
}
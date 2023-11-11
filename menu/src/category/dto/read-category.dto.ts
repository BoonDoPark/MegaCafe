export interface ReadBerverageDTO {
    id: number;
    title: string;
    price: number;
    url: string;
}

export interface ReadCategoryDTO {
    id: number;
    category: string;
    berverage: ReadBerverageDTO[];
}
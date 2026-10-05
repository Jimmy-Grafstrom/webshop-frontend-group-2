export type Category =
    | "COMPUTER"
    | "PHONE"
    | "ACCESSORY"
    | "DISPLAY"
    | "AUDIO"
    | "TV"
    | "OTHER";

export const CATEGORIES: { label: string; value: Category }[] = [
    { label: "Datorer", value: "COMPUTER" },
    { label: "Telefoner", value: "PHONE" },
    { label: "Tillbehör", value: "ACCESSORY" },
    { label: "Skärmar", value: "DISPLAY" },
    { label: "Ljud", value: "AUDIO" },
    { label: "TV", value: "TV" },
    { label: "Övrigt", value: "OTHER" },
];

export interface ProductResponse {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: Category | string;
    imageUrl: string;
}
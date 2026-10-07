export type Category =
    | "COMPUTER"
    | "PHONE"
    | "ACCESSORY"
    | "DISPLAY"
    | "AUDIO"
    | "TV"
    | "OTHER";

export const CATEGORIES: { value: Category; label: string }[] = [
    { value: "COMPUTER", label: "Dator" },
    { value: "PHONE", label: "Telefon" },
    { value: "ACCESSORY", label: "Tillbehör" },
    { value: "DISPLAY", label: "Skärm" },
    { value: "AUDIO", label: "Ljud" },
    { value: "TV", label: "TV" },
    { value: "OTHER", label: "Övrigt" },
];

export interface ProductResponse {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: Category | string;
    imageUrl?: string;
}
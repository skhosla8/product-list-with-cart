export interface ImageType {
    "thumbnail": string
    "mobile": string;
    "tablet": string;
    "desktop": string;
}

export interface CartItem {
    name: string;
    category: string;
    price: number;
    quantity: number;
}

export interface Dessert {
    image: ImageType;
    name: string;
    category: string;
    price: number;
}
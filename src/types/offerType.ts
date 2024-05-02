import { GoodsType } from './goodsType.enum.js';
import { Image } from './imageType.js';
import { LocationType } from './locationType.js';
import { OfferType } from './offerType.enum.js';
import { User } from './userType.js';

export type Offer = {
    title: string;
    description: string;
    date: Date;
    city: string;
    previewImage: string;
    images: Image[];
    isPremium: boolean;
    isFavorite: boolean;
    rating: number;
    type: OfferType;
    rooms: number;
    guests: number;
    price: number;
    goods: GoodsType[];
    author: User;
    comments: number;
    location: LocationType;
}

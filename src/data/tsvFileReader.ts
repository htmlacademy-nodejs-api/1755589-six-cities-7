import { readFileSync } from 'node:fs';
import { GoodsType } from '../types/goodsType.enum.js';
import { OfferType } from '../types/offerType.enum.js';
import { Offer } from '../types/offerType.js';
import { UserType } from '../types/userType.enum.js';
import { User } from '../types/userType.js';
import { FileReader } from './fileReader.interface.js';
import { LocationType } from '../types/locationType.js';

export class TSVFileReader implements FileReader {
  constructor(
        private readonly fileName: string
  ){}

  private data = '';

  private ensureData(): void {
    if(!this.data){
      throw new Error('The data was not found');
    }
  }

  private parseDataIntoOffers(): Offer[] {
    return this.data.split('\n')
      .filter((el) => el.trim())
      .map((el) => this.parseLineIntoOffer(el));
  }

  private parseLineIntoOffer(line: string): Offer {
    const [
      title,
      description,
      date,
      city,
      previewImage,
      images,
      isPremium,
      isFavorite,
      rating,
      type,
      rooms,
      guests,
      price,
      goods,
      name,
      level,
      avatar,
      mail,
      comments,
      location
    ] = line.split('*');

    return {
      title,
      description,
      date: new Date(date),
      city,
      previewImage,
      images: this.parseOfferImages(images),
      isPremium: isPremium as unknown as true | false,
      isFavorite: isFavorite as unknown as true | false,
      rating: this.parseFloatNum(rating),
      type: OfferType[
        type as 'apartment' |
        'house' |
        'room' |
        'hotel'],
      rooms: this.parseInteger(rooms),
      guests: this.parseInteger(guests),
      price: this.parseInteger(price),
      goods: this.parseOfferGoods(goods),
      author: this.parseUser(name, mail, avatar, level as UserType),
      comments: this.parseComments(comments),
      location: this.parseLocation(location)
    };
  }

  private parseOfferImages(images: string): ({image: string})[] {
    return images.split(';').map((image) => ({image}));
  }

  private parseOfferGoods(goods: string): GoodsType[] {
    return goods.split(';').filter((good) => (good in GoodsType)) as GoodsType[];
  }

  private parseFloatNum(value: string): number {
    return parseFloat(value);
  }

  private parseInteger(value: string): number {
    return parseInt(value, 10);
  }

  private parseUser(name: string, mail: string, avatar: string, level: UserType): User {
    return {name, mail, avatar, level};
  }

  private parseComments(comment: string): number {
    return parseInt(comment, 10);
  }

  private parseLocation(value: string): LocationType {
    const location = value.split(';');
    const [latitude, longitude] = location;
    return {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude)
    };
  }

  public read(): void {
    this.data = readFileSync(this.fileName, 'utf-8');
  }

  public setArray(): Offer[] {
    this.ensureData();
    return this.parseDataIntoOffers();
  }
}

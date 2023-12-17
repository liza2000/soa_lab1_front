import {Host} from "./host";
import {Review} from "./review";

export class ListingFull {
  public constructor(
    public id: number,
    public name: string,
    public price: number,
    public rating: number,
    public city: string,
    public host: Host,
    public review: Review[]) {
  }

}




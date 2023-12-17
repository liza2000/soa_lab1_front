export class Listing {
  public constructor(
              public id: number,
              public name: string,
              public price: number,
              public rating: number,
              public city: string,
              public info: string,
              public date: Date) {
  }

}




export enum RequestType{
  GET_BY_ID
}

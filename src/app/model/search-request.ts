export class SearchRequest {
  constructor(
  public  sort: string[],
  public name: string,
  public priceMin:  number ,
  public priceMax:  number ,
  public ratingMin: number,
  public ratingMax: number,
  public city: string,
  public limit: number,
  public startDate: string,
  public endDate: string,
  public pageIndex: number
  ) {
  }
}

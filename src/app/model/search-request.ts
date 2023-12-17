export class SearchRequest {
  constructor(
  public priceMin:  number,
  public priceMax:  number,
  public city: string,
  public startDate: string,
  public endDate: string,
  ) {
  }
}

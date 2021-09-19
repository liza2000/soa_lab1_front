export class HumanBeing {
  public constructor(
              public id: number,
              public name: string,
              public coordinates: Coordinates,
              public creationDate: Date,
              public realHero: boolean,
              public hasToothpick: boolean,
              public impactSpeed: number,
              public soundtrackName:string,
              public minutesOfWaiting: number,
              public weaponType: WeaponType,
              public car: Car) {
  }

}


export class Coordinates{
 constructor( public x:number, public y: number){}
}

export class Car{
  constructor(public name: string){}
}
export enum WeaponType{
  PISTOL = "PISTOL",
  SHOTGUN = "SHOTGUN",
  MACHINE_GUN = "MACHINE_GUN",
  BAT = "BAT"
}



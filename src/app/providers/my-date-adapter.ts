import {NativeDateAdapter} from "@angular/material/core";


export class MyDateAdapter extends NativeDateAdapter {

  format(date: Date, displayFormat: Object): string {



      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return `${day}.${month}.${year}`;
  }
}

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL'
  },
  display: {
    dateInput: 'YYYY-MM-DD',
  }
};

import { Injectable } from '@angular/core';
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';
import { personOutline } from 'ionicons/icons';
import { atOutline } from 'ionicons/icons';
import { lockClosedOutline } from 'ionicons/icons';
import { calendarOutline } from 'ionicons/icons';
import { cardOutline } from 'ionicons/icons';
import { callOutline } from 'ionicons/icons';

@Injectable({
  providedIn: 'root'
})
export class IconService {

  constructor() { 
    addIcons({ arrowBackOutline });
        addIcons({ personOutline });
        addIcons({ atOutline });
        addIcons({ lockClosedOutline });
        addIcons({ calendarOutline });
        addIcons({ cardOutline });
        addIcons({ callOutline });
  }
}

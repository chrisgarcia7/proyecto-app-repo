import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonTabs, IonTabBar, IonTabButton, IonLabel  } from '@ionic/angular/standalone';
import { IconService } from '../../services/icons/icon.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [ IonIcon, IonTabs, IonTabBar, IonTabButton, IonLabel]
})
export class TabsPage implements OnInit {
  private readonly _iconservice: IconService= inject(IconService);

  constructor() { }

  ngOnInit() {
  }

}

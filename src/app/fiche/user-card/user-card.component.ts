import { Component, Input } from '@angular/core';
import { FicheImpaye } from 'src/app/Models/FicheImpaye';
@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
  @Input() fiche!: FicheImpaye;
  showDetails = false;
  
}

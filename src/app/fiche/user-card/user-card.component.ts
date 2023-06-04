import { Component, Input } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FicheImpaye } from 'src/app/Models/FicheImpaye';
@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
  @Input() fiche!: FicheImpaye;
  showDetails = false;
  afficherComposant = false;
constructor(private router: Router){}

  afficherComposantImprimer() {
      this.afficherComposant = true;
  }
  redirigerVersComponent(fiche :FicheImpaye) {
    localStorage.setItem('fiche', JSON.stringify(fiche));
    this.router.navigate(['/print']);
  
  }
}

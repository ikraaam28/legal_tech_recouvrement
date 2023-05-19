import { Component } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FicheImpayeService } from '../services/fiche-impaye.service';
import { FicheImpaye } from '../Models/FicheImpaye';

@Component({
  selector: 'app-fiche',
  templateUrl: './fiche.component.html',
  styleUrls: ['./fiche.component.css']
})
export class FicheComponent {
  constructor(private authservice : AuthServiceService, private route : Router ,private router: ActivatedRoute, private ficheImpayeService: FicheImpayeService) {}
  isCollapsed: boolean = false;
  isCollapsed2: boolean = false;
  isCollapsed3: boolean = false;
  isCollapsed4: boolean = false;
  isCollapsed5: boolean = false;
  id!: number;
  fiche!: FicheImpaye;
  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
  toggleCollapse2() {
    this.isCollapsed2 = !this.isCollapsed2;
  }
  toggleCollapse3() {
    this.isCollapsed3 = !this.isCollapsed3;
  }
  toggleCollapse4() {
    this.isCollapsed4 = !this.isCollapsed4;
  }
  toggleCollapse5() {
    this.isCollapsed5 = !this.isCollapsed5;
  }
  showAppNotes = false;
  activeTab: string | undefined;
 // propriété pour suivre l'onglet actif
  
  isAvocatActive(): boolean {
    return this.activeTab === 'avocat'; // méthode pour vérifier si l'onglet "Avocat" est actif
  }
  ngOnInit(): void {
    // Retrieve the id of the fiche from the URL parameter
    let id = this.router.snapshot.paramMap.get('id');
console.log(id);
    // Call the service to get the fiche with the corresponding id
    this.ficheImpayeService.GetFicheImpaye(Number(id)).subscribe(
      (response: any) => {
        this.fiche = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}

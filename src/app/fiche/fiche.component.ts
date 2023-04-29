import { Component } from '@angular/core';

@Component({
  selector: 'app-fiche',
  templateUrl: './fiche.component.html',
  styleUrls: ['./fiche.component.css']
})
export class FicheComponent  {
  isCollapsed: boolean = false;
  isCollapsed2: boolean = false;
  isCollapsed3: boolean = false;
  isCollapsed4: boolean = false;
  isCollapsed5: boolean = false;
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
<<<<<<< HEAD
  showAppNotes = false;
  activeTab: string | undefined;
 // propriété pour suivre l'onglet actif
  
  isAvocatActive(): boolean {
    return this.activeTab === 'avocat'; // méthode pour vérifier si l'onglet "Avocat" est actif
  }
=======
>>>>>>> 414fff7856f8b66b02e56391f076c7a16477f58c
}

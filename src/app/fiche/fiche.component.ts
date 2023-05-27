import { Component } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FicheImpayeService } from '../services/fiche-impaye.service';
import { FicheImpaye } from '../Models/FicheImpaye';
import { UsersService } from '../services/users.service';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-fiche',
  templateUrl: './fiche.component.html',
  styleUrls: ['./fiche.component.css']
})
export class FicheComponent {
  constructor(private authservice : AuthServiceService, private noteservice: NotesService, private route : Router ,private router: ActivatedRoute, private ficheImpayeService: FicheImpayeService, private userService: UsersService ) {}
  isCollapsed: boolean = false;
  isCollapsed2: boolean = false;
  isCollapsed3: boolean = false;
  isCollapsed4: boolean = false;
  isCollapsed5: boolean = false;
  noteList: any;
  id!: number;
  fiche!: FicheImpaye;
  roleuser: string = '';
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
  activeTab!: string ;
 // propriété pour suivre l'onglet actif


  
  ngOnInit(): void {
    // Retrieve the id of the fiche from the URL parameter
    let id = this.router.snapshot.paramMap.get('id');
    // Call the service to get the fiche with the corresponding id
    this.ficheImpayeService.GetFicheImpaye(Number(id)).subscribe(
      (response: any) => {
        this.fiche = response;
      },
      (error: any) => {
        console.log(error);
      });

    this.noteservice.getfichiers().subscribe(result => {
      this.noteList = result;
    });

    // Get the user ID from local storage
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.userService.getUser(Number(userId)).subscribe((data: any) => {
        this.roleuser = data.role;
      });
    } else {
      console.error('User ID not found in local storage');
    }
  }
  logActiveTab(): void {
    console.log('Active Tab:', this.activeTab);
  }
  
}
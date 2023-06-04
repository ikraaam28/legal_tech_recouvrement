import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FicheImpaye } from 'src/app/Models/FicheImpaye';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent {
  fiche!: FicheImpaye;
  serializedFiche: any;
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {

    this.serializedFiche = localStorage.getItem('fiche');
    this.fiche = JSON.parse(this.serializedFiche) as FicheImpaye;
  }
}


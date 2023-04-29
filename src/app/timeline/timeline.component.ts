import { Component } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent {
  stages = [
    { name: 'Banque', completed: true },
    { name: 'Centre d\'appel', completed: true },
    { name: 'Agent sur terrain', completed: false },
    { name: 'Avocat', completed: false },
    { name: 'Huissier notaire', completed: false }
  ];
}

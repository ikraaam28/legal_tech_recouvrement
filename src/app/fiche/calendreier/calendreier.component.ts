import { Component, ElementRef, ViewChild } from '@angular/core';
import { calendrier } from 'src/app/Models/calendrier';
import { CalendrierService } from 'src/app/services/calendrier.service';

@Component({
  selector: 'app-calendreier',
  templateUrl: './calendreier.component.html',
  styleUrls: ['./calendreier.component.css']
})
export class CalendreierComponent {
  calendar: any; // Declare the 'calendar' property
  addEvent: any;
  constructor(private calendrierService: CalendrierService) { }
 @ViewChild('eventForm', { static: false }) eventForm!: ElementRef;


  ngAfterViewInit() {
    
    const fullcalendarScript = document.createElement('script');
    fullcalendarScript.src = 'assets/plugins/custom/fullcalendar/fullcalendar.bundle.js';
    fullcalendarScript.type = 'text/javascript';
    document.body.appendChild(fullcalendarScript);

    
    const datatablesScript = document.createElement('script');
    datatablesScript.src = 'assets/plugins/custom/datatables/datatables.bundle.js';
    datatablesScript.type = 'text/javascript';
    document.body.appendChild(datatablesScript);

    const script = document.createElement('script');
    script.src = 'assets/js/custom/apps/calendar/calendar.js';
    script.type = 'text/javascript';
    document.body.appendChild(script);

    const widgetsBundleScript = document.createElement('script');
    widgetsBundleScript.src = 'assets/js/widgets.bundle.js';
    widgetsBundleScript.type = 'text/javascript';
    document.body.appendChild(widgetsBundleScript);
    
    const widgetsScript = document.createElement('script');
    widgetsScript.src = 'assets/js/custom/widgets.js';
    widgetsScript.type = 'text/javascript';
    document.body.appendChild(widgetsScript);

    const upgradePlanScript = document.createElement('script');
    upgradePlanScript.src = 'assets/js/custom/utilities/modals/upgrade-plan.js';
    upgradePlanScript.type = 'text/javascript';
    document.body.appendChild(upgradePlanScript);

    const createAppScript = document.createElement('script');
    createAppScript.src = 'assets/js/custom/utilities/modals/create-app.js';
    createAppScript.type = 'text/javascript';
    document.body.appendChild(createAppScript);
  
    const usersSearchScript = document.createElement('script');
    usersSearchScript.src = 'assets/js/custom/utilities/modals/users-search.js';
    usersSearchScript.type = 'text/javascript';
    document.body.appendChild(usersSearchScript);

  


  }
  
  resetEventData() {
    this.eventData = {
        email: '', 
        type_event: '',
        remarque: '',
        selectableDate: ''
    };
}

  eventData: calendrier={
   type_event: '',
    email : '',
    remarque: '',
    selectableDate: ''

  }
  submitEvent(): void {
    console.log('clicked ');
    // Get the submitted form data
    const formData = new FormData(this.eventForm.nativeElement);
  
    // Extract the event details
    
  console.log(this.eventData);
    
    // Add the event to the calendar using the appropriate method provided by the calendar library/component
   
    this.calendrierService.addEvent(
     this.eventData
    ).subscribe(
      (response: any) => {
        console.log('Event created successfully:', response);
        // Handle the response as needed
        this.resetEventData();
      },
      (error: any) => {
        console.error('Error creating event:', error);
        // Handle the error as needed
      }
    );
    // Optionally, reset the form
    this.eventForm.nativeElement.reset();
  }
}

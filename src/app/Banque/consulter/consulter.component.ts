import { Component, ElementRef, PipeTransform, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FicheImpayeService } from 'src/app/services/fiche-impaye.service';
import { FicheImpaye } from 'src/app/Models/FicheImpaye';
import { Modal } from 'bootstrap';
import Stepper from 'bs-stepper';
import { ToastrService } from 'ngx-toastr';
import { calendrier } from 'src/app/Models/calendrier';
import { CalendrierService } from 'src/app/services/calendrier.service';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-consulter',
  templateUrl: './consulter.component.html',
  styleUrls: ['./consulter.component.css']
})
export class ConsulterComponent implements PipeTransform  {
  FicheImpayelist: any;
  selectedFile: File | null = null;
  fileName = '';
  createFiche = true;
  multiple: boolean = false;
  public pageSize: number = 5; // number of items per page
  public currentPage: number = 1; // current page number
  public totalItems: number = 0; // total number of items
  myForm!: FormGroup;

isLinear=true;
isUploading = false;
  //Form Validables 
registerForm!: FormGroup;
submitted = false;
searchTerm !: string;
id!: number;
isTouched = false;
role!: any;
email!:any;
ficheData: FicheImpaye = {
  nom: '',
  prenom: '',
  cin: '',
  adresse: '',
  tel: '',
  email: '',
  montant_creances: 0,
  justificatif_creances: '',
  objet_creances: '',
  montant_echeances: 0,
  nombre_echeances: 0,
  note_banque: ''
};

filteredFicheImpayelist: FicheImpaye[] | undefined;

constructor( private formBuilder: FormBuilder,private userservice: UsersService, private ficheImpayeService: FicheImpayeService, private toastr: ToastrService,private calendrierService: CalendrierService){}

mounted() {
  // Get the form element and the stepper object
  const form = document.getElementById('kt_modal_offer_a_deal_form');
  const stepperElement = form?.querySelector('[data-kt-stepper="true"]');
  if (!stepperElement) {
    console.error('Stepper element not found in DOM');
    return;
  }
  const stepper = new Stepper(stepperElement);

  // Add a click event listener to the "Offer Details" button
  const offerDetailsBtn = document.getElementById('offer-details-btn');
  offerDetailsBtn?.addEventListener('click', () => {
    // Move to the next step
    stepper.next();
  });
}
transform(value: any[], searchText: string): any[] {
  if (!value) return [];
  if (!searchText) return value;
  searchText = searchText.toLowerCase();
  return value.filter((ficheimpaye) => {
    return Object.keys(ficheimpaye).some(key => {
      return ficheimpaye[key].toString().toLowerCase().includes(searchText);
    });
  });
}

onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
  this.toastr.success("Fichier sélectionné")
}

onUpload(): void {
  if (!this.selectedFile) {
    this.toastr.error("Aucun fichier sélectionné")
    return;
  }

  if (this.selectedFile.size === 0) {
    this.toastr.warning('Le fichier est vide');
    return;
  }

  const allowedMimeTypes = [

    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' // xlsx
  ];

  if (!allowedMimeTypes.includes(this.selectedFile.type)) {
    this.toastr.warning('Le fichier doit être un fichier Excel valide');
    return;
  }
  let user_id = localStorage.getItem('id');

  this.ficheImpayeService.uploadFile(this.selectedFile,Number(user_id))
    .subscribe();
    this.toastr.success("Fiche Enregistrer Avec Succés")
}

//Add user form actions
get f() { return this.registerForm.controls; }

deleteFiche(id: number) {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette fiche?')) {
    this.ficheImpayeService.deleteFicheImpaye(id).subscribe(
      (response) => {
        this.FicheImpayelist = response;
        this.toastr.success("Fiche Supprimer Avec Succés")
      },
      (error) => {
        console.error(error);
        this.toastr.error("Fiche n'a Pas été Supprimer")
      }
    );
  }
}
modifierFiche( id: number,fiche: FicheImpaye) {
  this.ficheImpayeService.GetFicheImpaye(id).subscribe(result => {
    this.ficheData = result;
  });
  this.submitted = true;
  this.createFiche = false;
  this.id = id;
  const modalElement = document.getElementById('kt_modal_offer_a_deal');
  if (modalElement) {
    const modal = new Modal(modalElement);
  
    // Get the form and the buttons
    const form = document.getElementById('kt_modal_offer_a_deal_form');
    const typeNextButton = document.querySelector('[data-kt-element="type-next"]');
    const detailsNextButton = document.querySelector('[data-kt-element="details-next"]');
    const financePrevButton = document.querySelector('[data-kt-element="finance-previous"]');
    const financeNextButton = document.querySelector('[data-kt-element="finance-next"]');
    
  
    // Add event listeners to the buttons
    if (typeNextButton) {
      typeNextButton.addEventListener('click', () => {
        // Show the next step of the form
        const currentStep = document.querySelector('.current[data-kt-stepper-element="content"]');
        const nextStep = document.querySelector('[data-kt-stepper-element="content"]:not(.current)');
        if (currentStep && nextStep) {
          currentStep.classList.remove('current');
          nextStep.classList.add('current');
        }
  
        // Update the active step in the stepper
        const currentNav = document.querySelector('.current[data-kt-stepper-element="nav"]');
        const nextNav = document.querySelector('[data-kt-stepper-element="nav"]:not(.current)');
        if (currentNav && nextNav) {
          currentNav.classList.remove('current');
          nextNav.classList.add('current');
        }
      });
    }
  
    if (detailsNextButton) {
      detailsNextButton.addEventListener('click', () => {
        // Show the next step of the form
        const currentStep = document.querySelector('.current[data-kt-stepper-element="content"]');
        const nextStep = document.querySelector('[data-kt-stepper-element="content"]:not(.current)');
        if (currentStep && nextStep) {
          currentStep.classList.remove('current');
          nextStep.classList.add('current');
        }
  
        // Update the active step in the stepper
        const currentNav = document.querySelector('.current[data-kt-stepper-element="nav"]');
        const nextNav = document.querySelector('[data-kt-stepper-element="nav"]:not(.current)');
        if (currentNav && nextNav) {
          currentNav.classList.remove('current');
          nextNav.classList.add('current');
        }
      });
    }
    
    if (financePrevButton) {
      financePrevButton.addEventListener('click', () => {
        // Show the previous step of the form
        const currentStep = document.querySelector('.current[data-kt-stepper-element="content"]');
        const prevStep = currentStep ? currentStep.previousElementSibling : null;
        if (currentStep && prevStep) {
          currentStep.classList.remove('current');
          prevStep.classList.add('current');
        }
    
        // Update the active step in the stepper
        const currentNav = document.querySelector('.current[data-kt-stepper-element="nav"]');
        const prevNav = currentNav ? currentNav.previousElementSibling : null;
        if (currentNav && prevNav) {
          currentNav.classList.remove('current');
          prevNav.classList.add('current');
        }
      });
    }
    if (financeNextButton) {
      financeNextButton.addEventListener('click', () => {
        // Check if the button should go to the previous or done step
        const isPreviousStep = financeNextButton.classList.contains('previous');
        
        // Show the previous or done step of the form
        const currentStep = document.querySelector('.current[data-kt-stepper-element="content"]');
        let targetStep;
        if (isPreviousStep) {
          targetStep = currentStep ? currentStep.previousElementSibling : null;
        } else {
          targetStep = document.querySelector('[data-kt-stepper-element="content"][data-kt-stepper-element-index="3"]');
        }
        if (currentStep && targetStep) {
          currentStep.classList.remove('current');
          targetStep.classList.add('current');
        }
    
        // Update the active step in the stepper
        const currentNav = document.querySelector('.current[data-kt-stepper-element="nav"]');
        const targetNav = document.querySelector('[data-kt-stepper-element="nav"][data-kt-stepper-element-index="3"]');
        if (currentNav && targetNav) {
          currentNav.classList.remove('current');
          targetNav.classList.add('current');
        }
      });
    }
  }
}

ngOnInit() {
  this.role =localStorage.getItem('role');
  this.ficheImpayeService.getFichesImpayes().subscribe(result => {
    this.FicheImpayelist = result;
    this.totalItems = this.FicheImpayelist.length;
  });
  

  // Add User form validations
  this.myForm = this.formBuilder.group({
    one: this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      cin: ['', Validators.required],
      adresse: ['', Validators.required],
      tel: ['', Validators.required, Validators.pattern('[0-9]*')],
      email: ['', [Validators.required, Validators.email]],
      
    }),
    two: this.formBuilder.group({
      montant_creances: ['', Validators.required],
      justificatif_creances: [, Validators.required],
      objet_creances: ['', Validators.required],
      montant_echeances: ['', Validators.required],
      nombre_echeances: ['', Validators.required],
      note_banque: ['', Validators.required],
    }),
  });

  // Set up a change event listener for the justificatif_creances file input
  this.myForm.get('two.justificatif_creances')?.valueChanges.subscribe(fileList => {
    const file = fileList[0];
    if (file) {
      // Update the value of justificatif_creances control with the file
      this.myForm.get('two.justificatif_creances')?.setValue(file);
    }
  });

  }
  onHireMeClick() {
    const modalElement = document.getElementById('kt_modal_offer_a_deal');
    if (modalElement) {
      const modal = new Modal(modalElement);
    
      // Get the form and the buttons
      const form = document.getElementById('kt_modal_offer_a_deal_form');
      const typeNextButton = document.querySelector('[data-kt-element="type-next"]');
      const detailsNextButton = document.querySelector('[data-kt-element="details-next"]');
      const financePrevButton = document.querySelector('[data-kt-element="finance-previous"]');
      const financeNextButton = document.querySelector('[data-kt-element="finance-next"]');
      
    
      // Add event listeners to the buttons
      if (typeNextButton) {
        typeNextButton.addEventListener('click', () => {
          // Show the next step of the form
          const currentStep = document.querySelector('.current[data-kt-stepper-element="content"]');
          const nextStep = document.querySelector('[data-kt-stepper-element="content"]:not(.current)');
          if (currentStep && nextStep) {
            currentStep.classList.remove('current');
            nextStep.classList.add('current');
          }
    
          // Update the active step in the stepper
          const currentNav = document.querySelector('.current[data-kt-stepper-element="nav"]');
          const nextNav = document.querySelector('[data-kt-stepper-element="nav"]:not(.current)');
          if (currentNav && nextNav) {
            currentNav.classList.remove('current');
            nextNav.classList.add('current');
          }
        });
      }
    
      if (detailsNextButton) {
        detailsNextButton.addEventListener('click', () => {
          // Show the next step of the form
          const currentStep = document.querySelector('.current[data-kt-stepper-element="content"]');
          const nextStep = document.querySelector('[data-kt-stepper-element="content"]:not(.current)');
          if (currentStep && nextStep) {
            currentStep.classList.remove('current');
            nextStep.classList.add('current');
          }
    
          // Update the active step in the stepper
          const currentNav = document.querySelector('.current[data-kt-stepper-element="nav"]');
          const nextNav = document.querySelector('[data-kt-stepper-element="nav"]:not(.current)');
          if (currentNav && nextNav) {
            currentNav.classList.remove('current');
            nextNav.classList.add('current');
          }
        });
      }
      
      if (financePrevButton) {
        financePrevButton.addEventListener('click', () => {
          // Show the previous step of the form
          const currentStep = document.querySelector('.current[data-kt-stepper-element="content"]');
          const prevStep = currentStep ? currentStep.previousElementSibling : null;
          if (currentStep && prevStep) {
            currentStep.classList.remove('current');
            prevStep.classList.add('current');
          }
      
          // Update the active step in the stepper
          const currentNav = document.querySelector('.current[data-kt-stepper-element="nav"]');
          const prevNav = currentNav ? currentNav.previousElementSibling : null;
          if (currentNav && prevNav) {
            currentNav.classList.remove('current');
            prevNav.classList.add('current');
          }
        });
      }
      if (financeNextButton) {
        financeNextButton.addEventListener('click', () => {
          // Check if the button should go to the previous or done step
          const isPreviousStep = financeNextButton.classList.contains('previous');
          
          // Show the previous or done step of the form
          const currentStep = document.querySelector('.current[data-kt-stepper-element="content"]');
          let targetStep;
          if (isPreviousStep) {
            targetStep = currentStep ? currentStep.previousElementSibling : null;
          } else {
            targetStep = document.querySelector('[data-kt-stepper-element="content"][data-kt-stepper-element-index="3"]');
          }
          if (currentStep && targetStep) {
            currentStep.classList.remove('current');
            targetStep.classList.add('current');
          }
      
          // Update the active step in the stepper
          const currentNav = document.querySelector('.current[data-kt-stepper-element="nav"]');
          const targetNav = document.querySelector('[data-kt-stepper-element="nav"][data-kt-stepper-element-index="3"]');
          if (currentNav && targetNav) {
            currentNav.classList.remove('current');
            targetNav.classList.add('current');
          }
        });
      }
    }
  }

  MyForm = this.formBuilder.group({
    one: this.formBuilder.group({
      nom:this.formBuilder.control('',Validators.required),
      prenom:this.formBuilder.control('',Validators.required),
      cin:this.formBuilder.control('',Validators.required),
      adresse:this.formBuilder.control('',Validators.required),
      tel:this.formBuilder.control('',Validators.required),
      email:this.formBuilder.control('',Validators.required),
    }),
    two: this.formBuilder.group({
      montant_creances:this.formBuilder.control(0,Validators.required),
      montant_echeances:this.formBuilder.control(0,Validators.required),
      justificatif_creances:this.formBuilder.control(null),
      objet_creances:this.formBuilder.control('',Validators.required),
      nombre_echeances:this.formBuilder.control(0,Validators.required),
      note_banque:this.formBuilder.control('')
    })
  });
  get Oneform(){
    return this.myForm.get("one") as FormGroup;
  }
  get Twoform(){
    return this.myForm.get("two") as FormGroup;
  }

  onSubmit() {
    if(this.createFiche){
    if (!this.selectedFile) {
      this.toastr.error('Aucun fichier sélectionné');
      return;
    }
  
    if (this.selectedFile.size === 0) {
      this.toastr.warning('Le fichier est vide');
      return;
    }
  
    const allowedMimeTypes = [
      'application/pdf', // pdf
      'application/msword', // doc
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // docx
    ];
  
    if (!allowedMimeTypes.includes(this.selectedFile.type)) {
      this.toastr.warning('Le fichier doit être un fichier valide');
      return;
    }

    const userData: FicheImpaye = {
      nom: this.myForm.value.one?.nom ?? '',
      prenom: this.myForm.value.one?.prenom ?? '',
      cin: this.myForm.value.one?.cin ?? '',
      adresse: this.myForm.value.one?.adresse ?? '',
      tel: this.myForm.value.one?.tel ?? '',
      email: this.myForm.value.one?.email ?? '',
      montant_creances: Number(this.myForm.value.two?.montant_creances) ?? 0,
      montant_echeances: Number(this.myForm.value.two?.montant_echeances) ?? 0,
      objet_creances: this.myForm.value.two?.objet_creances ?? '',
      nombre_echeances: Number(this.myForm.value.two?.nombre_echeances) ?? 0,
      note_banque: this.myForm.value.two?.note_banque ?? '',
      justificatif_creances: this.selectedFile.name ?? null
     };
  
    const id = localStorage.getItem('userId');
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('justificatif_creances', this.selectedFile, this.selectedFile.name);
    this.ficheImpayeService.registerFicheImpaye(userData, Number(id), formData).subscribe();
    } else {
      this.ficheImpayeService.registerFicheImpaye(userData, Number(id), null).subscribe();
    }
  }else {
    const userData: FicheImpaye = {
      nom: this.myForm.value.one?.nom ?? '',
      prenom: this.myForm.value.one?.prenom ?? '',
      cin: this.myForm.value.one?.cin ?? '',
      adresse: this.myForm.value.one?.adresse ?? '',
      tel: this.myForm.value.one?.tel ?? '',
      email: this.myForm.value.one?.email ?? '',
      montant_creances: Number(this.myForm.value.two?.montant_creances) ?? 0,
      montant_echeances: Number(this.myForm.value.two?.montant_echeances) ?? 0,
      objet_creances: this.myForm.value.two?.objet_creances ?? '',
      nombre_echeances: Number(this.myForm.value.two?.nombre_echeances) ?? 0,
      note_banque: this.myForm.value.two?.note_banque ?? '',
      justificatif_creances: null
     };
    console.log('test update ', userData);
    this.ficheImpayeService.UpdateFicheImpaye(this.id, userData).subscribe(
      (response: any)=>{
        console.log('response' ,response);
      },
      (error:any ) => console.log("error")
    );
  }
}
calendar: any; // Declare the 'calendar' property
addEvent: any;

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
  const formData = new FormData(this.eventForm.nativeElement);

  this.calendrierService.addEvent(
   this.eventData
  ).subscribe(
    (response: any) => {
      console.log('Event created successfully:', response);
      this.resetEventData();
    },
    (error: any) => {
      console.error('Error creating event:', error);
    }
  );
  this.eventForm.nativeElement.reset();
}
}
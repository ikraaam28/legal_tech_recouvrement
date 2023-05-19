import { Component, PipeTransform } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FicheImpayeService } from 'src/app/services/fiche-impaye.service';
import { FicheImpaye } from 'src/app/Models/FicheImpaye';
import { Modal } from 'bootstrap';
import Stepper from 'bs-stepper';
@Component({
  selector: 'app-consulter',
  templateUrl: './consulter.component.html',
  styleUrls: ['./consulter.component.css']
})
export class ConsulterComponent implements PipeTransform  {
  FicheImpayelist: any;
  selectedFile: File | null = null;
  fileName = '';
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

filteredFicheImpayelist: FicheImpaye[] | undefined;

constructor( private formBuilder: FormBuilder, private ficheImpayeService: FicheImpayeService){
}

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
}

onUpload(): void {
  if (!this.selectedFile) {
    console.error('Aucun fichier sélectionné');
    return;
  }

  if (this.selectedFile.size === 0) {
    console.error('Le fichier est vide');
    return;
  }

  const allowedMimeTypes = [
    
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' // xlsx
  ];

  if (!allowedMimeTypes.includes(this.selectedFile.type)) {
    console.error('Le fichier doit être un fichier Excel valide');
    return;
  }
  let user_id = localStorage.getItem('id');

  this.ficheImpayeService.uploadFile(this.selectedFile,Number(user_id))
    .subscribe();
}

//Add user form actions
get f() { return this.registerForm.controls; }

deleteFiche(id: number) {
  if (confirm('Are you sure you want to delete this fiche?')) {
    this.ficheImpayeService.deleteFicheImpaye(id).subscribe(
      (response) => {
        this.FicheImpayelist = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
ngOnInit() {
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
      telephone: ['', Validators.required],
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
 /* Empregister = this.formBuilder.group({
    basic: this.formBuilder.group({
      nom:this.formBuilder.control('',Validators.required),
      prenom:this.formBuilder.control('',Validators.required),
      cin:this.formBuilder.control('',Validators.required),
      adresse:this.formBuilder.control('',Validators.required),
      tel:this.formBuilder.control('',Validators.required),
      email:this.formBuilder.control('',Validators.required),

    }),
    contact: this.formBuilder.group({
      montant_creances:this.formBuilder.control(0,Validators.required),
      montant_echeances:this.formBuilder.control(0,Validators.required),
      justificatif_creances:this.formBuilder.control(null),
      objet_creances:this.formBuilder.control('',Validators.required),
      nombre_echeances:this.formBuilder.control(0,Validators.required)
    }),
    address: this.formBuilder.group({
      note_banque:this.formBuilder.control('')
    })
  });

  get Basicform(){
    return this.Empregister.get("basic") as FormGroup;
  }
  get contactform(){
    return this.Empregister.get("contact") as FormGroup;
  }
  get addressform(){
    return this.Empregister.get("address") as FormGroup;
  }
 */
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
 /* HandleSubmit(){
  const  userData: FicheImpaye = {
      nom: this.Empregister.value.basic?.nom ?? '',
      prenom: this.Empregister.value.basic?.prenom ?? '',
      cin: this.Empregister.value.basic?.cin ?? '',
      adresse: this.Empregister.value.basic?.adresse ?? '',
      tel: this.Empregister.value.basic?.tel ?? '',
      email: this.Empregister.value.basic?.email ?? '',
      montant_creances: Number(this.Empregister.value.contact?.montant_creances) ?? 0,
      montant_echeances: Number(this.Empregister.value.contact?.montant_echeances ) ?? 0,
      justificatif_creances: this.Empregister.value.contact?.justificatif_creances ?? null,
      objet_creances: this.Empregister.value.contact?.objet_creances ?? '',
      nombre_echeances: Number(this.Empregister.value.contact?.nombre_echeances) ?? 0,
      note_banque: this.Empregister.value.address?.note_banque ?? '',
     
    };
   
      
    const id = +localStorage.getItem('id')!;
      this.ficheImpayeService.registerFicheImpaye(userData,id).subscribe();
      
  }*/
  onSubmit() {
    if (!this.selectedFile) {
      console.error('Aucun fichier sélectionné');
      return;
    }
  
    if (this.selectedFile.size === 0) {
      console.error('Le fichier est vide');
      return;
    }
  
    const allowedMimeTypes = [
      'application/pdf', // pdf
      'application/msword', // doc
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // docx
    ];
  
    if (!allowedMimeTypes.includes(this.selectedFile.type)) {
      console.error('Le fichier doit être un fichier valide');
      return;
    }

    const userData: FicheImpaye = {
      nom: this.myForm.value.one?.nom ?? '',
      prenom: this.myForm.value.one?.prenom ?? '',
      cin: this.myForm.value.one?.cin ?? '',
      adresse: this.myForm.value.one?.adresse ?? '',
      tel: this.myForm.value.one?.telephone ?? '',
      email: this.myForm.value.one?.email ?? '',
      montant_creances: Number(this.myForm.value.two?.montant_creances) ?? 0,
      montant_echeances: Number(this.myForm.value.two?.montant_echeances) ?? 0,
      objet_creances: this.myForm.value.two?.objet_creances ?? '',
      nombre_echeances: Number(this.myForm.value.two?.nombre_echeances) ?? 0,
      note_banque: this.myForm.value.two?.note_banque ?? '',
      justificatif_creances: this.selectedFile
     };
  
    const id = +localStorage.getItem('id')!;
    console.log(userData);
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('justificatif_creances', this.selectedFile, this.selectedFile.name);
    this.ficheImpayeService.registerFicheImpaye(userData, id, formData).subscribe();
    } else {
      this.ficheImpayeService.registerFicheImpaye(userData, id, null).subscribe();
    }
  }
}
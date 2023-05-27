import { Notes } from "./Notes";

export class FicheImpaye {

    nom: string;
    prenom: string;
    cin: string;
    adresse: string;
    tel: string;
    email: string;
    montant_creances: number;
    justificatif_creances: string | null;
    objet_creances: string | null = null;
    montant_echeances: number;
    nombre_echeances: number;
    note_banque: string;
   

    constructor(ficheImpayeData: FicheImpaye) {
      this.nom = ficheImpayeData.nom;
      this.prenom = ficheImpayeData.prenom;
      this.cin = ficheImpayeData.cin;
      this.adresse = ficheImpayeData.adresse;
      this.tel = ficheImpayeData.tel;
      this.email = ficheImpayeData.email;
      this.montant_creances = ficheImpayeData.montant_creances ;
      this.justificatif_creances = ficheImpayeData.justificatif_creances ;
      this.objet_creances = ficheImpayeData.objet_creances ;
      this.montant_echeances = ficheImpayeData.montant_echeances ;
      this.nombre_echeances = ficheImpayeData.nombre_echeances;
      this.note_banque = ficheImpayeData.note_banque;
     
    }

  }
  
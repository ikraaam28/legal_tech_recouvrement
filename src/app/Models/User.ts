export class User {

    email: string;
    password: string;
    nom: string;
    prenom: string;
    adresse: string;
    numero: number;
    mail_charger: string | null = null;
    matricule_fiscale: string | null = null;
    autre_charger: string | null = null;
    id_unique: string | null = null;
    roles: string[] = [];
  
    constructor(userData: User) {
     
      this.email = userData.email;
      this.password = userData.password;
      this.nom = userData.nom;
      this.prenom = userData.prenom;
      this.adresse = userData.adresse;
      this.numero = userData.numero;
      this.mail_charger = userData.mail_charger || null;
      this.matricule_fiscale = userData.matricule_fiscale || null;
      this.autre_charger = userData.autre_charger || null;
      this.id_unique = userData.autre_charger || null;
      this.roles = userData.roles || [];
    }

  }
  
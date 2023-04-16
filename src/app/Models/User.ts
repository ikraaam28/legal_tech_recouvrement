export class User {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    adresse: string;
    num: string;
    emailcharger: string;
    autrecharger: string;
    idunique: number;
    roles: string[];
    createdat: Date;
  
    constructor(
      id: number = 0,
      nom: string = '',
      prenom: string = '',
      email: string = '',
      adresse: string = '',
      num: string = '',
      emailcharger: string = '',
      autrecharger: string = '',
      idunique: number = 0,
      roles: string[] = [],
      createdat: Date = new Date()
    ) {
      this.id = id;
      this.nom = nom;
      this.prenom = prenom;
      this.email = email;
      this.adresse = adresse;
      this.num = num;
      this.emailcharger = emailcharger;
      this.autrecharger = autrecharger;
      this.idunique = idunique;
      this.roles = roles;
      this.createdat = createdat;
    }
  }
  
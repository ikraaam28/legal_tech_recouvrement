import { FicheImpaye } from "./FicheImpaye";
import { Fichiers } from "./Fichiers";
import { User } from "./User";

export class Notes {
    fichiers: Fichiers[];
    ficheImpaye: FicheImpaye | null;
    userId: User | null;
    constructor(note : Notes) {
      this.fichiers = note.fichiers;
      this.ficheImpaye = note.ficheImpaye;
      this.userId = note.userId;
    }
  }
  
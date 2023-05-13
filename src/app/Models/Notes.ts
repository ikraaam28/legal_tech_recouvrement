import { FicheImpaye } from "./FicheImpaye";
import { Fichiers } from "./Fichiers";
import { User } from "./User";

export class Notes {
    ficheImpaye: FicheImpaye | null;
    user: User | null;
    constructor(note : Notes) {
      this.ficheImpaye = note.ficheImpaye;
      this.user = note.user;
    }
  }
  
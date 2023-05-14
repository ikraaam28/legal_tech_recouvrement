import { Notes } from "./Notes";

export class Fichiers {
    commentaire:String;
    enregistrement:Blob;
    fichier:Blob;
    jugement:Blob;
    pv_execution:Blob;
    pv_creance:Blob;
    created_at:Date; 
    updated_at:Date; 

    constructor(fichiersData: Fichiers) {
        this.commentaire = fichiersData.commentaire;
        this.enregistrement = fichiersData.enregistrement;
        this.fichier = fichiersData.fichier;
        this.jugement = fichiersData.jugement;
        this.pv_execution = fichiersData.pv_execution;
        this.pv_creance = fichiersData.pv_creance;
        this.created_at = new Date(fichiersData.created_at);
        this.updated_at = new Date(fichiersData.updated_at);
      }


}

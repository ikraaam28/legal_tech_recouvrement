
export class calendrier {

    type_event: string;
    selectableDate: string;
    remarque: string;
    email: string;
    

    constructor(eventData: calendrier) {
        
        this.type_event= eventData.type_event;
        this.selectableDate= eventData.selectableDate;
        this.remarque= eventData.remarque;
        this.email= eventData.email;
      

    }
}
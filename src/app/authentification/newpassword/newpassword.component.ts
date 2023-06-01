import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PasswordService } from 'src/app/services/password.service';

@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.css']
})
export class NewpasswordComponent {
  token!: string | null;
  password!: string;
  confirmPassword!: string;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private passwordService: PasswordService
  ) {}

  ngOnInit(): void {
    debugger;
    this.route.paramMap.subscribe(params => {
      this.token = params.get('token');
    });
  }

  resetPassword() {
    debugger;
      const token = this.getTokenFromEmailLink();
      
      this.passwordService.resetPassword(token, this.password, this.confirmPassword)
        .then((response: any) => {
          console.log('Password reset successful:', response);
          // Gérer le message de succès ou rediriger vers une autre page
        })
        .catch((error: any) => {
          console.error('Error resetting password:', error);
          // Gérer le message d'erreur
        });
    }
    
  
  
  private getTokenFromEmailLink(): string {
    // Implement the logic to retrieve the token from the email link
    // Récupérer l'URL actuelle
    const currentUrl = window.location.href;
    const emailUrl = 'http://localhost:4200/newpassword/Ida2VRrgaHH5rpo1FoblkLbbZvIvj5nMI5Dm5Lmecwk'; // Replace with the actual email URL

    // Extraire le token de l'URL
    const tokenRegex = /newpassword\/([a-zA-Z0-9]+)/; // Modifiez cette expression régulière selon le format de votre URL
    const matches = currentUrl.match(tokenRegex);

    if (matches && matches.length > 1) {
      const token = matches[1];
      return token;
    }

    // Si aucun token n'est trouvé dans l'URL, retourner une valeur par défaut ou gérer l'erreur selon vos besoins.
    return '';
  }
}

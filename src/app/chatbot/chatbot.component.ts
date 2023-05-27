import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
interface ChatResponse {
  reply: string;
  nextQuestion: string;
}

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  message: string = '';
  reply: string = '';
  finished: boolean = false;
  showChat: boolean = false;
  messages: string[] = [];
  inputMessage: string = '';
  lastQuestion: string | null = null;
  constructor(private http: HttpClient) {}

  toggleChat() {
    if (!this.showChat) {
      // Display "Bonjour" as the first message when chat is opened
      const welcomeMessage = "Bienvenue sur notre plateforme de recouvrement amiable et judiciaire des créances , N'hésitez pas à poser vos questions ou à demander de l'assistance.";
      this.messages.push(welcomeMessage);
    }else{
      this.messages = [];
    }
    this.showChat = !this.showChat;
  }

  sendMessage(message: string) {
    this.messages.push(message);
    this.inputMessage = '';

    this.http.post<ChatResponse>('http://localhost:8000/chat', { message, lastQuestion: this.lastQuestion }).subscribe(
      (response: ChatResponse) => {
        this.messages.push(response.reply);
        this.lastQuestion = response.nextQuestion;
      },
      (error) => {
        console.error('Error occurred while sending message:', error);
      }
    );
  }
  
}

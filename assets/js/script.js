let DateTime= luxon.DateTime;

const { createApp } = Vue

createApp({
   data() {
      return {
         contacts: [
            {
                name: 'Michele',
                avatar: 'assets/img/avatar_1.jpg',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Ricordati di stendere i panni',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        message: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: 'assets/img/avatar_2.jpg',
                visible: true,
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        message: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        message: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: 'assets/img/avatar_3.jpg',
                visible: true,
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        message: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        message: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        message: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Alessandro B.',
                avatar: 'assets/img/avatar_4.jpg',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Alessandro L.',
                avatar: 'assets/img/avatar_5.jpg',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ricordati di chiamare la nonna',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Va bene, stasera la sento',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Claudia',
                avatar: 'assets/img/avatar_6.jpg',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ciao Claudia, hai novità?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Non ancora',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 15:51:00',
                        message: 'Nessuna nuova, buona nuova',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Federico',
                avatar: 'assets/img/avatar_7.jpg',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Fai gli auguri a Martina che è il suo compleanno!',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Grazie per avermelo ricordato, le scrivo subito!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Davide',
                avatar: 'assets/img/avatar_8.jpg',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ciao, andiamo a mangiare la pizza stasera?',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:51:00',
                        message: 'OK!!',
                        status: 'received'
                    }
                ],
            }
        ],
        activeChat: 0,
        activeInputMessage: false,
        inputMessage: "",
        activeInputSearch: false,
        inputSearch: "",
        selectedMessage: -1,
        displayOptions: false,
      }
   },
   watch: {
      // check if input MESSAGE field changes
      inputMessage(newInput) {
        if (newInput != "") {
         this.activeInputMessage = true;
        } else {
         this.activeInputMessage = false;
        }
      },

      // check if input SEARCH field changes
      inputSearch(newInput) {
         if (newInput != "") {
          this.activeInputSearch = true;
         } else {
          this.activeInputSearch = false;
         }
       }
   },
   computed: {
      filteredList() {
        return this.contacts.filter(contact => {
          return contact.name.toLowerCase().includes(this.inputSearch.toLowerCase())
        })
      }
   },
   methods: {
      openChat(i){
         this.activeChat = i;
         this.inputMessage = "";
         this.selectedMessage = -1;
      },
      autoReply(DateTimeSent){
         return this.contacts[this.activeChat].messages.push({date: DateTimeSent, message: "Ok", status: "received"});
      },
      sendMessage(inputMessage){
         const DateTimeSent = DateTime.now().setLocale().toFormat("dd/MM/yyyy HH:mm:ss");

         if (this.inputMessage.split(" ").join("") != "") {
            this.contacts[this.activeChat].messages.push({date: DateTimeSent, message: inputMessage, status: "sent"});

            setTimeout(this.autoReply, 1000, DateTimeSent);
            this.inputMessage = "";
         } 
      },
      convertDate(date){
         return date = DateTime.fromFormat(date, "dd/MM/yyyy HH:mm:ss").toFormat("HH:mm");
      },
      emptyField(){
         this.inputSearch = "";
      },
      hoverOnMessage(i){
         this.selectedMessage = i;
      },
      hoverOutMessage(){
         this.selectedMessage = -1;
         this.displayOptions = false;
      },
      clickedOnMessage(i){
         this.selectedMessage = i;
         this.displayOptions = true;
      },
      deleteMessage(i){
         this.contacts[this.activeChat].messages.splice(i, 1);
      },
      lastMessage(i, length){
         if (length < 1) {
            return "";
         } else {
            return this.contacts[i].messages[length - 1].message;
         }
         
      },
      lastMessageDate(i, length){
         if (length < 1) {
            return "";
         } else {
            let date = this.contacts[i].messages[length - 1].date;
            return date = DateTime.fromFormat(date, "dd/MM/yyyy HH:mm:ss").toFormat("HH:mm");
         }         
      },
      dateMessage(date){
         return date = DateTime.fromFormat(date, "dd/MM/yyyy HH:mm:ss").toFormat("dd/MM/yyyy");
      },
      lastAccess(){
         let length = this.contacts[this.activeChat].messages.length;
         for (let i = length - 1; i >= 0; i--) {
            let status = this.contacts[this.activeChat].messages[i].status;
            if (status == "received") {               
               let date = this.contacts[this.activeChat].messages[i].date;
               return date;
            }            
         }
      },
      lastAccessHour(){
         let date = this.lastAccess();
         return date = DateTime.fromFormat(date, "dd/MM/yyyy HH:mm:ss").toFormat("HH:mm");
      },
      lastAccessDate(){
         let date = this.lastAccess();
         return date = DateTime.fromFormat(date, "dd/MM/yyyy HH:mm:ss").toFormat("dd/MM/yyyy");
      },
   }
}).mount('#app')
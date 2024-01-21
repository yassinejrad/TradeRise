import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  EventEmitter,
  NgIterable,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Cours } from 'src/app/models/cours';
import { Message } from 'src/app/models/message';
import { RendezVous } from 'src/app/models/rendezvous';
import { User } from 'src/app/models/user';
import { CertifService } from 'src/app/services/certif.service';
import { ConversationService } from 'src/app/services/conversation.service';
import { CoursService } from 'src/app/services/cours.service';
import { MessageService } from 'src/app/services/message.service';
import { RendezVousService } from 'src/app/services/rendezvous.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.scss'],
})
export class CoursComponent implements OnInit {
  listcours: any;
  user: any;
  selectedcours: any;
  name: any;
  isicon!: boolean;
  isactive!: boolean;
  certifexist!: boolean;
  isSelected!: boolean;
  conversation: any;
  closeResult = '';
  message: Message = new Message();
  showWarning = false;
  rendezvous: RendezVous = new RendezVous();
  cours: Cours = new Cours();
  listmessage: any;
  listconversation: any;
  chatArray: any;
  status = true;
  newMessage = '';
  contactId!: string;
  messageInfo: Message = new Message();
  userInfo: any;
  public displayName!: boolean;
  contactList = [];
  contactChats = [];
  headerName!: string;
  headerImage: any;
  list!: NgIterable<Message>;
  showChatInProgress = false;
  createInProgress = false;
  certif: any;
  selecteduser: any;
  selectedconv: any;
  contactMaster = this.contactList;
  chatListMaster = [];
  temp = [];
  currentFile?: File;
  listuser: any;
  currentUserid: number = 1; // UID of user 1
  currentUserid2: number = 2;
  clickedUser = ''; // UID of user 2
  chatList!: any;
  displayChat = [];
  chatId = '';
  fileToUpload?: File;
  senderImage = '';
  currentUserImage = '';
  loadContacts = false;
  progress = 0;
  prevMsg = '';
  formImport: FormGroup;
  constructor(
    public usersService: UsersService,
    public certifService: CertifService,
    public coursService: CoursService,
    private conversationService: ConversationService,
    private messageService: MessageService,
    private http: HttpClient,
    private modalService: NgbModal,
    private rendezvousservice: RendezVousService
  ) {
    this.formImport = new FormGroup({
      importFile: new FormControl('', Validators.required),
    });
  }
  @ViewChild('content') content!: ElementRef;
  @Output() closeModalEvent = new EventEmitter<boolean>();

  ngAfterViewInit() {
    this.scrollToBottom();
  }
  ngOnInit(): void {
    this.certifexist = false;
    this.user = this.usersService.getUser(1);
    this.coursService.getAll().subscribe(
      (data) => {
        this.listcours = data;
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
    this.usersService.getAllUsers().subscribe((data) => {
      this.chatList = data;
      console.log(this.chatList);
    });
    this.loadMyChatRoom(2);
  }
  download(filename: string): void {
    this.coursService.getFile(filename).subscribe(
      (data) => {},
      (err) => {
        console.log(err);
      }
    );
  }
  selectFile(event: any): void {
    this.fileToUpload = event.target.files[0];
    console.log(this.fileToUpload);
  }
  uploadFile() {
    if (this.fileToUpload) {
      this.messageService.upload(this.fileToUpload).subscribe(
        (data) => {
          console.log(data);
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      console.error('File is undefined');
    }
  }
  scrollToBottom() {
    try {
      this.content.nativeElement.scrollTop =
        this.content.nativeElement.scrollHeight;
    } catch (err) {
      console.log(err);
    }
  }
  loadMyChatRoom(selectedUser: any) {
    this.chatId = selectedUser.chatRoomId;
    this.clickedUser = selectedUser.uid;
    this.contactId = selectedUser.id;
    this.selecteduser = selectedUser;
    this.list = [];
    this.conversationService
      .getConversationusers(this.currentUserid, selectedUser)
      .subscribe(
        (data) => {
          this.conversation = data;
          this.conversationService
            .getConversationMessages(this.conversation.id)
            .subscribe(
              (data) => {
                this.listmessage = data;
                this.list = this.listmessage;
                console.log('++++++++++++++');
                console.log(this.list);
                console.log(this.conversation);
                console.log('++++++++++++++');
                let messagesArray = Array.from(this.list); // Cast NgIterable<Message> to Message[]
                messagesArray.sort((a, b) => {
                  return (
                    new Date(b.date).getTime() - new Date(a.date).getTime()
                  ); // Order messages by date (newest first)
                });
                this.list = messagesArray;
              },
              (err) => {
                console.log(err);
              }
            );
        },
        (err) => {
          console.log(err);
        }
      );
  }
  startconversation() {
    this.conversationService
      .add(this.currentUserid, this.selecteduser)
      .subscribe(
        (data) => {
          console.log(data);
        },
        (err) => {
          console.log(err);
        }
      );
  }
  sendMessage() {
    if (this.newMessage !== null && this.newMessage !== '') {
      this.messageInfo.text = this.newMessage;
      this.messageInfo.conversation = this.conversation;
      console.log('----------');
      console.log(this.messageInfo);
      console.log(this.conversation);
      this.progress = 0;
      if (this.fileToUpload) {
        this.uploadFile();
        const file: File | null = this.fileToUpload;
        if (file) {
          this.currentFile = file;
          this.messageService
            .addwithfile(
              this.messageInfo,
              this.conversation.id,
              this.currentUserid,
              this.currentFile.name
            )
            .subscribe(
              (data) => {
                console.log(data);
                this.conversation = data;
                this.list = this.conversation.messages;
                let messagesArray = Array.from(this.list); // Cast NgIterable<Message> to Message[]
                messagesArray.sort((a, b) => {
                  return (
                    new Date(b.date).getTime() - new Date(a.date).getTime()
                  ); // Order messages by date (newest first)
                });
                this.list = messagesArray;
              },
              (err) => {
                console.log(err);
              }
            );
        }
      } else {
        this.messageService
          .add(this.messageInfo, this.conversation.id, this.currentUserid)
          .subscribe(
            (data) => {
              console.log(data);
              this.conversation = data;
              this.list = this.conversation.messages;
              let messagesArray = Array.from(this.list); // Cast NgIterable<Message> to Message[]
              messagesArray.sort((a, b) => {
                return new Date(b.date).getTime() - new Date(a.date).getTime(); // Order messages by date (newest first)
              });
              this.list = messagesArray;
            },
            (err) => {
              console.log(err);
            }
          );
      }

      this.conversationService
        .getConversationMessages(this.conversation.id)
        .subscribe(
          (data) => {
            this.listmessage = data;
            this.list = this.listmessage;
            console.log('++++++++++++++');
            console.log(this.list);
            console.log('++++++++++++++');
            let messagesArray = Array.from(this.list); // Cast NgIterable<Message> to Message[]
            messagesArray.sort((a, b) => {
              return new Date(b.date).getTime() - new Date(a.date).getTime(); // Order messages by date (newest first)
            });
            this.list = messagesArray;
          },
          (err) => {
            console.log(err);
          }
        );
      // Add message to box before sending
    } else {
      if (this.fileToUpload) {
        const file: File | null = this.fileToUpload;
        if (file) {
          this.uploadFile();
          this.currentFile = file;
          this.messageService
            .addwithfile(
              this.messageInfo,
              this.conversation.id,
              this.currentUserid,
              this.currentFile.name
            )
            .subscribe(
              (data) => {
                console.log(data);
                this.conversation = data;
                this.list = this.conversation.messages;
                let messagesArray = Array.from(this.list); // Cast NgIterable<Message> to Message[]
                messagesArray.sort((a, b) => {
                  return (
                    new Date(b.date).getTime() - new Date(a.date).getTime()
                  ); // Order messages by date (newest first)
                });
                this.list = messagesArray;
              },
              (err) => {
                console.log(err);
              }
            );
        }
      }
    }
    this.fileToUpload = undefined;
    this.newMessage = '';
  }
  openfile(filepath: string) {
    this.messageService.getFile(filepath).subscribe(
      (data) => {},
      (err) => {
        console.log(err);
      }
    );
  }
  onEnter(value: string) {
    this.newMessage = value;
    this.sendMessage();
  }
  showChat(data: any) {
    if (this.showChatInProgress || this.createInProgress) {
      return;
    }
    this.showChatInProgress = true;
    this.clickedUser = data.uid;
    this.contactId = data.id;
    this.senderImage = data.image;
    const roomName = this.clickedUser;

    this.userInfo = {
      uid: this.currentUserid,
      name: roomName,
      time: Date.now(),
      showMessage: '',
      badge: '',
      showicon: true,
      isicon: false,
      isactive: 'online',
      isSelected: false,
      chatHistory: [],
    };
  }
  openModal(content: any, p: any) {
    this.selectedcours = p;

    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  openModalCertif(content: any, p: any) {
    this.certifexist = false;
    this.selectedcours = p;
    console.log(this.currentUserid + '  ' + this.selectedcours.id);
    this.certifService
      .getAllByUserCours(this.currentUserid, this.selectedcours.id)
      .subscribe(
        (data) => {
          this.certif = data;
          if (this.certif.id > 0) {
            this.certifexist = true;
          }
          console.log(this.certif);
          console.log(this.certifexist);
        },
        (err) => {
          console.log(err);
        }
      );

    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  openModalone(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  GetMyCours() {
    this.coursService.getCoursByUser(2).subscribe(
      (data) => {
        this.listcours = data;
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  GetCours() {
    this.coursService.getAll().subscribe(
      (data) => {
        this.listcours = data;
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  /**
   * Show add/remove function
   *
   * @param event    Overlay click event
   */
  demandecertif() {
    if (this.fileToUpload) {
      this.uploadFile();
      const file: File | null = this.fileToUpload;
      if (file) {
        this.currentFile = file;
        this.certifService
          .createCertif(
            this.currentUserid,
            this.selectedcours.id,
            this.currentFile.name
          )
          .subscribe(
            (data) => {
              console.log(data);
            },
            (err) => {
              console.log(err);
            }
          );
      }

      window.location.reload();
    } else {
      console.log('erreur');
    }
  }

  AjoutCours() {
    if (this.fileToUpload) {
      this.uploadFile();
      const file: File | null = this.fileToUpload;
      if (file) {
        this.currentFile = file;
        this.coursService
          .addwithfile(this.cours, this.currentUserid2, this.currentFile.name)
          .subscribe(
            (data) => {
              console.log(data);
            },
            (err) => {
              console.log(err);
            }
          );
      }
      window.location.reload();
    } else {
      console.log('erreur');
    }
  }

  AjoutRendezVous() {
    const selectedStartTime = new Date(this.rendezvous.datestart).getTime();
    const selectedEndTime = new Date(this.rendezvous.dateend).getTime();

    this.rendezvousservice
      .getRendezVoussForDateAndCourse(
        this.rendezvous.datestart,
        this.rendezvous.dateend,
        this.selectedcours.id
      )
      .subscribe(
        (data) => {
          this.showWarning = data;
          if (this.showWarning == false) {
            this.rendezvousservice
              .createRendezVous(
                this.rendezvous,
                this.currentUserid,
                this.selectedcours.id
              )
              .subscribe(
                (data) => {
                  console.log(data);
                },
                (err) => {
                  console.log(err);
                }
              );
            window.location.reload();
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RendezVousService } from 'src/app/services/rendezvous.service';

FullCalendarModule.registerPlugins([
  // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
]);

@Component({
  selector: 'app-rendez-vous',
  templateUrl: './rendez-vous.component.html',
  styleUrls: ['./rendez-vous.component.scss'],
})
export class RendezVousComponent implements OnInit {
  @ViewChild('contentrendezvous') contentrendezvous: any;
  eventDetails: any;
  selectedrdv: any;
  closeResult = '';
  etat: any;
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    events: [],
    eventClick: this.handleEventClick.bind(this),
  };

  constructor(
    private rendezVousService: RendezVousService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.rendezVousService.getAll().subscribe((rendezvous: any[]) => {
      this.calendarOptions.events = rendezvous.map((r) => ({
        id: r.id,
        title: r.title,
        etat: r.etat,
        start: new Date(r.datestart),
        end: new Date(r.dateend),
      }));
    });
  }

  handleEventClick(arg: any) {
    // arg.event will contain the clicked event information
    console.log(arg);
    this.rendezVousService.getById(arg.event.id).subscribe(
      (data) => {
        this.selectedrdv = data;
        console.log(data);
        console.log('rendez vousss :' + this.selectedrdv);
      },
      (err) => {
        console.log(err);
      }
    );
    const eventId = arg.event.id;
    // Open the modal and pass the event details
    const modalRef = this.modalService.open(this.contentrendezvous, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
    });
    modalRef.componentInstance.eventDetails = {};
  }
  acceptRendezVous() {
    if (this.selectedrdv) {
      this.etat = 'accepted';
      this.updateRendezVousEtat();
    }
  }

  refuseRendezVous() {
    if (this.selectedrdv) {
      this.etat = 'refused';
      this.updateRendezVousEtat();
    }
  }

  updateRendezVousEtat() {
    if (this.selectedrdv) {
      this.rendezVousService
        .updateRendezVous(this.selectedrdv.id, this.etat)
        .subscribe(
          (response) => {
            console.log('Rendez-vous updated successfully:', response);
            window.location.reload();
          },
          (error) => {
            console.error('Error updating rendez-vous:', error);
          }
        );
    }
  }
}

import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import {
  PerfectScrollbarComponent,
  PerfectScrollbarConfigInterface,
  PerfectScrollbarDirective,
} from 'ngx-perfect-scrollbar';
import { CertifService } from 'src/app/services/certif.service';
@Component({
  selector: 'app-certif',
  templateUrl: './certif.component.html',
  styleUrls: ['./certif.component.scss'],
})
export class CertifComponent implements OnInit {
  listcertif: any;
  closeResult = '';
  columns: any = [];
  rows: any[] = [];
  tab: any[] = [0, 1, 2, 3, 4, 5, 6];
  placement = 'bottom-right';
  public currentUser: any;
  contactFlag: boolean;
  imagepathdefault: any;
  value: any;
  loadingIndicator: true;
  selected = [];
  temp = [];
  temp2 = this.rows;
  public config: PerfectScrollbarConfigInterface = {};

  @ViewChild(PerfectScrollbarComponent)
  componentRef?: PerfectScrollbarComponent;
  @ViewChild(PerfectScrollbarDirective)
  directiveRef?: PerfectScrollbarDirective;

  @Output() closeModalEvent = new EventEmitter<boolean>();
  @ViewChild(DatatableComponent, { static: true }) table: DatatableComponent;
  selectedcertif: any;

  /**
   * Constructor
   *
   * @param Renderer2  _renderer
   */
  constructor(
    private modalService: NgbModal,
    private _renderer: Renderer2,
    private certifService: CertifService
  ) {}

  ngOnInit(): void {
    this.certifService.getAll().subscribe(
      (data) => {
        this.listcertif = data;
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  accorder() {
    this.certifService.accordCertif(this.selectedcertif.id).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
    window.location.reload();
  }

  refuser() {
    this.certifService.refusCertif(this.selectedcertif.id).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
    window.location.reload();
  }
  openModal(content: any, p: any) {
    this.selectedcertif = p;
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
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}

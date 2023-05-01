import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/interfaces/hotel';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss'],
})
export class HotelComponent  implements OnInit {
  private hoteles : Hotel[] = []

  constructor(private hotelService: HotelService) { }

  ngOnInit() {
    this.hoteles = this.hotelService.hoteles;
    console.log(this.hoteles)
  }

}

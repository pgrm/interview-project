import { Component, OnInit } from '@angular/core';
import { BookingsService, IBooking } from '../../services/bookings.service';

@Component({
	selector: 'home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	private bookings: IBooking[] = [];
	private sortCol: string;
	private sortDesc: boolean = true;

	constructor(
		private bookingsService: BookingsService
	) {}

	ngOnInit() {
		this.bookings = this.bookingsService.getAll();
		this.sort('id');
	}

	public sort(col): void {
		if (this.sortCol === col) {
			this.sortDesc = !this.sortDesc;
			this.bookings.reverse();
		} else {
			this.sortDesc = true;
			this.sortCol = col;
			switch (col) {
				case 'id':
					this.bookings.sort((a, b) => a.id < b.id ? -1 : 1);
					break;
				case 'name':
					this.bookings.sort((a, b) => a.booker.lastName < b.booker.lastName ? -1 : 1);
					break;
				case 'email':
					this.bookings.sort((a, b) => a.booker.email < b.booker.email ? -1 : 1);
					break;
				case 'location':
					this.bookings.sort((a, b) => {
						if (!a.booker.address) {
							return -1;
						} else if (!b.booker.address) {
							return 1;
						} else {
							return a.booker.address.city < b.booker.address.city ? -1 : 1;
						}
					});
			}
		}
	}

}

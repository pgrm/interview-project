import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BookingsService, IBooking } from '../../services/bookings.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'booking-form',
	templateUrl: './booking-form.component.html',
	styleUrls: ['./booking-form.component.scss']
})
export class BookingFormComponent implements OnInit {
	private booking: IBooking;
	private id: string;
	private form: FormGroup;

	constructor(
		private bookingsService: BookingsService,
		private router: Router,
		private route: ActivatedRoute,
		private fb: FormBuilder
	) {}

	ngOnInit() {
		this.id = this.route.snapshot.params.booking;
		this.booking = this.bookingsService.getById(this.id);

		if (this.booking) {
			this.form = this.fb.group({
				firstName: 		[this.booking.booker.firstName, Validators.required],
				middleInitial: 	[this.booking.booker.middleInitial],
				lastName: 		[this.booking.booker.lastName, Validators.required],
				email: 			[this.booking.booker.email, Validators.required]
			});
		}
	}

	public saveForm(): void {
		if (this.form.status !== 'INVALID') {
			this.bookingsService.updateBooker(this.id, this.form.value);
		}
		this.router.navigate(['/']);
	}

	public deleteBooking(): void {
		this.bookingsService.deleteBooking(this.id);
	}
}

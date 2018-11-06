import { Injectable } from '@angular/core';
import * as bookingsData from './bookings.js';

interface ICompany {
	name: string;
}

interface IAddress {
	addressLine1: string;
	postalCode: string;
	city: string;
	addressLine2?: string;
	countryCode?: string;
}

interface IBooker {
	firstName: string;
	lastName: string;
	email: string;
	middleInitial?: string;
	phone?: string;
	address?: IAddress;
	nationalityCountryCode?: string;
}

interface IAccount {
	accountNumber: string;
	accountHolder: string;
	expiryMonth: string;
	expiryYear: string;
	paymentMethod: string;
	payerEmail: string;
	isVirtual: boolean;
	isActive: boolean;
}

export interface IBooking {
	id: string;
	booker: IBooker;
	paymentAccount?: IAccount;
	company?: ICompany;
	comment?: string;
}

@Injectable({
	providedIn: 'root'
})
export class BookingsService {
	private bookings: IBooking[] = bookingsData.default.bookings;

	constructor() {
	}

	public getAll(): IBooking[] {
		return this.bookings;
	}

	public getById(id: string): IBooking {
		return this.bookings.find(b => b.id === id);
	}

	public updateBooker(id: string, values: object): void {
		let booker = this.bookings.find(b => b.id === id).booker;
		for (let v in values) {
			booker[v] = values[v];
		}

	}

	public deleteBooking(id: string): void {
		delete this.bookings[
			this.bookings.findIndex(b => b.id === id)
		];
	}
}

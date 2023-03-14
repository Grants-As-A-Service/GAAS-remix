import type { Response, Request, NextFunction } from "express";

declare global {
	type HTTPSTATUS<T> = [T, number];

	type UserType = "government" | "buisness";

	type User = {
		name: string;
		email: string;
		phone: string;
	};

	type Business = {
		name: string;
		phone: string;
		address: string;
		city: string;
		province: string;
		postalCode: string;
		industry: string;
		fte: number;
		pte: number;
		annualRevenue: number;
		yearOfInception: Date;
		projects: string[];
	};

	type AccountInfo = {
		user: User;
		buisness: Business;
	};

	type ChildProps = { children: React.ReactNode };

	type Tag = {
		name: string;
		strength: number;
		description: string;
		quantifier: number;
	};

	type Project = {
		name: string;
		description: string;
		startDate: Date;
		endDate: Date;
		capex: number;
		annualOpex: number;
		tags: Tag[];
		status: string;
	};

	interface ProjectADT extends Project {
		[key: string]: string | number | Tag[] | Date;
	}

	interface UserADT extends User {
		[key: string]: string;
	}

	interface BusinessADT extends Business {
		[key: string]: string | number | string[] | Date;
	}

	interface AccountInfoADT extends AccountInfo {
		[key: string]: UserADT | BusinessADT | Date;
	}

	type Grant = {
		title: string;
		description: string;
		creator: string;
		tags: Array<string>;
		createdAt: Date;
	};

	type TagName = {
		name: string;
	};

	type ExpressResponse = Response;
	type ExpressRequest = Request;

	type ExpressHandler = (request: ExpressRequest, response: ExpressResponse, next: NextFunction) => void;
}

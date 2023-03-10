import type { Response, Request, NextFunction } from "express";

declare global {
	type HTTPSTATUS<T> = [T, number];

	type UserType = "government" | "buisness";

	type Account = {
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

	type ChildProps = { children: React.ReactNode };

	type Government = {
		name: string;
		level: string;
		govDetails: string;
		annualFundingBudget: number;
		fundedProjects: number;
	};

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

	interface UserADT extends Account {
		[key: string]: string;
	}

	interface BusinessADT extends Business {
		[key: string]: string | number | string[] | Date;
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
}

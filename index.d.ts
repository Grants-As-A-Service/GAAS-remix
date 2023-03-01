import type { Response, Request, NextFunction } from "express";

declare global {
    type HTTPSTATUS<T> = { status: number; data: T };

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
        yearOfInception: number;
        projects: string[];
    };

    type AccountInfo = {
        user: UserADT;
        business: BusinessADT;
    };

    type ChildProps = { children: React.ReactNode };

    type ImpactTag = {
        name: string;
        strength: number;
        description: string;
        quantifier: number;
    };

    type Project = {
        name: string;
        description: string;
        startDate: string;
        endDate: string;
        capex: number;
        annualOpex: number;
        tags: ImpactTag[];
        status: string;
    };

    interface ProjectADT extends Project {
        [key: string]: string | number | ImpactTag[];
    }

    interface UserADT extends User {
        [key: string]: string;
    }

    interface BusinessADT extends Business {
        [key: string]: string | number | string[];
    }

    interface AccountInfoADT extends AccountInfo {
        [key: string]: UserADT | BusinessADT;
    }

    type Grant = {
        title: string;
        description: string;
        creator: string;
        tags: Array<string>;
        createdAt: Date;
    };

    type ExpressResponse = Response;
    type ExpressRequest = Request;

    type ExpressHandler = (request: ExpressRequest, response: ExpressResponse, next: NextFunction) => void;
}

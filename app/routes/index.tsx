import { Link } from "@remix-run/react";
import { useAuthState } from "components/useAuthState";

export default function RootLayout() {
    useAuthState();

    return (
        <div className="from-primary to-secondary text-primary-content grid place-items-center items-start bg-gradient-to-br flex-1">
            <div className="hero-content col-start-1 row-start-1 w-full max-w-7xl flex-col justify-between gap-10 pb-40 lg:flex-row lg:items-end lg:gap-0 xl:gap-20">
                <div className="lg:pl-10 lg:pb-24">
                    <div className="mb-2 py-4 text-center lg:py-10 lg:text-left">
                        <h1 className="font-title mb-2 text-4xl font-extrabold sm:text-5xl lg:text-6xl">Welcome to GAAS- Grants as a Service</h1>
                        <h2 className="font-title text-lg font-extrabold sm:text-xl lg:text-2xl">Getting Started</h2>
                    </div>
                    <div className="flex flex-row gap-10">
                        <Link to="/login" className="btn btn-lg btn-secondary">
                            Login
                        </Link>
                        <Link to="/register" className="btn btn-lg">
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}



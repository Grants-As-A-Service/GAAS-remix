import { createCookie, LoaderArgs, redirect, Request } from "@remix-run/node";
import { auth } from "../../../../cookies";

export async function action({ request }: { request: Request }) {
    let { token } = await request.json();

    return new Response(null, {
        headers: {
            "Set-Cookie": await auth.serialize(token),
        },
    });
}

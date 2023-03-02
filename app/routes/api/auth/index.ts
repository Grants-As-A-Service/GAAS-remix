import { createCookie, LoaderArgs, redirect, Request } from "@remix-run/node";
import { auth } from "../../../../cookies";

export async function action({ request }: { request: Request }) {
    let { token } = await request.json();

    console.log(token, "next", await auth.serialize(token));

    return new Response(null, {
        headers: {
            "Set-Cookie": await auth.serialize(token),
        },
    });
}

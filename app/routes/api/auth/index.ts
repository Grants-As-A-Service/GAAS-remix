import { createCookie, LoaderArgs, redirect, Request } from "@remix-run/node";

export async function action({ request }: { request: Request }) {
    let { token } = await request.json();
    console.log(token);
    return new Response(null, {
        headers: {
            "Set-Cookie": await createCookie("auth").serialize(token),
        },
    });
}

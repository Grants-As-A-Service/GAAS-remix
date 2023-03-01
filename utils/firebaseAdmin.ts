import admin from "firebase-admin";

const { privateKey } = JSON.parse(process.env.private_key as string);

const adminApp = admin.initializeApp({
    credential: admin.credential.cert({
        clientEmail: process.env.client_email,
        privateKey,
        projectId: process.env.project_id,
    }),
});

export const verifyToken = (token: string) => {
    return new Promise<string>((resolve, reject) => {
        adminApp
            .auth()
            .verifyIdToken(token, true)
            .then((user) => resolve(user.email as string))
            .catch(reject);
    });
};

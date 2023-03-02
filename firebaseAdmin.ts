import admin, { ServiceAccount } from "firebase-admin";

const { privateKey } = JSON.parse(process.env.private_key as string);

const adminApp = admin.initializeApp({
    credential: admin.credential.cert({
        type: process.env.type,
        private_key_id: process.env.private_key_id,
        client_email: process.env.client_email,
        private_key: privateKey,
        project_id: process.env.project_id,
        client_id: process.env.client_id,
        auth_uri: process.env.auth_uri,
        token_uri: process.env.token_uri,
        auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
        client_x509_cert_url: process.env.client_x509_cert_url,
    } as ServiceAccount),
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

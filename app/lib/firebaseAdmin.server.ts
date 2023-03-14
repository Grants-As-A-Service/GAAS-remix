import admin, { ServiceAccount } from "firebase-admin";

const { privateKey } = JSON.parse(process.env.private_key as string);

export const init = (name: string) => {
	return admin.initializeApp(
		{
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
		},
		name
	);
};

export const setType = (app: admin.app.App, userId: string, userType: UserType) => {
	return new Promise<void>((resolve, reject) => {
		console.log("setting type");
		app.auth().setCustomUserClaims(userId, { userType }).then(resolve).catch(reject);
	});
};

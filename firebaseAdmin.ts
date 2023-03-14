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

export const verifyToken = (app: admin.app.App, token: string) => {
	return new Promise<{ email: string; userType: UserType }>((resolve, reject) => {
		app.auth()
			.verifyIdToken(token, true)
			.then((user) => {
				resolve({
					email: user.email as string,
					userType: user.userType,
				});
			})
			.catch(reject);
	});
};


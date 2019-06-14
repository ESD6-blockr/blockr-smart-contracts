import * as request from "request-promise-native";

export async function getContract(): Promise<any> {
    try {
        const baseUrl = 'http://localhost:3000';
        const queryString = '/ptsmock/transaction';
        let options = {
            uri: baseUrl + queryString,
        };

        const result = await request.get(options);
        return new Promise<any>(resolve => {
            resolve(result)
        });
    } catch (e) {
        console.log(e)
    }
}



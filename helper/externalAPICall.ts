import { callAPI } from '../lib/external-requests';

export class ExternalAPI {
    async externalAPICall() {
        return await callAPI({
            method: 'GET',
            url: `${process.env.CAMPAIGN_BASE_URL}`
        });
    };
}
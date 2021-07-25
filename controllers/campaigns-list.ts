import { Request, Response } from 'express';
// import { INTERNAL_SERVER_ERROR, OK } from 'http-status-codes';
import APIResponse from '../helper/response';
import Campaigns from '../service/campaign-service';

export const allCampaigns = async (_req: Request, res: Response) => {
    try {
        const report = await Campaigns.allCampaigns();
        return APIResponse.setSuccess(200, { message: report }).send(res);
    } catch (error) {
        console.log('get campaign error', error);
        return APIResponse.setError(500, 'Internal server error').send(res);
    }
}


export const activeCampaigns = async (_req: Request, res: Response) => {
    try {
        const report = await Campaigns.activeCampaigns();
        return APIResponse.setSuccess(200, { message: report }).send(res);
    } catch (error) {
        console.log('get campaign error', error);
        return APIResponse.setError(500, 'Internal server error').send(res);
    }
}

export const closedCampaigns = async (_req: Request, res: Response) => {
    try {
        const report = await Campaigns.closedCampaigns();
        return APIResponse.setSuccess(200, { message: report }).send(res);
    } catch (error) {
        console.log('get campaign error', error);
        return APIResponse.setError(500, 'Internal server error').send(res);
    }
}
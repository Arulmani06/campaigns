
import { ExternalAPI } from '../helper/externalAPICall';
const externalAPI = new ExternalAPI();
import moment from 'moment';

class Campaigns {
    constructor () {}

    // get list of campaigns with totalAmount in descending order
    async allCampaigns () {
        try {
            const campaignAPICall: any = await externalAPI.externalAPICall();
            const campaignDetails = JSON.parse(campaignAPICall);
            const descendingTotalamount = [];

            for(let i=0; i<=campaignDetails.length-1; i++){
                let obj : any = {};
                obj["Title"] =  campaignDetails[i].Title ? campaignDetails[i].Title : '';
                obj["totalAmount"] =  campaignDetails[i].totalAmount ? campaignDetails[i].totalAmount : 0;
                obj["backersCount"] =  campaignDetails[i].backersCount ? campaignDetails[i].backersCount : 0;
                obj["endDate"] =  campaignDetails[i].endDate ? campaignDetails[i].endDate : '';

                descendingTotalamount.push(obj);
            };
            descendingTotalamount.sort((a:any, b:any) => (b.totalAmount) - (a.totalAmount));
            return descendingTotalamount;
        } catch (error) {
            console.log(error, 'Error');
            throw error;
        }
    }

    //get all activeCampaigns with endDate greater than today
    async activeCampaigns () {
        try {
            const campaignAPICall: any = await externalAPI.externalAPICall();
            const campaignDetails = JSON.parse(campaignAPICall);
            
            const activeCampaigns = [];
            //from today before one month's startDate
            const startDate = moment()
            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
            .subtract(1, 'month')
            .utcOffset('+05:30')
            .toISOString();

            // today's starting time and today's date
            const today = moment()
            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
            .utcOffset('+05:30')
            .toISOString();

            for(let i=0; i<=campaignDetails.length-1; i++){
                if (campaignDetails[i].endDate >= today && startDate <= campaignDetails[i].created ){
                    activeCampaigns.push(campaignDetails[i]);
                }
            };
            return activeCampaigns;
        } catch (error) {
            console.log(error, 'Error');
            throw error;
        }
    }

    //get all closedCampaigns with procured amount greater than or equal to tatalAmount OR endDate less than today
    async closedCampaigns () {
        try {
            const campaignAPICall: any = await externalAPI.externalAPICall();
            const campaignDetails = JSON.parse(campaignAPICall);
            
            const closedCampaigns = [];
            // today's starting time and today's date
            const today = moment()
            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
            .utcOffset('+05:30')
            .toISOString();

            for(let i=0; i<=campaignDetails.length-1; i++){
                if (campaignDetails[i].endDate < today || campaignDetails[i].procuredAmount >= campaignDetails[i].totalAmount){
                    closedCampaigns.push(campaignDetails[i]);
                }
            };
            return closedCampaigns;
        } catch (error) {
            console.log(error, 'Error');
            throw error;
        }
    }
}

export default new Campaigns();
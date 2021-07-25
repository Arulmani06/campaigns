import { Router } from 'express';
import { allCampaigns, activeCampaigns,  closedCampaigns} from './controllers/campaigns-list';

const api = Router();

api.get('/all', allCampaigns);
api.get('/active', activeCampaigns);
api.get('/closed', closedCampaigns);

export { api }
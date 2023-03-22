import Api from '../config/axios';
import config from '../config/config';

export const addProposal = async (data: any) => {
  const url = config.apiUrl + '/campaign/';

  try {
    return await Api.post(url, data);
  } catch (error) {
    throw new Error('An error occured');
  }
};

export default {
  addProposal,
};

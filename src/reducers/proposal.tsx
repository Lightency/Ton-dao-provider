import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import CampaignService from '../services/CampaignService';

export const AddProposalFunction = createAsyncThunk(
  'proposal/add',
  async (campaignData: any, thunkAPI: any) => {
    try {
      const { status, data } = await CampaignService.addProposal(campaignData);
      if (status === 201 || status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e: any) {
      console.log('Error', e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

const initialState = {
  addProposal: {
    status: 'idle',
    data: null,
    error: {},
  },
};
const ProposalSlice = createSlice({
  name: 'campaign',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [AddProposalFunction.pending.type]: (state: any) => {
      state.addProposal = {
        status: 'loading',
        data: null,
        error: {},
      };
    },
    [AddProposalFunction.fulfilled.type]: (state: any, action: any) => {
      state.addProposal = {
        status: 'success',
        data: action.payload,
        error: {},
      };
    },
    [AddProposalFunction.rejected.type]: (state: any, action: any) => {
      state.addProposal = {
        status: 'failed',
        data: action.payload,
        error: {},
      };
    },
  },
});

export default ProposalSlice.reducer;

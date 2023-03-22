import proposal from '../reducers/proposal';
import { configureStore } from '@reduxjs/toolkit';

export default configureStore({
  reducer: {
    Proposal: proposal,
  },
});

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { JobsFetchData } from '../../interface';

export interface JobBoardState {
  jobs: JobsFetchData[];
}

const initialState: JobBoardState = {
  jobs: [],
};

export const jobBoardSlice = createSlice({
  initialState,
  name: 'jobBoard',
  reducers: {
    setJobs: (state, action: PayloadAction<JobBoardState>) => {
      state.jobs = action.payload.jobs;
    },
  },
});

export const { setJobs } = jobBoardSlice.actions;
export default jobBoardSlice.reducer;

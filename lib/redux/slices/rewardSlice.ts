import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RewardConfig } from "@/lib/types";
import { INITIAL_REWARD_CONFIG } from "@/lib/mock-data";

interface RewardState {
  rewardConfig: RewardConfig;
}

const initialState: RewardState = {
  rewardConfig: INITIAL_REWARD_CONFIG,
};

export const rewardSlice = createSlice({
  name: "reward",
  initialState,
  reducers: {
    setRewardConfig: (state, action: PayloadAction<RewardConfig>) => {
      state.rewardConfig = action.payload;
    },
    updateRewardsConfigInState: (
      state,
      action: PayloadAction<Partial<RewardConfig>>
    ) => {
      state.rewardConfig = {
        ...state.rewardConfig,
        ...action.payload,
        tierThresholds: {
          ...state.rewardConfig.tierThresholds,
          ...(action.payload.tierThresholds || {}),
        },
      };
    },
  },
});

export const { setRewardConfig, updateRewardsConfigInState } = rewardSlice.actions;

export default rewardSlice.reducer;

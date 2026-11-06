import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserRole } from "@/lib/types";
import { INITIAL_USERS } from "@/lib/mock-data";

interface AuthState {
  currentUser: User;
  users: User[];
}

const initialState: AuthState = {
  currentUser: INITIAL_USERS[0],
  users: INITIAL_USERS,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    addUser: (state, action: PayloadAction<User>) => {
      const existsIndex = state.users.findIndex((u) => u.id === action.payload.id || u.email === action.payload.email);
      if (existsIndex === -1) {
        state.users.push(action.payload);
      } else {
        state.users[existsIndex] = action.payload;
      }
    },
    updateUserRoleInState: (
      state,
      action: PayloadAction<{ userId: string; role: UserRole }>
    ) => {
      const user = state.users.find((u) => u.id === action.payload.userId);
      if (user) {
        user.role = action.payload.role;
      }
      if (state.currentUser.id === action.payload.userId) {
        state.currentUser.role = action.payload.role;
      }
    },
    toggleUserStatusInState: (state, action: PayloadAction<string>) => {
      const user = state.users.find((u) => u.id === action.payload);
      if (user) {
        user.status = user.status === "Active" ? "Suspended" : "Active";
      }
      if (state.currentUser.id === action.payload) {
        state.currentUser.status =
          state.currentUser.status === "Active" ? "Suspended" : "Active";
      }
    },
    updateUserPermissionsInState: (
      state,
      action: PayloadAction<{ userId: string; permissions: string[] }>
    ) => {
      const user = state.users.find((u) => u.id === action.payload.userId);
      if (user) {
        user.permissions = action.payload.permissions;
      }
      if (state.currentUser.id === action.payload.userId) {
        state.currentUser.permissions = action.payload.permissions;
      }
    },
    updateUserRewardPointsInState: (
      state,
      action: PayloadAction<{ userId: string; pointsDelta: number }>
    ) => {
      const user = state.users.find((u) => u.id === action.payload.userId);
      if (user) {
        user.rewardPoints = Math.max(0, (user.rewardPoints || 0) + action.payload.pointsDelta);
      }
      if (state.currentUser.id === action.payload.userId) {
        state.currentUser.rewardPoints = Math.max(
          0,
          (state.currentUser.rewardPoints || 0) + action.payload.pointsDelta
        );
      }
    },
    linkSalonToOwnerInState: (
      state,
      action: PayloadAction<{ ownerId: string; salonId: string }>
    ) => {
      const user = state.users.find((u) => u.id === action.payload.ownerId);
      if (user) {
        user.salonIds = Array.from(new Set([...(user.salonIds || []), action.payload.salonId]));
      }
      if (state.currentUser.id === action.payload.ownerId) {
        state.currentUser.salonIds = Array.from(
          new Set([...(state.currentUser.salonIds || []), action.payload.salonId])
        );
      }
    },
  },
});

export const {
  setCurrentUser,
  setUsers,
  addUser,
  updateUserRoleInState,
  toggleUserStatusInState,
  updateUserPermissionsInState,
  updateUserRewardPointsInState,
  linkSalonToOwnerInState,
} = authSlice.actions;

export default authSlice.reducer;

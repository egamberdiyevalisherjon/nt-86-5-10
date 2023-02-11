import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: {
    name: null,
    inCharge: null,
    phone: null,
    address: {
      city: null,
      region: null,
      full: null,
    },
  },
};

const marketSlice = createSlice({
  name: "market",
  initialState,
  reducers: {
    updateMarketInfo(
      state,
      {
        payload: {
          name,
          inCharge,
          phone,
          address: { city, region, full },
        },
      }
    ) {
      state.info = { name, inCharge, phone, address: { city, region, full } };
    },
  },
});

export const { updateMarketInfo } = marketSlice.actions;

export default marketSlice.reducer;

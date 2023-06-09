import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  cms: {
    home: null,
    about: null,
    buyAbusiness: null,
    sellYourBusiness: null,
    faqs: [],
    services: null,
    contactUs: null,
    careers: null,
    footer: null,
  }
};

const commonSlice = createSlice({
  name: "commonReducer",
  initialState,
  reducers: {
    setAllCategories: (state, action) => {
      state.categories = action.payload.data;
    },
    setAllCmsData: (state, action) => {
      state.cms = {
        home: action.payload.home,
        about: action.payload.about,
        buyAbusiness: action.payload.buyAbusiness,
        sellYourBusiness: action.payload.sellYourBusiness,
        faqs: action.payload?.faqs,
        services: action.payload.services,
        contactUs: action.payload.contactUs,
        careers: action.payload.careers,
        footer: action.payload.footer,
      };
    },
  },
});

export const { setAllCategories, setAllCmsData } = commonSlice.actions;

export default commonSlice.reducer;

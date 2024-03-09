import { createSlice } from "@reduxjs/toolkit";
import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      login: builder.mutation({
        query: (data) => {
          return {
            url: `${USERS_URL}/auth`,
            method: "POST",
            body: data,
          };
        },
      }),
    };
  },
});

const { useLoginMutation } = usersApiSlice;

import { createSlice } from "@reduxjs/toolkit";
import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      login: builder.mutation({
        query: (data) => {
          return {
            url: `${USERS_URL}/login`,
            method: "POST",
            body: data,
          };
        },
      }),
      register: builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}`,
          method: "POST",
          body: data,
        }),
      }),
      logout: builder.mutation({
        query: () => {
          return {
            url: `${USERS_URL}/logout`,
            method: "POST",
          };
        },
      }),
      profile: builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}/profile`,
          method: "PUT",
          body: data,
        }),
      }),
      getUsers: builder.query({
        query: () => ({
          url: USERS_URL,
        }),
        providesTags: ["Users"],
        keepUnusedDataFor: 5,
      }),
      deleteUser: builder.mutation({
        query: (id) => ({
          url: `${USERS_URL}/${id}`,
          method: "DELETE",
        }),
      }),
    };
  },
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
} = usersApiSlice;

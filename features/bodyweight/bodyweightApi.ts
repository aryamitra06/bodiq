import { account, databases } from "@/lib/appwrite";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { ID, Permission, Query, Role } from "react-native-appwrite";

const DATABASE_ID = "6901bf840022f094fab0";
const COLLECTION_ID = "bodyweight";

export const bodyweightApi = createApi({
  reducerPath: "bodyweightApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["BodyWeight"],
  endpoints: (builder) => ({
    // ✅ Fetch all weights for current user
    getWeights: builder.query<any[], string>({
      async queryFn(userId) {
        try {
          const response = await databases.listDocuments(
            DATABASE_ID,
            COLLECTION_ID,
            [Query.equal("userid", userId)]
          );

          const data = response.documents.map((doc) => ({
            id: doc.$id,
            bodyweight: doc.measured_bodyweight,
            userid: doc.userid,
          }));

          return { data };
        } catch (error: any) {
          return { error: { message: error.message } };
        }
      },
      providesTags: ["BodyWeight"],
    }),

    // ✅ Add new weight
    addWeight: builder.mutation({
      async queryFn(body: { weight: string; date: string; userId: string }) {
        try {
          const response = await databases.createDocument(
            DATABASE_ID,
            COLLECTION_ID,
            ID.unique(),
            {
              bodyweight: body.weight,
              measurement_date: body.date,
              userid: body.userId,
            },
            [
              Permission.read(Role.user(body.userId)),
              Permission.update(Role.user(body.userId)),
              Permission.delete(Role.user(body.userId)),
            ]
          );

          return { data: response };
        } catch (error: any) {
          return { error: { message: error.message } };
        }
      },
      invalidatesTags: ["BodyWeight"],
    }),

    // ✅ Delete weight entry
    deleteWeight: builder.mutation({
      async queryFn(id: string) {
        try {
          await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
          return { data: { success: true } };
        } catch (error: any) {
          return { error: { message: error.message } };
        }
      },
      invalidatesTags: ["BodyWeight"],
    }),
  }),
});

export const {
  useGetWeightsQuery,
  useAddWeightMutation,
  useDeleteWeightMutation,
} = bodyweightApi;

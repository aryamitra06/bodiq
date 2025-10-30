import { account, databases } from "@/lib/appwrite";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { ID, Permission, Query, Role } from "react-native-appwrite";

const DATABASE_ID = "6901bf840022f094fab0";
const COLLECTION_ID = "goals";

export const goalsApi = createApi({
  reducerPath: "goalsApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Goals"],
  endpoints: (builder) => ({
    // ✅ Fetch all goals for current user
    getGoals: builder.query<any[], string>({
      async queryFn(userId) {
        try {
          const response = await databases.listDocuments(
            DATABASE_ID,
            COLLECTION_ID,
            [Query.equal("userid", userId)]
          );

          const data = response.documents.map((doc) => ({
            id: doc.$id,
            goal_type: doc.goal_type,
            target: doc.target,
            deadline: doc.deadline,
            userid: doc.userid,
          }));

          return { data };
        } catch (error: any) {
          return { error: { message: error.message } };
        }
      },
      providesTags: ["Goals"],
    }),

    // ✅ Add new goal
    addGoal: builder.mutation({
      async queryFn(body: { goal_type: string; target: string; deadline: string; userId: string }) {
        try {
          const response = await databases.createDocument(
            DATABASE_ID,
            COLLECTION_ID,
            ID.unique(),
            {
              goal_type: body.goal_type,
              target: body.target,
              deadline: body.deadline, // datetime
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
      invalidatesTags: ["Goals"],
    }),

    // ✅ Delete goal
    deleteGoal: builder.mutation({
      async queryFn(id: string) {
        try {
          await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
          return { data: { success: true } };
        } catch (error: any) {
          return { error: { message: error.message } };
        }
      },
      invalidatesTags: ["Goals"],
    }),
  }),
});

export const { useGetGoalsQuery, useAddGoalMutation, useDeleteGoalMutation } = goalsApi;
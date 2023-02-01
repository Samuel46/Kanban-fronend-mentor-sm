import { apiSlice } from "@redux/api/apiSlice";

type Column = {
	name: string;
	_id?: string;
};

type Board = {
	name: string;
	columns: Column[];
	_id?: string;
	createdAt: number;
	data: Board[];
};

export const boardApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getBoards: builder.query<Board[], void>({
			query: () => ({
				url: "/get-boards",
				validateStatus(response, result) {
					return response.status === 200 && !result.isError;
				},
			}),
			transformResponse: (responseData: Board[]) => {
				return responseData.map((board) => {
					return {
						...board,
						id: board._id,
					};
				});
			},
			providesTags: () => {
				return [{ type: "Board", id: "LIST" }];
			},
		}),

		createBoard: builder.mutation<Board, Board>({
			query: ({ name, columns }) => ({
				url: "/create-board",
				method: "POST",
				body: { name, columns },
			}),
			transformResponse: (responseData: Board) => {
				return {
					...responseData,
					id: responseData._id,
				};
			},
			invalidatesTags: () => {
				return [{ type: "Board", id: "LIST" }];
			},
		}),
	}),
});

export const { useGetBoardsQuery, useCreateBoardMutation } = boardApiSlice;

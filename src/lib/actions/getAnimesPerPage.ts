// Imports the Anime, PageInfo and apolloClient modules
// and the GraphQL query GET_ANIMES_PAGE
import { Anime, PageInfo } from "@/types";
import { apolloClient } from "../apollo-client/client";
import { GET_ANIMES_PAGE } from "../graphql/queries/getAnimesPerPage";

// Defines the shape of Response object
export type Response = {
  status: boolean;
  errorMessage: string;
  data: Anime[];
  pageInfo: PageInfo | null
};

// Declares an async function getAnimesPerPage that returns a Promise of type Response
export async function getAnimesPerPage(page: number = 1, perPage: number = 50): Promise<Response> {
  try {
    // Queries data using GET_ANIMES_PAGE and the provided variables
    // from the apolloClient
    const { data } = await apolloClient.query({
      query: GET_ANIMES_PAGE,
      variables: {
        page,
        perPage,
      },
    });

    // If the query is successful, a response is returned with the status set to true,
    // error message as empty, data as the fetched media data and pageInfo as the fetched page info
    // If media or pageInfo is not present in the data, they are returned as empty array and null, respectively
    return Promise.resolve({
      status: true,
      errorMessage: "",
      data: data?.Page?.media || [],
      pageInfo: data?.Page?.pageInfo || null
    });

  } catch (error) {
    // If there is an error while querying, it's logged in the console
    // and a response is returned with the status set to false,
    // error message as 'request error', data as empty array and pageInfo as null
    console.error(error);
    return Promise.reject({
      status: false,
      errorMessage: "request error",
      data: [],
      pageInfo: null
    });
  }
}

"use client";
import { Anime, PageInfo } from "@/types";
import { Grid, Stack } from "@chakra-ui/react";
import AnimeItem from "./AnimeItem";
import Pagination from "./Pagination";

// Define the properties for AnimeList component
type Props = {
    animeList: Anime[];
    pageInfo: PageInfo;
};

// The main AnimeList component which will display a list of Anime items and handle pagination
export default function AnimeList({ animeList, pageInfo }: Props) {
    return (
        // It's a stack container component that is used to place other components on top of each other
        <Stack direction="column" gap={14}>
            {/* A Grid component from Chakra UI that's used to create flexible layouts */}
            <Grid
                templateColumns={{
                    base: "repeat(1, 1fr)",
                    md: "repeat(3, 1fr)",
                    lg: "repeat(5, 1fr)",
                }}
                gap={6}
                maxW="90rem"
                margin="auto"
            >
                {/* We're using the map function to generate AnimeItem components for each anime in the animeList array */}
                {animeList.map((anime) => (
                    <AnimeItem key={anime.id} anime={anime} />
                ))}
            </Grid>

            {/* Pagination component, used to control the pagination of the Anime list */}
            <Pagination pageInfo={pageInfo} />
        </Stack>
    );
}

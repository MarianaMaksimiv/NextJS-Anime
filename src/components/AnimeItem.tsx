"use client";
import {Anime, AnimeItemProps} from "@/types";
import {
    Box,
    Card,
    CardHeader,
    GridItem,
    Image,
    Badge,
    CardBody,
    useDisclosure,
} from "@chakra-ui/react";
import React, {FC} from "react";
import { AnimeModal } from "./AnimeModal";

// Defining the required properties
type Props = {
    anime: Anime;
};

// Component to show Anime cover image
const AnimeCover: FC<AnimeItemProps> = ({ anime }) => (
    <Box w="100%" h={{ base: "30rem", md: "25rem" }} overflow="hidden">
        <Image
            w="100%"
            h="100%"
            objectFit="cover"
            src={anime.coverImage.large}
            alt={anime.title.english}
            transition="all 0.3s"
            _hover={{
                transform: "scale(1.1)",
            }}
        />
    </Box>
);

// Component to show Anime title in the card header
const AnimeCardHeader: FC<AnimeItemProps> = ({ anime }) => (
    <CardBody p={2}>
        <CardHeader color="blue.100" p={0}>
            {anime.title.english || anime.title.native}
        </CardHeader>
    </CardBody>
);

// Component to display the Anime season year
const AnimeYearBadge: FC<AnimeItemProps> = ({ anime }) => (
    <Badge
        position="absolute"
        top={2}
        right={2}
        fontSize="1.5rem"
        colorScheme="blue"
        color="blue.900"
        bgColor="whiteAlpha.700"
    >
        {anime.seasonYear}
    </Badge>
);

// The main AnimeItem component.
export default function AnimeItem({ anime }: Props) {
    // useDisclosure is a custom hook for handling state of the modal
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <GridItem
                key={anime.id}
                w="100%"
                h="100%"
                borderRadius={4}
                overflow="hidden"
                cursor="pointer"
                border="2px solid transparent"
                _hover={{ borderColor: "blue.400" }}
                position="relative"
                onClick={onOpen} // handling click to open the modal
            >
                {/* Including all the previously defined components */}
                <Card h="100%">
                    <AnimeCover anime={anime} />
                    <AnimeCardHeader anime={anime} />
                    <AnimeYearBadge anime={anime} />
                </Card>
            </GridItem>

            {/* Including the AnimeModal, onClose will close the modal and reset the state */}
            {isOpen && <AnimeModal isOpen={isOpen} onClose={onClose} anime={anime} />}
        </>
    );
}

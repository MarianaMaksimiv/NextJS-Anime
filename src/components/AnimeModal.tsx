"use client";

import {Anime} from "@/types";
import {
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import {useEffect, useState} from "react";

type ImageDataProps = {
  data: { id: number; image: { medium: string }; name: { full: string } }[];
  title: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  anime: Anime;
};
// A functional component to on each anime image data
function ImageData({ data, title }: ImageDataProps) {
  return (
      <Stack direction="column" gap={4}>
        <span>{title}</span>
        <Flex gap={2} direction="row" flexWrap="wrap">
          {data.map((item) => (
              <Flex key={item.id} gap={1} direction="column" width="60px">
                <Box w="60px" h="60px">
                  <Image
                      w="100%"
                      h="100%"
                      objectFit="cover"
                      objectPosition="top center"
                      src={item.image.medium}
                      alt={item.name.full}
                  />
                </Box>
                <Text fontSize="12px">{item.name.full}</Text>
              </Flex>
          ))}
        </Flex>
      </Stack>
  );
}

export function AnimeModal({ isOpen, onClose, anime }: Props) {
  const [descrip, setDescrip] = useState("");
  // Using useEffect to parse HTML description from anime data
  useEffect(() => {
    // parse HTML description
    const strippedHtml = anime.description.replace(/<[^>]+>/g, "");
    setDescrip(strippedHtml);
  }, [anime.description]);

  // Function to parse airing date
  function parseDate(value: number) {
    return new Date(value * 1000).toLocaleString();
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "full", md: "3xl" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {anime.title.english || anime.title.native}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Display Characters */}
            <ImageData data={anime.characters.nodes} title='Characters' />

            <Divider my={2} />

            {/* Display Staff */}
            <ImageData data={anime.staff.nodes} title='Staff' />

            <Divider my={2} />

            {/* Display description */}
            <span>Description</span>
            <Box mt={2}>{descrip}</Box>

            <Divider my={2} />

            {/* Display airingSchedule */}
            {anime.airingSchedule.nodes.length > 0 && (
              <>
                {anime.airingSchedule.nodes.map((el) => (
                  <div key={el.episode}>
                    <span>Airing Schedule</span>
                    <Stack direction="column" mt={2}>
                      <Flex gap={2}>
                        <span>Episode</span>
                        <Tag colorScheme="yellow">{el.episode}</Tag>
                      </Flex>
                      <Flex gap={2}>
                        <span>Airing at</span>
                        <Tag colorScheme="blue">{parseDate(el.airingAt)}</Tag>
                      </Flex>
                    </Stack>
                  </div>
                ))}
              </>
            )}
          </ModalBody>

          <ModalFooter>
            {/* Close button for the modal */}
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

import { FaUser } from "react-icons/fa";
import { MdOutlineWork } from "react-icons/md";
import InputField from "@/components/InputField";
import React, {useState} from "react";
import {Box, Button, Card, Stack, Heading} from "@chakra-ui/react";

type UserFormProps = {
    title: string;
    initialData?: { userName: string, jobTitle: string};
    submitFunction: (data: {userName: string, jobTitle: string}) => void;

};

export default function UserForm({title, submitFunction, initialData}: UserFormProps) {
    // Current component state
    const { userName: initialUserName = "", jobTitle: initialJobTitle = "" } = initialData || {};
    const [userName, setUserName] = useState(initialUserName);
    const [jobTitle, setJobTitle] = useState(initialJobTitle);

    const [userNameError, setUserNameError] = useState(false);
    const [jobTitleError, setJobTitleError] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const isUserNameEmpty = !userName.trim().length;
        const isJobTitleEmpty = !jobTitle.trim().length;

        // Set error state
        setUserNameError(isUserNameEmpty);
        setJobTitleError(isJobTitleEmpty);

        if (isUserNameEmpty || isJobTitleEmpty) return;

        submitFunction({ userName, jobTitle });
    };

    return (
        <Box w="100%">
            <Card p={4} maxW="500px" w="100%" m="auto" overflow="hidden">
                <Stack>
                    <Heading size="md" mb={5}>{title}</Heading>
                    <form action="" onSubmit={handleSubmit}>
                        <Stack spacing={4}>
                            <InputField
                                title="Username"
                                Icon={FaUser}
                                value={userName}
                                setValue={setUserName}
                                error={userNameError}
                                setError={setUserNameError}
                                placeholder="Enter your username"
                                autoFocus />

                            <InputField
                                title="Job Title"
                                Icon={MdOutlineWork}
                                value={jobTitle}
                                setValue={setJobTitle}
                                error={jobTitleError}
                                setError={setJobTitleError}
                                placeholder="Enter your job title" />

                            <Button colorScheme="blue" type="submit" mt={8}>Submit</Button>
                        </Stack>
                    </form>
                </Stack>
            </Card>
        </Box>
    );
}

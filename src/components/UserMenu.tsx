import { Button, Popover, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Flex, Avatar } from '@chakra-ui/react';
import { IoIosArrowDown } from 'react-icons/io';
import { User } from '@/types';

// Define the properties this component expects
type UserMenuProps = {
    user?: User; // User object
    openForm: () => void; // Callback function to open the form
    logOutHandler: () => void; // Callback function to handle user log out
};

export function UserMenu ({ user, openForm, logOutHandler }: UserMenuProps) {
    // UserMenu component returns a user profile with a dropdown containing buttons to open form and log out
    return (
        <Flex justifyContent="flex-end">

            {/* Popover which contains user information and options */}
            <Popover>
                {/* PopoverTrigger defines the component/button that triggers the popover on click */}
                <PopoverTrigger>
                    <Flex cursor="pointer" alignItems="center" gap={2}>
                        <Avatar size="sm" />
                        <span>{user?.userName}</span>
                        <IoIosArrowDown />
                    </Flex>
                </PopoverTrigger>

                {/* PopoverContent defines the content that popover shows on being triggered */}
                <PopoverContent mr={4}>
                    <PopoverCloseButton />

                    {/* PopoverHeader defines the header part of the popover */}
                    <PopoverHeader>
                        <Flex
                            alignItems="center"
                            justifyContent="center"
                            bgColor="blue.300"
                            color="white"
                            width={14}
                            height={14}
                            rounded={100}
                            mx="auto"
                            fontSize="3xl"
                            mb={2}
                        >
                            <span>{user?.userName[0].toLocaleUpperCase()}</span>
                        </Flex>
                        <Flex
                            alignItems="center"
                            justifyContent="center"
                            flexDirection="column"
                        >
                            <span> Hi, {user?.userName}</span>
                            <span>{user?.jobTitle}</span>
                        </Flex>
                    </PopoverHeader>

                    {/* PopoverBody defines body of the popover */}
                    <PopoverBody>
                        <Flex justifyContent="space-between" gap={2}>
                            {/* Button to open form to change user's information */}
                            <Button onClick={openForm}>
                                Change information
                            </Button>

                            {/* Button to execute log out operation */}
                            <Button colorScheme="blue" onClick={logOutHandler}>
                                Logout
                            </Button>
                        </Flex>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </Flex>
    );
}

export default UserMenu;

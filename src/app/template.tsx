// Import library dependencies
"use client";
import { animatePageIn } from "@/lib/utils/animations";
import { Box } from "@chakra-ui/react";
import { useEffect } from "react";

// Define the box style for each step
const lineStyle = {
    minH: "100vh",
    bgColor: "#000",
    zIndex: 10,
    position: "fixed",
    w: "25%",
};

// Create an array for the 4 steps. The array will contain values from 1 to 4.
const steps = Array.from({ length: 4 }, (_, i) => i + 1);

// Template is a component that accepts a 'children' prop.
// It renders a Box that contains 4 Boxes which represent steps and are animated on component mount.
// It also renders any children that are passed into it.
export default function Template({ children }: { children: React.ReactNode }) {
    // When the component mounts, it executes the animation.
    useEffect(() => {
        animatePageIn();
    }, []);

    return (
        // The outer Box. It covers as minimum as 100% of the viewport height
        <Box minH="100vh">
            {/* Maps over the steps array to create 4 Box components. Each Box gets an id and style. */}
            {steps.map(step => (
                // Key is required for efficient React rendering when iterating arrays
                // A Box is created for each step with the id `step-n` and a left offset calculated as a percentage of total
                <Box key={step} id={`step-${step}`} sx={lineStyle} left={`${(step - 1) * 25}%`} />
            ))}
            {/* Any child components passed to Template component will be rendered here */}
            {children}
        </Box>
    );
}

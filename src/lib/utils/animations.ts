// Importing GSAP (Greensock Animation API) for animation purposes
import gsap from "gsap"

// A function to animate page entry
export const animatePageIn = () => {
  // Define steps for the animation, searching for elements with ids 'step-1' to 'step-4' and eliminating any non-existing/null elements.
  const steps = ["step-1", "step-2", "step-3", "step-4"]
      .map((id) => document.getElementById(id)) // Attempt to access elements in DOM with given step ids.
      .filter((el) => el !== null); // Filter out non-existing (null) elements.

  // If steps array has elements, start the animation sequence.
  if (steps.length > 0) {
    // Create a new GSAP timeline for controlling a sequence of tweens.
    const tl = gsap.timeline();

    // Starting state of elements: yPercent is the total movement along y-axis as a percentage of its height, set to 0 to make them start at initial position.
    tl.set(steps, {
      yPercent: 0,
    })
        // Animation state of elements: animate the elements to move downwards (yPercent: 100) with a 0.2 second delay (stagger: 0.2) between each element's start.
        .to(steps, {
          yPercent: 100,
          stagger: 0.2,
        });
  }
}

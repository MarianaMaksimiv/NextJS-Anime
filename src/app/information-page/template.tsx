"use client"

import { animatePageIn } from "@/lib/utils/animations"
import React, { useEffect } from "react"

/**
 * The props type definition for the Template component
 */
type TemplateProps = {
  /**
   * The child components to be rendered within the Template component
   */
  children: React.ReactNode;
};

/**
 * The Template component acts as a layout wrapper for its children.
 * It also triggers page animation via animatePageIn function whenever
 * it gets re-rendered.
 *
 * @param children - The child components to be rendered within the component
 * (passed via TemplateProps)
 */
const Template = ({ children }: TemplateProps) => {
  /**
   * Use the useEffect React hook to call the animatePageIn function everytime
   * the component gets rendered.
   */
  useEffect(() => {
    animatePageIn();
  }, []);

  /**
   * Within the main tag, map through all the children.
   * If the child is a valid React element, clone it and supply a unique key prop.
   * Otherwise, just render the child as is.
   */
  return (
      <main>
        {React.Children.map(children, (child, index) =>
            React.isValidElement(child) ? React.cloneElement(child, { key: index }) : child
        )}
      </main>
  );
}

export default Template;

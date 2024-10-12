"use client";
import { createContext, useContext, useState } from "react";

type BuilderLayoutContextType = {
  sectionActive: string;
  isOpenLeftSidebar: boolean;
  isOpenRightSidebar: boolean;
  setSectionActive: React.Dispatch<React.SetStateAction<string>>;
  setOpenLeftSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenRightSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const BuilderLayoutContext = createContext<BuilderLayoutContextType | null>(
  null
);

export const BuilderLayoutProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }: { children: React.ReactNode }) => {
  const [sectionActive, setSectionActive] = useState("pages");
  const [isOpenLeftSidebar, setOpenLeftSidebar] = useState(true);
  const [isOpenRightSidebar, setOpenRightSidebar] = useState(true);

  return (
    <BuilderLayoutContext.Provider
      value={{
        sectionActive,
        isOpenLeftSidebar,
        isOpenRightSidebar,
        setSectionActive,
        setOpenLeftSidebar,
        setOpenRightSidebar,
      }}
    >
      {children}
    </BuilderLayoutContext.Provider>
  );
};

export function useBuilderLayout() {
  const context = useContext(BuilderLayoutContext);
  if (!context) {
    throw new Error(
      "useBuilderLayout must be used within a BuilderLayoutProvider"
    );
  }
  return context;
}

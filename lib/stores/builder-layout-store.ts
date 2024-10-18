"use client";
import { create } from "zustand";

type BuilderLayoutStoreType = {
  sectionActive: string;
  isOpenLeftSidebar: boolean;
  isOpenRightSidebar: boolean;
  setSectionActive(section: string): void;
  setOpenLeftSidebar(state: boolean): void;
  setOpenRightSidebar(state: boolean): void;
};

export const useBuilderLayoutStore = create<BuilderLayoutStoreType>((set) => ({
  sectionActive: "pages",
  isOpenLeftSidebar: true,
  isOpenRightSidebar: true,
  setSectionActive: (section: string) => set({ sectionActive: section }),
  setOpenLeftSidebar: (state: boolean) => set({ isOpenLeftSidebar: state }),
  setOpenRightSidebar: (state: boolean) => set({ isOpenRightSidebar: state }),
}));

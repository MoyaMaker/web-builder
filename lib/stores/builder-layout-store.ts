"use client";
import { create } from "zustand";

type BuilderLayoutStoreType = {
  preview: boolean;
  sectionActive: string;
  isOpenLeftSidebar: boolean;
  isOpenRightSidebar: boolean;
  setPreview(state: boolean): void;
  setSectionActive(section: string): void;
  setOpenLeftSidebar(state: boolean): void;
  setOpenRightSidebar(state: boolean): void;
};

export const useBuilderLayoutStore = create<BuilderLayoutStoreType>((set) => ({
  preview: false,
  sectionActive: "pages",
  isOpenLeftSidebar: true,
  isOpenRightSidebar: true,
  setPreview: (state: boolean) => set({ preview: state }),
  setSectionActive: (section: string) => set({ sectionActive: section }),
  setOpenLeftSidebar: (state: boolean) => set({ isOpenLeftSidebar: state }),
  setOpenRightSidebar: (state: boolean) => set({ isOpenRightSidebar: state }),
}));

"use client";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider as ReactDndProvider } from "react-dnd";

export function DndProvider({ children }: { children: React.ReactNode }) {
  return <ReactDndProvider backend={HTML5Backend}>{children}</ReactDndProvider>;
}

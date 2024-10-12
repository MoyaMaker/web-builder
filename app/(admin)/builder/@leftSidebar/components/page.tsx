"use client";
import {
  CaseSensitiveIcon,
  HashIcon,
  ListIcon,
  LucideProps,
  PencilIcon,
  SquareMousePointerIcon,
  TableIcon,
  TextCursorInputIcon,
} from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes, useRef } from "react";
import { useDrag } from "react-dnd";

const components = [
  {
    name: "Table",
    icon: TableIcon,
  },
  {
    name: "Text",
    icon: CaseSensitiveIcon,
  },
  {
    name: "Button",
    icon: SquareMousePointerIcon,
  },
  {
    name: "Input",
    icon: PencilIcon,
  },
  {
    name: "Form",
    icon: TextCursorInputIcon,
  },
  {
    name: "Select",
    icon: ListIcon,
  },
  {
    name: "Number Input",
    icon: HashIcon,
  },
];

export default function ComponentsSection() {
  return (
    <section className="grid grid-cols-[repeat(auto-fill,minmax(60px,1fr))] gap-2 p-2">
      {components.map((component) => (
        <DraggableComponent key={component.name} component={component} />
      ))}
    </section>
  );
}

const DraggableComponent = ({
  component,
}: {
  component: {
    name: string;
    icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
  };
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drag] = useDrag({
    type: "COMPONENT",
    item: {
      type: component.name,
    },
  });

  drag(ref);

  return (
    <div
      ref={ref}
      className="flex flex-col justify-center items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-md p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:cursor-grab"
    >
      <component.icon className="w-4 h-4" />
      <span className="text-xs text-center">{component.name}</span>
    </div>
  );
};

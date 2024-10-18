import { ColumnDef } from "@tanstack/react-table";

import { TableType } from "@/lib/schemas/table-schema";
import { DataTable } from "@/lib/components/ui/data-table";

type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const payments: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
];

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];

export function TableBuilder({ component }: { component: TableType }) {
  const { title, searchable } = component.attributes;

  return (
    <div className="pointer-events-none">
      <DataTable
        columns={columns}
        data={payments}
        title={title}
        searchable={searchable}
      />
    </div>
  );
}

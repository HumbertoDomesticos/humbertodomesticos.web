"use client";

import * as React from "react";
import { createTheme } from "@mui/material/styles";
import { AppProvider, type Navigation } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { Crud, type DataModel, type DataSource } from "@toolpad/core/Crud";
import { DemoProvider, useDemoRouter } from "@toolpad/core/internal";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

const NAVIGATION: Navigation = [
  {
    segment: "pix",
    title: "Transferências PIX",
    icon: <FlashOnIcon />,
    pattern: "pix{/:noteId}*",
  },
  {
    segment: "bancarias",
    title: "Transferências Bancárias",
    icon: <MonetizationOnIcon />,
    pattern: "bancarias{/:noteId}*",
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

interface Pix extends DataModel {
  id: string;
  valor: number;
  status: string;
  data: string;
  pagamento: string;
}

interface Bancaria extends DataModel {
  id: string;
  valor: number;
  status: string;
  data: string;
  banco: string;
}

export default function DashboardTransferencias(props: { window?: () => Window }) {
  const { window } = props;
  const router = useDemoRouter("/pix");
  const demoWindow = window !== undefined ? window() : undefined;

  const [pixList, setPixList] = React.useState<Pix[]>([]);
  const [bancoList, setBancoList] = React.useState<Bancaria[]>([]);

  const carregarDados = React.useCallback(async () => {
    const [resPix, resBanco] = await Promise.all([
      fetch("/api/asaas/pix").then((r) => r.json()),
      fetch("/api/asaas/bank-transfer").then((r) => r.json()),
    ]);

    const pixData: Pix[] = resPix.data.map((e: any) => ({
      id: e.id,
      valor: e.value,
      status: e.status,
      data: e.dueDate,
      pagamento: e.billingType,
    }));

    const bancoData: Bancaria[] = resBanco.data.map((e: any) => ({
      id: e.id,
      valor: e.value,
      status: e.status,
      data: e.dateCreated,
      banco: `${e.bankAccount.bank.name} (${e.bankAccount.bank.code})`,
    }));

    setPixList(pixData);
    setBancoList(bancoData);
  }, []);

  React.useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  const pixDataSource: DataSource<Pix> = {
    fields: [
      { field: "id", headerName: "ID" },
      { field: "valor", headerName: "Valor" },
      { field: "status", headerName: "Status" },
      { field: "data", headerName: "Data" },
      { field: "pagamento", headerName: "Pagamento" },
    ],
    getMany: async ({ paginationModel }) => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const start = paginationModel.page * paginationModel.pageSize;
      const end = start + paginationModel.pageSize;
      return { items: pixList.slice(start, end), itemCount: pixList.length };
    },
    getOne: async (id) => {
      const item = pixList.find((p) => p.id === id);
      if (!item) throw new Error("PIX não encontrado");
      return item;
    },
    deleteOne: async () => { throw new Error("Exclusão não suportada"); },
    validate: () => ({ issues: [] }),
  };

  const bancoDataSource: DataSource<Bancaria> = {
    fields: [
      { field: "id", headerName: "ID" },
      { field: "valor", headerName: "Valor" },
      { field: "status", headerName: "Status" },
      { field: "data", headerName: "Data" },
      { field: "banco", headerName: "Banco" },
    ],
    getMany: async ({ paginationModel }) => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const start = paginationModel.page * paginationModel.pageSize;
      const end = start + paginationModel.pageSize;
      return { items: bancoList.slice(start, end), itemCount: bancoList.length };
    },
    getOne: async (id) => {
      const item = bancoList.find((b) => b.id === id);
      if (!item) throw new Error("Transferência não encontrada");
      return item;
    },
    deleteOne: async () => { throw new Error("Exclusão não suportada"); },
    validate: () => ({ issues: [] }),
  };

  const title = React.useMemo(() => {
    if (router.pathname.startsWith("/pix")) return "Transferências PIX";
    if (router.pathname.startsWith("/bancarias")) return "Transferências Bancárias";
    return "Transferências";
  }, [router.pathname]);

  return (
    <DemoProvider window={demoWindow}>
      <AppProvider navigation={NAVIGATION} router={router} theme={demoTheme} window={demoWindow}>
        <DashboardLayout defaultSidebarCollapsed>
          <PageContainer title={title}>
            {router.pathname.startsWith("/pix") ? (
              <Crud<Pix>
                dataSource={pixDataSource}
                dataSourceCache={null}
                rootPath="/pix"
                initialPageSize={10}
              />
            ) : (
              <Crud<Bancaria>
                dataSource={bancoDataSource}
                dataSourceCache={null}
                rootPath="/bancarias"
                initialPageSize={10}
              />
            )}
          </PageContainer>
        </DashboardLayout>
      </AppProvider>
    </DemoProvider>
  );
}

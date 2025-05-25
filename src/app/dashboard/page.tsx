"use client";

import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import { AppProvider, type Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { Crud, type DataModel, type DataSource } from '@toolpad/core/Crud';
import { DemoProvider, useDemoRouter } from '@toolpad/core/internal';
import InventoryIcon from '@mui/icons-material/Inventory';
import { getProduto } from '@/services/routes/produtos/page';
import { useEffect, useMemo } from 'react';

const NAVIGATION: Navigation = [
    {
        segment: 'products',
        title: 'Produtos',
        icon: <InventoryIcon />,
        pattern: 'notes{/:noteId}*',
    },
];

const demoTheme = createTheme({
    cssVariables: {
        colorSchemeSelector: 'data-toolpad-color-scheme',
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

export interface ProdutoDashboard extends DataModel {
    id: number; // <--- necessário para DataGrid
    id_prod: number;
    nome_prod: string;
    descricao_prod: string;
    preco_produto: string;
    desconto_prod: number;
    desconto_preco_produto?: string;
    estoque_prod: number;
}


export default function CrudNoCache(props: { window?: () => Window }) {
    const { window } = props;
    const router = useDemoRouter('/notes');
    const [notesStore, setNotesStore] = React.useState<ProdutoDashboard[]>([]);

    // Remove this const when copying and pasting into your project.
    const demoWindow = window !== undefined ? window() : undefined;

    useEffect(() => {
        getProduto()
            .then((resp: any[]) => {
                const dataWithId = resp.map((item) => ({
                    ...item,
                    id: item.id_prod, // <- adiciona id esperado pela DataGrid
                }));
                setNotesStore(dataWithId);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);


    const notesDataSource: DataSource<ProdutoDashboard> = {
        fields: [
            { field: 'id_prod', headerName: 'ID' },
            { field: 'nome_prod', headerName: 'Produto', flex: 1 },
            { field: 'descricao_prod', headerName: 'Descrição', flex: 1 },
            { field: 'preco_produto', headerName: 'Preço', flex: 1 },
            { field: 'desconto_prod', headerName: 'Desconto', flex: 1 },
            { field: 'estoque_prod', headerName: 'Estoque', flex: 1 },
        ],

        getMany: async ({ paginationModel, filterModel, sortModel }) => {
            // Simulate loading delay
            await new Promise((resolve) => {
                setTimeout(resolve, 750);
            });

            let processedNotes = [...notesStore];

            // Apply filters (demo only)
            if (filterModel?.items?.length) {
                // biome-ignore lint/complexity/noForEach: <explanation>
                filterModel.items.forEach(({ field, value, operator }) => {
                    if (!field || value == null) {
                        return;
                    }

                    processedNotes = processedNotes.filter((note) => {
                        const noteValue = note[field as keyof ProdutoDashboard];

                        switch (operator) {
                            case 'contains':
                                return String(noteValue)
                                    .toLowerCase()
                                    .includes(String(value).toLowerCase());
                            case 'equals':
                                return noteValue === value;
                            case 'startsWith':
                                return String(noteValue)
                                    .toLowerCase()
                                    .startsWith(String(value).toLowerCase());
                            case 'endsWith':
                                return String(noteValue)
                                    .toLowerCase()
                                    .endsWith(String(value).toLowerCase());
                            case '>':
                                return (noteValue as number) > (value as number);
                            case '<':
                                return (noteValue as number) < (value as number);
                            default:
                                return true;
                        }
                    });
                });
            }

            // Apply sorting
            if (sortModel?.length) {
                processedNotes.sort((a, b) => {
                    for (const { field, sort } of sortModel) {
                        const aValue = a[field as keyof ProdutoDashboard] as number;
                        const bValue = b[field as keyof ProdutoDashboard] as number;

                        if (aValue < bValue) {
                            return sort === 'asc' ? -1 : 1;
                        }
                        if (aValue > bValue) {
                            return sort === 'asc' ? 1 : -1;
                        }
                    }
                    return 0;
                });
            }

            // Apply pagination
            const start = paginationModel.page * paginationModel.pageSize;
            const end = start + paginationModel.pageSize;
            const paginatedNotes = processedNotes.slice(start, end);

            return {
                items: paginatedNotes,
                itemCount: processedNotes.length,
            };
        },

        getOne: async (noteId) => {
            // Simulate loading delay
            await new Promise((resolve) => {
                setTimeout(resolve, 750);
            });

            const noteToShow = notesStore.find((note) => note.id_prod === Number(noteId));

            if (noteToShow) {
                return noteToShow;
            }
            throw new Error('Note not found');
        },

        createOne: async (data) => {
            await new Promise((resolve) => setTimeout(resolve, 750));

            const newId = notesStore.reduce((max, note) => Math.max(max, note.id_prod), 0) + 1;

            const newNote = {
                id: newId,
                id_prod: newId,
                ...data,
            } as ProdutoDashboard;

            setNotesStore([...notesStore, newNote]);
            return newNote;
        },


        updateOne: async (noteId, data) => {
            // Simulate loading delay
            await new Promise((resolve) => {
                setTimeout(resolve, 750);
            });

            let updatedNote: ProdutoDashboard | null = null;
            const updatedNotes = notesStore.map((note) => {
                if (note.id_prod === Number(noteId)) {
                    updatedNote = { ...note, ...data };
                    return updatedNote;
                }
                return note;
            });

            if (!updatedNote) {
                throw new Error('Note not found');
            }

            setNotesStore(updatedNotes);
            return updatedNote;
        },

        deleteOne: async (noteId) => {
            // Simulate loading delay
            await new Promise((resolve) => {
                setTimeout(resolve, 750);
            });

            setNotesStore(notesStore.filter((note) => note.id_prod !== Number(noteId)));
        },

        validate: (formValues) => {
            let issues: { message: string; path: [keyof ProdutoDashboard] }[] = [];

            if (!formValues.nome_prod) {
                issues = [...issues, { message: 'Nome do produto é obrigatório', path: ['nome_prod'] }];
            }
            if (formValues.nome_prod && formValues.nome_prod.length < 3) {
                issues = [
                    ...issues,
                    {
                        message: 'Nome do produto deve ter pelo menos 3 caracteres',
                        path: ['nome_prod'],
                    },
                ];
            }
            if (!formValues.descricao_prod) {
                issues = [...issues, { message: 'Descrição é obrigatória', path: ['descricao_prod'] }];
            }

            return { issues };
        },
    };

    function matchPath(pattern: string, pathname: string): string | null {
        const regex = new RegExp(`^${pattern.replace(/:[^/]+/g, '([^/]+)')}$`);
        const match = pathname.match(regex);
        return match ? match[1] : null;
    }

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    const title = useMemo(() => {
        if (router.pathname === '/notes/new') {
            return 'Novo Produto';
        }
        const editNoteId = matchPath('/notes/:noteId/edit', router.pathname);
        if (editNoteId) {
            return `Produto ${editNoteId} - Editar`;
        }
        const showNoteId = matchPath('/notes/:noteId', router.pathname);
        if (showNoteId) {
            return `Produto ${showNoteId}`;
        }

        return undefined;
    }, [router.pathname]);

    return (
        <DemoProvider window={demoWindow}>
            <AppProvider
                navigation={NAVIGATION}
                router={router}
                theme={demoTheme}
                window={demoWindow}
            >
                <DashboardLayout defaultSidebarCollapsed>
                    <PageContainer title={title}>
                        <Crud<ProdutoDashboard>
                            dataSource={notesDataSource}
                            dataSourceCache={null}
                            rootPath="/notes"
                            initialPageSize={10}
                            defaultValues={{ nome_prod: 'Novo produto' }}
                        />
                    </PageContainer>
                </DashboardLayout>
            </AppProvider>
        </DemoProvider>
    );
}

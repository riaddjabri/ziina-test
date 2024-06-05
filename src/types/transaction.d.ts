export enum TransactionType {
    DEPOSIT = "deposit",
    WITHDRAWAL = "withdrawal",
    TRANSFER = "transfer",
}

export interface Transaction {
    id: string;
    userId: string;
    amount: number;
    currency: string;
    type: TransactionType;
    isPending: boolean;
    createdAt: string;
    header: string;
    description?: string;
    message?: string;
    avatarUrl?: string;
}

export interface TransactionsGroup {
    transactions: Transaction[];
    date: string;
    totalAmount: number;
}

export interface TransactionsList {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    totalPages: number;
    transactionsGroups: TransactionsGroup[];
}
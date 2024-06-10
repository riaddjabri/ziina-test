import React, {useEffect, useState} from "react";
import apiFetch from "../utils/api";
import {Transaction, TransactionsGroup, TransactionsList} from "../types/transaction";
import {formatDate} from "../utils/formatDate";
import {ReactComponent as Clock} from "../assets/clock.svg";
import TransactionDetail from "../components/TransactionDetail";
import Pill from "../components/Pill";

const TransactionHistory = () => {
    const [transactionsGroups, setTransactionsGroups] = useState<TransactionsGroup[]>([]);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

    const fetchTransactions = async () => {

        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            console.error('No access token available');
            return;
        }

        try {
            const response = await apiFetch('/transactions?perPage=17&page=1');

            if (response.ok) {
                const transactionsData: TransactionsList = await response.json();
                console.log(transactionsData)
                setTransactionsGroups(transactionsData.transactionsGroups);
            } else {
                console.error('Failed to fetch user transactions');
            }
        } catch (error) {
            console.error('Error fetching user transactions:', error);
        }
    };
    useEffect(() => {
        fetchTransactions();
    }, []);

    const handleTransactionClick = (transaction: Transaction) => {
        setSelectedTransaction(transaction);
    };

    const closeModal = () => {
        setSelectedTransaction(null);
    };

    return (
        <div className="min-h-screen px-5 py-10 items-center justify-center bg-black text-white">
            <div className='mb-4'>Transaction History</div>
            <div className='flex flex-col gap-10'>
            {transactionsGroups.map((group, index) => (
                <div key={index}>
                    <div className='flex justify-between mb-5 text-ziinaGrey'>
                        <div>{formatDate(group.date)}</div>
                        <div>{group.totalAmount}</div>
                    </div>
                    <div className='flex flex-col gap-10'>
                    {group.transactions.map((transaction) => (
                        <div key={transaction.id} className='flex gap-5 justify-between rounded-3xl hover:bg-ziinaGrey cursor-pointer p-4' onClick={() => handleTransactionClick(transaction)}>
                            <img
                                className="h-8 w-8 rounded-full"
                                src={transaction.avatarUrl}
                                alt="User Avatar"
                            />
                            <div className='text-left grow'>
                                <h4>{transaction.header}</h4>
                                {transaction.isPending && <p className='text-ziinaGrey'>pending your approval</p>}
                                {transaction.message && <Pill message={transaction.message} />}
                            </div>
                            <div className={`${transaction.isPending ? 'text-ziinaGrey' : (transaction.amount > 0 ? 'text-ziinaGreen' : 'text-white')} text-right gap-1 flex items-center justify-center`}>
                                {transaction.amount}
                                {transaction.isPending && <Clock/>}
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            ))}
            </div>
            {selectedTransaction && <TransactionDetail transaction={selectedTransaction} onClose={closeModal} />}

        </div>
    )
}

export default TransactionHistory
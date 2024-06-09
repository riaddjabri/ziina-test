import {Transaction} from "../types/transaction";
import React from "react";
import {ReactComponent as Clock} from "../assets/clock.svg";
import Pill from "./Pill";
interface TransactionDetailProps {
    transaction: Transaction | null;
    onClose: () => void;
}
const TransactionDetail = ({ transaction, onClose }: TransactionDetailProps) => {
    if (!transaction) return null;

    return (
        <div className="fixed inset-0 bg-black flex items-center justify-center">
            <div className="text-white p-8 w-full h-full relative">
                <button className="absolute top-2 right-2" onClick={onClose}>
                    Close
                </button>
                <div className='flex flex-col gap-5 items-center'>
                    <div className="text-2xl mb-4">{new Date(transaction.createdAt).toLocaleString()}</div>
                    {transaction.avatarUrl &&
                        <img width="120" height="120" className='rounded-full' src={transaction.avatarUrl}
                             alt="User Avatar"/>}
                    <p>{transaction.description}</p>
                    <div
                        className={`${transaction.isPending ? 'text-ziinaGrey' : (transaction.amount > 0 ? 'text-ziinaGreen' : 'text-white')} text-right gap-1 flex items-center justify-center`}>
                        {transaction.amount}
                        {transaction.isPending && <Clock/>}
                    </div>
                    {transaction.message && <Pill message={transaction.message}/>}

                </div>
                <div className="p-4 border rounded mb-2">
                    <h3>{transaction.header}</h3>


                    <p>Type: {transaction.type}</p>
                    <p>Status: {transaction.isPending ? 'Pending' : 'Completed'}</p>
                    <p>Date: {new Date(transaction.createdAt).toLocaleString()}</p>
                    {transaction.message && <p>Message: {transaction.message}</p>}
                    {transaction.avatarUrl && <img src={transaction.avatarUrl} alt="User Avatar"/>}
                </div>
            </div>
        </div>
    )

}

export default TransactionDetail
import React from "react";

export type PillType = {
    message: string
}
const Pill = ({message}: PillType) => (
    <div className='mt-4 px-4 py-2 bg-[#cccccc] text-black w-max rounded-tr-3xl rounded-bl-3xl'>
        {message}
    </div>
)

export default Pill
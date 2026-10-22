import { useNavigate } from "react-router-dom"

export default function CheckoutAddressSection({name, address, phone}:{name:string, address: string, phone: string}){
    const navigate = useNavigate()

    return(
        <section className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            {/* Header */}
            <div className="mb-5 flex items-start justify-between">
                <div>
                    <h2 className="text-xl font-bold">
                        1. Confirm Delivery Address
                    </h2>

                    <p className={`mt-1 text-sm text-gray-500 ${address && phone ? "text-gray-500" : "text-red-500"}`}>
                        {address && phone 
                            ? "Make sure your delivery address is correct."
                            : `Please set a valid address and phone number` }
                    </p>
                </div>

                <button
                    type="button"
                    className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                    onClick={()=> navigate("/profile")}
                >
                    Edit
                </button>
            </div>

            {/* Selected Address */}
            <div className="rounded-lg border-2 border-blue-500 bg-blue-50 p-5">

                <div className="flex gap-4">

                    {/* Location Icon */}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-5 w-5 text-blue-600"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />

                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 10.5c0 7.142-7.5 10.5-7.5 10.5s-7.5-3.358-7.5-10.5a7.5 7.5 0 1 1 15 0Z"
                            />
                        </svg>
                    </div>

                    {/* Address */}
                    {address
                        ?<div>
                            <div className="mb-2 flex items-center gap-2">
                                <h3 className="font-semibold">
                                    {name}
                                </h3>
                            </div>

                            <p className="text-sm leading-6 text-gray-600">
                                {address.split(",").slice(0,2)}
                                <br />
                                {address.split(",").slice(2)}
                                <br />
                                <span className="text-gray-700">
                                    Phone: {phone}
                                </span>
                            </p>
                        </div>
                        :<div>
                            <h3 className="font-semibold">
                                {name}
                            </h3>
                            <p className="text-sm leading-6 text-gray-600">
                                None
                                <br />
                                <span className="text-gray-700">
                                    Phone: {phone? phone : "NA"}
                                </span>
                            </p>

                            
                        </div>}
                </div>
            </div>
        </section>
    )
}
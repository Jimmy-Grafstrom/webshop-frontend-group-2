import {Link} from "react-router";

export function PaymentCancelPage() {
    return(
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
                Betalning avbruten
            </h1>
            <p className="text-gray-700 mb-4">
                Din betalning har avbrutits. Vänligen försök igen.
            </p>
            <Link to="/products" className="text-indigo-600 hover:text-indigo-800">
                Tillbaka till produktsidan
            </Link>
        </div>
    )
}
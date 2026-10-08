import {Link} from "react-router";

export function PaymentSuccessPage() {
    return(
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm text-center">
            <h1 className="text-2xl font-bold text-green-600 mb-4">
                Betalning genomförd
            </h1>
            <p className="text-gray-700 mb-4">
                Tack för dit köp!
            </p>
            <Link to="/products" className="text-indigo-600 hover:text-indigo-800">
                Tillbaka till produktsidan
            </Link>
        </div>
    )
}    
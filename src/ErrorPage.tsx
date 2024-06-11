import { useNavigate, useRouteError } from "react-router-dom";

function ErrorPage() {
    const error = useRouteError();
    const nav = useNavigate();
    console.error(error);

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="mb-5 font-bold text-6xl">Oops!</h1>
            <p className="mb-6 text-3xl">
                Sorry, an unexpected error has occurred
            </p>
            <p className="mb-20">
                <i className="text-4xl">
                    {(error as { statusText?: string })?.statusText ||
                        (error as Error)?.message}
                </i>
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 shadow-lg p-3 rounded-md font-bold text-lg" onClick={() => nav("/dashboard")}>
                Go Home
            </button>
        </div>
    );
}

export default ErrorPage;

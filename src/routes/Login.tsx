import { useEffect, useRef, useState } from "react";
// import { FaGithub, FaGoogle } from "react-icons/fa";
import Footer from "../components/Footer";
import logo from "../assets/placeholder-logo.svg";
import axios from "../api/axios";

// const providers = [
//     {
//         text: "Google",
//         provider: "google",
//         icon: <FaGoogle />,
//     },
//     {
//         text: "Github",
//         provider: "github",
//         icon: <FaGithub />,
//     },
// ];

const LOGIN_URL = "/login";

function Login() {
    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLParagraphElement>(null);

    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        userRef.current?.focus();
    }, []);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            console.log(res.data);
            console.log(JSON.stringify(res))

            setUser("");
            setPwd("");
        } catch (err: any) {
            if (!err?.response) {
                setError("No server response.")
            } else {
                setError("Unable to login.")
            }
            errRef.current?.focus();
        }
    };

    return (
        <div className="flex flex-col h-screen">
            <div className="flex-grow">
                <div className="flex flex-col items-center my-40">
                    <img
                        src={logo}
                        className="drop-shadow-2xl mb-10 w-[400px]"
                    />
                    <h1 className="mb-10 font-bold text-5xl">
                        Unity CRG Platform
                    </h1>
                    <div className="flex flex-col bg-neutral-700 shadow-xl p-10 rounded-xl w-96">
                        {error && (
                            <p
                                ref={errRef}
                                aria-live="assertive"
                                className="bg-red-400 bg-opacity-40 shadow-lg mb-5 p-2 border border-red-600 rounded-md text-center text-red-200"
                            >
                                {error}
                            </p>
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-2 mb-5">
                                <label
                                    className="font-bold text-neutral-300 select-none"
                                    htmlFor="userInput"
                                >
                                    Username
                                </label>
                                <input
                                    type="text"
                                    id="userInput"
                                    placeholder="user_name"
                                    autoComplete="off"
                                    ref={userRef}
                                    value={user}
                                    onChange={(e) => setUser(e.target.value)}
                                    required
                                    className="bg-neutral-700 px-4 py-2 rounded-md outline outline-1 outline-neutral-600"
                                />
                            </div>
                            <div className="flex flex-col gap-2 mb-5">
                                <label
                                    className="font-bold text-neutral-300 select-none"
                                    htmlFor="passInput"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="passInput"
                                    placeholder="••••••••"
                                    value={pwd}
                                    required
                                    onChange={(e) => setPwd(e.target.value)}
                                    className="bg-neutral-700 px-4 py-2 rounded-md outline outline-1 outline-neutral-600"
                                />
                            </div>
                            <button className="mb-5 text-neutral-400 hover:text-neutral-300 hover:underline hover:">Forgot password?</button>
                            <button
                                className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500 disabled:opacity-30 px-5 p-2 rounded-lg w-full font-bold"
                            >
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

// type ProviderButtonProps = {
//     text: string;
//     provider: string;
//     icon: JSX.Element;
// };
// function ProviderButton({ text, provider, icon }: ProviderButtonProps) {
//     const handleLogin = () => {
//         window.location.href = `http://localhost:3000/auth/${provider}`;
//     };

//     return (
//         <button
//             className="flex justify-center items-center gap-4 bg-neutral-900 hover:bg-neutral-800 mb-2 px-5 p-2 rounded-lg font-bold"
//             onClick={handleLogin}
//         >
//             {icon}
//             {text}
//         </button>
//     );
// }

export default Login;

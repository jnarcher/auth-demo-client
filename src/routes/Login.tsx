import { useContext, useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import logo from "../assets/placeholder-logo.svg";
import axios from "../api/axios";
import AuthContext from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { CgSpinnerAlt } from "react-icons/cg";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const LOGIN_URL = "/public/login";

function Login() {
    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLParagraphElement>(null);

    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");
    const [pwdVisible, setPwdVisible] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const { setIsAuthenticated } = useContext(AuthContext);

    const nav = useNavigate();

    useEffect(() => {
        userRef.current?.focus();
    }, []);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
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
            console.log(JSON.stringify(res));

            setIsAuthenticated(true);

            setUser("");
            nav("/dashboard");
        } catch (err: any) {
            if (!err?.response) {
                setError("No server response.");
            } else {
                setError("Unable to login.");
            }
            errRef.current?.focus();
        } finally {
            setPwd("");
            setLoading(false);
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
                        <div>
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
                                <div className="relative">
                                    <input
                                        type={pwdVisible ? "text" : "password"}
                                        id="passInput"
                                        placeholder="••••••••"
                                        value={pwd}
                                        required
                                        onChange={(e) => setPwd(e.target.value)}
                                        className="bg-neutral-700 px-4 py-2 rounded-md w-full outline outline-1 outline-neutral-600"
                                    />
                                    <button
                                        onClick={() =>
                                            setPwdVisible(!pwdVisible)
                                        }
                                        className="top-0 absolute p-3 rounded-e.md end-0"
                                    >
                                        <PwdVisibleToggle visible={pwdVisible}/>
                                    </button>
                                </div>
                            </div>
                            <button className="mb-5 text-neutral-400 hover:text-neutral-300 hover:underline hover:">
                                Forgot password?
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500 disabled:opacity-30 px-5 p-2 rounded-lg w-full h-10 font-bold"
                            >
                                {loading ? <Spinner /> : "Login"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

function PwdVisibleToggle({ visible }: { visible: boolean }) {
    return visible ? <FaRegEye /> : <FaRegEyeSlash />;
}

function Spinner() {
    return (
        <div className="flex justify-center items-center animate-spin">
            <CgSpinnerAlt />
        </div>
    );
}

export default Login;

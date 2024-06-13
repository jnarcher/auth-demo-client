import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { CgSpinnerAlt } from "react-icons/cg";

function SignUp() {
    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLParagraphElement>(null);

    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");
    const [pwdConfirm, setPwdConfirm] = useState("");
    const [pwdVisible, setPwdVisible] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const { signup } = useAuth();

    const nav = useNavigate();

    useEffect(() => {
        userRef.current?.focus();
    }, []);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (pwd !== pwdConfirm) {
            setError("Passwords must match")
            return
        }

        setLoading(true);
        try {
            await signup(user, pwd)
            setUser("");
            nav("/dashboard");
        } catch (err: any) {
            if (!err?.response) {
                setError("No server response.");
            } else {
                console.error(err.response)
                setError(err.response.data.error);
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
                    <h1 className="mb-10 font-bold text-5xl">
                        <span className="bg-clip-text bg-gradient-to-tr from-violet-400 to-pink-400 font-extrabold text-transparent">🔒 Auth Demo</span>
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
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setPwdVisible(!pwdVisible);
                                        }}
                                        tabIndex={-1}
                                        className="top-0 absolute p-3 rounded-e.md text-neutral-400 end-0"
                                    >
                                        <PwdVisibleToggle
                                            visible={pwdVisible}
                                        />
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 mb-5">
                                <label
                                    className="font-bold text-neutral-300 select-none"
                                    htmlFor="passInputConfirm"
                                >
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={pwdVisible ? "text" : "password"}
                                        id="passInputConfirm"
                                        placeholder="••••••••"
                                        value={pwdConfirm}
                                        required
                                        onChange={(e) => setPwdConfirm(e.target.value)}
                                        className="bg-neutral-700 px-4 py-2 rounded-md w-full outline outline-1 outline-neutral-600"
                                    />
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setPwdVisible(!pwdVisible);
                                        }}
                                        tabIndex={-1}
                                        className="top-0 absolute p-3 rounded-e.md text-neutral-400 end-0"
                                    >
                                        <PwdVisibleToggle
                                            visible={pwdVisible}
                                        />
                                    </button>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="bg-gradient-to-tr from-violet-400 to-pink-400 hover:shadow-md mt-3 px-5 p-2 rounded-lg w-full h-10 font-bold text-white transition-all hover:-translate-y-[2px]"
                            >
                                {loading ? <Spinner /> : "Sign Up"}
                            </button>
                            <div className="flex gap-2 mt-5">
                                <span>Already have an account?</span>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        nav("/login")
                                    }}
                                    className="font-bold text-violet-400 hover:text-violet-300 hover:underline"
                                >
                                    Log In
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
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
export default SignUp;

import { useState } from "react";
import axios from "../api/axios";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthProvider";

const HI_URL = "/protected/hello";

function Root() {
    const { user } = useAuth();

    const [hiRes, setHiRes] = useState<string>("");

    const sayHi = async () => {
        try {
            const res = await axios.get(HI_URL);
            console.log(res.data);
            setHiRes(JSON.stringify(res.data));
        } catch (err: any) {
            setHiRes(JSON.stringify(err.response, null, 2));
        }
    };

    return (
        <div className="flex flex-col h-screen">
            <main className="flex flex-grow justify-center items-center">
                <div className="flex flex-col justify-center items-center">
                    <button
                        onClick={sayHi}
                        className="bg-white m-5 p-2 rounded-lg text-black"
                    >
                        Say Hi
                    </button>
                    <p className="max-w-[1000px]">{hiRes}</p>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Root;

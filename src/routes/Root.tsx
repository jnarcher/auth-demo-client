import Footer from "../components/Footer";
import Header from "../components/Header";

function Root() {
    return (
        <div className="flex flex-col h-screen">
            <Header />
            <main className="flex-grow">
                outlet
            </main>
            <Footer />
        </div>
    );
}

export default Root;

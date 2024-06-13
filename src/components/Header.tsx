import { useAuth } from "../context/AuthProvider";

function Header() {
    const { user } = useAuth();

    return <div>Hello {user?.first_name}</div>;
}

export default Header;

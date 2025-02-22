import {Link} from "react-router-dom";

function Logo() {
    return <Link to="/">
        <img src="/cq-logo.png" alt="Capitals Quiz logo" className="max-w-100" />
    </Link>;
}

export default Logo;
import cn from "classnames";

import "./loader.scss";

type LoaderProps = {
    className?: string;
}

const Loader: React.FC<LoaderProps> = ({ className }) => {
    const loaderClass = cn("loader", className);

    return (
        <div className={loaderClass} />
    );
};

export default Loader;
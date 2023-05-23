import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import cn from "classnames";

import { useLink } from "../../context/LinkContext";
import { validateUrl } from "../../utils/url";

import "./input.scss";
import Loader from "../Loader/Loader";

type InputProps = {
    handleChange: (link: string) => void;
}

const Input: React.FC<InputProps> = ({ handleChange }) => {
    const [navigateLink, setNavigateLink] = useState<string>("/");
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const audioSrc: string = useLink();

    const inputWrapperClass = cn(
        "form__input-wrapper", {
        "form__input-wrapper_invalid": error,
    });

    let navigate = useNavigate();
    useEffect(() => {
        navigate(navigateLink)
    }, [navigateLink]);

    const resetError = () => setError("");

    const handleClick = async () => {
        try {
            setIsLoading(true);
            await validateUrl(audioSrc);
            resetError();
            setNavigateLink("/player");
        } catch (error: any) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <label className="form__title">Insert the link</label>
            <div className="form__input">
                <div className={inputWrapperClass}>
                    {isLoading && <Loader className="loader_colored" />}
                    <input className="form__text" placeholder="https://" type="url" id="link" name="link" value={audioSrc} onChange={(event) => handleChange(event.target.value)} />
                </div>
                <button className="form__button" onClick={handleClick}></button>
                {error ? <p className="form__error">{error}</p> : null}
            </div>
        </>);
};

export default Input;
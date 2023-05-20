import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useLink } from "../../context/LinkContext";

import "./input.scss";

type InputProps = {
    handleChange: (link: string) => void;
}

const Input: React.FC<InputProps> = ({ handleChange }) => {
    const [navigateLink, setNavigateLink] = useState<string>("/");
    const [error, setError] = useState<string>("");

    const audioSrc: string = useLink();

    const isUrlValid = async (): Promise<boolean> => {
        let isValid: boolean = false;
        try {
            const url: URL = new URL(audioSrc);
            isValid = /^(https?:)/.test(url.protocol);
            if (isValid) {
                const contentType = await getContentType();
                isValid = !!contentType && contentType.startsWith("audio");
                setError(isValid ? "" : "This's not an audio");
            } else {
                setError("URL is invalid");
            }
        } catch (error: any) {
            isValid = false;
            setError(error.message);
        } finally {
            return isValid;
        }
    };

    const getContentType = async (): Promise<string | null> => {
        const response = await fetch(audioSrc, { method: "HEAD" });
        if (response && !response.ok) {
            setError(`Request is failed with ${response.status} error`);
            return null;
        } else {
            return response.headers.get("Content-Type");
        }
    };

    const handleClick = async () => {
        const isLinkValid = await isUrlValid();
        setNavigateLink(isLinkValid ? "/player" : "/");
    };

    let navigate = useNavigate();
    useEffect(() => {
        navigate(navigateLink)
    }, [navigateLink]);

    return (
        <>
            <label className="form__title">Insert the link</label>
            <div className="form__input">
                <div className={error ? "form__input-wrapper form__input-wrapper_invalid" : "form__input-wrapper"}>
                    <input className="form__text" placeholder="https://" type="url" id="link" name="link" value={audioSrc} onChange={(event) => handleChange(event.target.value)} />
                </div>
                <button className="form__button" onClick={handleClick}></button>
                {error ? <p className="form__error">{error}</p> : null}
            </div>
        </>);
};

export default Input;
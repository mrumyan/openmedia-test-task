import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import AudioPlayer from "../AudioPlayer/AudioPlayer";
import Input from "../Input/Input";

import { LinkContext, LinkContextType } from "../../context/LinkContext";

import "./form.scss";

const Form: React.FC = () => {
    const [link, setLink] = useState<LinkContextType>("");

    const handleChange = (link: string) => setLink(link);

    return (
        <LinkContext.Provider value={link}>
            <Routes>
                <Route path="/" element={<Input handleChange={handleChange} />} />
                <Route path="/player" element={<AudioPlayer />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </LinkContext.Provider>
    );
};

export default Form;
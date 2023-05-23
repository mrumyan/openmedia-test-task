const INVALID_PROTOCOL_ERR_MSG: string = "URL is invalid";
const INVALID_FORMAT_ERR_MSG: string = "This's not an audio file";

const getContentType = async (src: string): Promise<string | null> => {
    try {
        const response = await fetch(src, { method: "HEAD" });
        if (response && !response.ok) {
            throw new Error(`Request is failed with ${response.status} error`);
        } else {
            return response.headers.get("Content-Type");
        }
    } catch (error: any) {
        throw new Error(error);
    }
};

export const validateUrl = async (src: string) => {
    try {
        const url: URL = new URL(src);
        let isProtocolValid = /^(https?:)/.test(url.protocol);
        if (isProtocolValid) {
            const contentType = await getContentType(src);
            if (!contentType || !contentType.startsWith("audio")) {
                throw new Error(INVALID_FORMAT_ERR_MSG);
            }
        } else {
            throw new Error(INVALID_PROTOCOL_ERR_MSG);
        }
    } catch (error: any) {
        throw new Error(error.message || error);
    }
};

import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";

import Form from "./components/Form/Form";

import { addRequirements } from "./modules/requirements";

addRequirements();

const root = ReactDOM.createRoot(document.getElementById("form") as HTMLElement);

root.render(
    <HashRouter>
        <Form />
    </HashRouter>
);
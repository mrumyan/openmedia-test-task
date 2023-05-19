import { addRequirements } from "./modules/requirements";

import React from "react";
import ReactDOM from 'react-dom/client';

import Form from "./components/Form/Form";

addRequirements();

const root = ReactDOM.createRoot(document.getElementById("form"));

root.render(<Form />);
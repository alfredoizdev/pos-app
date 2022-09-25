import { StrictMode } from "react";
import * as ReactDOMClient from "react-dom/client";
import { AppProvider } from "./context/index";

import App from "./App";

const rootElement: any = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement);

root.render(
	<StrictMode>
		<AppProvider>
			<App />
		</AppProvider>
	</StrictMode>
);

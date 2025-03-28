
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThirdwebProvider } from "thirdweb/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { defineChain, createThirdwebClient } from "thirdweb";

const queryClient = new QueryClient();
const client = createThirdwebClient({
  clientId: "9db4f27b3ff418eb08e209f9d863cce7",
});
const chain = defineChain(1329);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThirdwebProvider client={client} chain={chain}>
        <App />
      </ThirdwebProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import AppLayout from "./components/AppLayout";
import PropertiesPage from "./pages/PropertiesPage";
import { ThemeProvider } from "./components/providers/ThemeProvider";
import PropertyDetail from "./features/property/PropertyDetail";
import PropertyFormPage from "./pages/PropertyFormPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate replace to="properties" />,
  },

  {
    element: <AppLayout />,

    children: [
      {
        path: "properties",
        element: <PropertiesPage />,
      },
      {
        path: "properties/:propertyId",
        element: <PropertyDetail />,
      },
      {
        path: "new-property",
        element: <PropertyFormPage />,
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ThemeProvider defaultTheme="system" storageKey="real-estate-mode">
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

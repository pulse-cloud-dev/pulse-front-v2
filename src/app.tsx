import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Toaster } from "react-hot-toast";

import "@/app/styles/index.css";
import "@/shared/modules/select-ui/styles/index.css";

import { QueryProvider, RouterProvider } from "@/app/contexts";
import { ModalProvider } from "@/shared/modules";
import { useTheme } from "@/shared/lib/hooks";
import { keyConst } from "@/shared/constants";

import { ErrorFallback } from "@/shared/boundaries"

console.log(`
  '||''|.  '||'  '|' '||'       .|'''.|  '||''''|  
   ||   ||  ||    |   ||        ||..  '   ||  .    
   ||...|'  ||    |   ||         ''|||.   ||''|    
   ||       ||    |   ||       .     '||  ||       
  .||.       '|..'   .||.....| |'....|'  .||.....|                                                  
  `);


function App() {
  useTheme(keyConst.THEME);

  return (
    <QueryProvider>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<div>로딩 중입니다...</div>}>
          <ModalProvider> 
            <Toaster position="bottom-left" />
            <RouterProvider />
          </ModalProvider>
        </Suspense>
      </ErrorBoundary>
    </QueryProvider>
  );
}

export default App;

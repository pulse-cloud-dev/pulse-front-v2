import { Toaster } from "react-hot-toast";

import "@/app/styles/index.css";
import "@/shared/modules/select-ui/styles/index.css";
import { QueryProvider, RouterProvider } from "@/app/contexts";
import { ModalProvider } from "@/shared/modules";
import { useTheme } from "@/shared/lib/hooks";
import { keyConst } from "@/shared/constants";

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
      <ModalProvider>
        <Toaster position="bottom-left" />
        <RouterProvider />
      </ModalProvider>
    </QueryProvider>
  );
}

export default App;

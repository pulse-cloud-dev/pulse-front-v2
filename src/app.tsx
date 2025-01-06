import { Toaster } from "react-hot-toast";

import "@/app/styles/index.css";
import { QueryProvider, RouterProvider } from "@/app/contexts";
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
      <Toaster position="bottom-left" />
      <RouterProvider />
    </QueryProvider>
  );
}

export default App;

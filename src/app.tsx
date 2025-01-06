import "@/app/styles/index.css";
import { RouterProvider } from "@/app/providers";
import { useTheme } from "./shared/lib/hooks";
import { keyConst } from "./shared/constants";

console.log(`
  '||''|.  '||'  '|' '||'       .|'''.|  '||''''|  
   ||   ||  ||    |   ||        ||..  '   ||  .    
   ||...|'  ||    |   ||         ''|||.   ||''|    
   ||       ||    |   ||       .     '||  ||       
  .||.       '|..'   .||.....| |'....|'  .||.....| 
                                                   
  `);

function App() {
  useTheme(keyConst.THEME);
  return <RouterProvider />;
}

export default App;

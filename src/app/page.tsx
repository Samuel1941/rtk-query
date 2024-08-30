import ClientLayout from "./ClientLayout";
import TypeCardForm from "@/components/TypeCardForm";
import TypeCardList from "@/components/TypeCardList";

function App() {
  return (
    <ClientLayout> 
      <TypeCardForm/>
      <TypeCardList/>
    </ClientLayout>

  )
  
}

export default App
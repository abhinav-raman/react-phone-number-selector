import { useEffect, useState } from "react";
import PhoneNumberField from "./components/PhoneNumberField";

function App() {
  const [number, setNumber] = useState("");

  useEffect(() => {
    console.log(number);
  }, [number]);

  return (
    <main className="p-8">
      <div className="w-1/2">
        <PhoneNumberField
          className=""
          value={number}
          onChange={(val) => setNumber(val as string)}
        />
      </div>
    </main>
  );
}

export default App;

"use client";

import { useCreateTypeCardMutation } from "@/api/typeCardSlice";
function TypeCardForm() {
 
  const [createTypeCard] = useCreateTypeCardMutation();

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target.elements.name.value.trim();

    createTypeCard({
      name,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="New type card" required />
      <button type="submit">Agregar</button>
    </form>
  );
}

export default TypeCardForm;
"use client";

import { useState } from "react";

export default function CounterDemo() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount((currentCount) => currentCount + 1);
  }

  return (
    <button type="button" onClick={handleClick}>
      คลิกแล้ว {count} ครั้ง
    </button>
  );
}

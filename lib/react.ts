import React from "react";

export function useHabak() {
  const [value, setValue] = React.useState<string>("habak");

  return { value, setValue };
}

import { LadderReact } from "@ladder/dom";

export function LadderKit({ children }: { children?: React.ReactNode }) {
  return (
    <LadderReact
      players={Array(6)
        .fill("")
        .map((x, i) => ({ id: `${i}`, value: x, poleId: `${i}` }))}
      results={Array(6)
        .fill("")
        .map((x, i) => ({ id: `${i}`, value: x, poleId: `${i}` }))}
    >
      {children}
    </LadderReact>
  );
}

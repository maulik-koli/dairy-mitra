const EXAMPLES = [
  "ભાવિનભાઈ ને આજથી 2 લિટર ભેંસનું દૂધ ચાલુ કર્યુ, મહિને bill આપશે.",
  "કાલે રમાબેનને દૂધ બંધ રાખજો, એ ગામડે જાય છે.",
  "પટેલ સાહેબનું 1 લિટરથી 1.5 લિટર કરી નાખો આજથી.",
  "કાલે સુરેશને દૂધ બંધ"
] as const;

type ExampleChipsProps = {
  onSelect: (value: string) => void;
};

export function ExampleChips({ onSelect }: ExampleChipsProps) {
  return (
    <div>
      <p className="mb-3 text-sm font-medium text-[var(--muted)]">Demo phrases</p>
      <div className="flex flex-wrap gap-2">
        {EXAMPLES.map((example) => (
          <button key={example} type="button" className="chip text-left text-sm" onClick={() => onSelect(example)}>
            {example}
          </button>
        ))}
      </div>
    </div>
  );
}

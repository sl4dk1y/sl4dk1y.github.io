import type { CaseDiagramSpec } from '../content/cases'

function FlowSequence({ steps, connectLast = false }: { steps: string[]; connectLast?: boolean }) {
  return <ol className="flow-sequence">
    {steps.map((step, index) => <li className="flow-node" key={step}>
      {step}
      {connectLast && index === steps.length - 1 && <FlowConnector className="flow-connector--outgoing" />}
    </li>)}
  </ol>
}

function FlowConnector({ className = '' }: { className?: string }) {
  return <span className={`flow-connector ${className}`} aria-hidden="true" />
}

function FlowBranches({ branches }: { branches: { title?: string; steps: string[] }[] }) {
  return <div className="flow-branches">
    {branches.map((branch) => <section className="flow-branch" key={branch.title ?? branch.steps.join('-')}>
      {branch.title && <h3>{branch.title}</h3>}
      <FlowSequence steps={branch.steps} />
    </section>)}
  </div>
}

function DiagramBody({ diagram }: { diagram: CaseDiagramSpec }) {
  if (diagram.type === 'separate-sequences') {
    return <div className="flow-independent">
      <section>
        <h3>{diagram.primaryTitle}</h3>
        <FlowSequence steps={diagram.primary} />
      </section>
      <section className="flow-independent__secondary">
        <h3>{diagram.secondaryTitle}</h3>
        <FlowSequence steps={diagram.secondary} />
      </section>
    </div>
  }

  if (diagram.type === 'branches') {
    return <div className="flow-structured flow-structured--branches">
      <FlowSequence steps={diagram.lead} connectLast />
      <FlowBranches branches={diagram.branches} />
      <FlowConnector />
      <div className="flow-node flow-node--outcome">{diagram.outcome}</div>
    </div>
  }

  if (diagram.type === 'fanout') {
    return <div className="flow-structured flow-structured--fanout">
      <FlowSequence steps={diagram.lead} connectLast />
      <FlowBranches branches={diagram.outputs.map((output) => ({ steps: [output] }))} />
    </div>
  }

  return <FlowSequence steps={diagram.steps} />
}

export function CaseDiagram({
  title,
  caption,
  diagram,
}: {
  title: string
  caption: string
  diagram: CaseDiagramSpec
}) {
  return <figure className={`case-visual case-visual--${diagram.type}`} aria-label={title}>
    <DiagramBody diagram={diagram} />
    <figcaption>{caption}</figcaption>
  </figure>
}

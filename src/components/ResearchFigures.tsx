import { ragFullCorpusNprobeDev, ragReducedTestResults } from '../content/cases'
import type { Locale } from '../content/types'

type Metrics = { method: string; recallAt10: number; ndcgAt10: number }

function ResearchChart({
  title,
  scope,
  description,
  rows,
  labels,
  locale,
}: {
  title: string
  scope: string
  description: string
  rows: Metrics[]
  labels: { method: string; recall: string; ndcg: string; table: string; scale: string }
  locale: Locale
}) {
  const format = (value: number) => new Intl.NumberFormat(locale === 'ru' ? 'ru-RU' : 'en-US', {
    minimumFractionDigits: 6,
    maximumFractionDigits: 6,
  }).format(value)

  return <figure className="research-figure">
    <figcaption className="research-figure__caption">
      <p className="section-kicker">{scope}</p>
      <h3>{title}</h3>
      <p>{description}</p>
    </figcaption>
    <p className="research-chart__scale">{labels.scale}</p>
    <div className="research-chart" aria-hidden="true">
      {rows.map((row) => <div className="research-chart__row" key={row.method}>
        <h4>{row.method}</h4>
        <div className="research-chart__metric">
          <span>{labels.recall}</span>
          <span className="research-chart__track"><span className="research-chart__bar research-chart__bar--recall" style={{ width: `${row.recallAt10 * 100}%` }} /></span>
          <output>{format(row.recallAt10)}</output>
        </div>
        <div className="research-chart__metric">
          <span>{labels.ndcg}</span>
          <span className="research-chart__track"><span className="research-chart__bar research-chart__bar--ndcg" style={{ width: `${row.ndcgAt10 * 100}%` }} /></span>
          <output>{format(row.ndcgAt10)}</output>
        </div>
      </div>)}
    </div>
    <div className="research-table-wrap">
      <table className="research-table">
        <caption>{labels.table}: {title}</caption>
        <thead><tr><th scope="col">{labels.method}</th><th scope="col">{labels.recall}</th><th scope="col">{labels.ndcg}</th></tr></thead>
        <tbody>{rows.map((row) => <tr key={row.method}><th scope="row">{row.method}</th><td>{format(row.recallAt10)}</td><td>{format(row.ndcgAt10)}</td></tr>)}</tbody>
      </table>
    </div>
  </figure>
}

export function RagResearchFigures({
  locale,
  labels,
}: {
  locale: Locale
  labels: {
    firstTitle: string
    firstScope: string
    firstDescription: string
    secondTitle: string
    secondScope: string
    secondDescription: string
    recall: string
    ndcg: string
    method: string
    figureTable: string
    fullScale: string
  }
}) {
  const chartLabels = {
    method: labels.method,
    recall: labels.recall,
    ndcg: labels.ndcg,
    table: labels.figureTable,
    scale: labels.fullScale,
  }

  return <div className="research-figures">
    <ResearchChart title={labels.firstTitle} scope={labels.firstScope} description={labels.firstDescription} rows={ragReducedTestResults} labels={chartLabels} locale={locale} />
    <ResearchChart title={labels.secondTitle} scope={labels.secondScope} description={labels.secondDescription} rows={ragFullCorpusNprobeDev} labels={chartLabels} locale={locale} />
  </div>
}

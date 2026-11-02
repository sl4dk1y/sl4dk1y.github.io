import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowDownRight, ArrowLeft, ArrowUpRight, Check, CloudRain, Copy, Menu, Moon, Sun, Sunset, TreePine, X, type LucideIcon } from 'lucide-react'
import { AmbientGallery } from './components/AmbientGallery'
import { CaseDiagram } from './components/CaseDiagrams'
import { RagResearchFigures } from './components/ResearchFigures'
import { fallbackHeroArtwork, heroArtworks } from './content/artworks'
import { caseStudies, featuredCaseOrder } from './content/cases'
import { profile, seo } from './content/portfolio'
import { translations } from './content/translations'
import type { Locale } from './content/types'
import { themeCycle, type Theme } from './content/types'
import './fonts.css'

const avatarSources = [profile.avatar, profile.avatarFallback, profile.githubAvatar].filter((source) => source.length > 0)
const themeIcons: Record<Theme, LucideIcon> = { day: Sun, sunset: Sunset, forest: TreePine, rain: CloudRain, night: Moon }
const activeCase = caseStudies.find((item) => item.path === window.location.pathname.replace(/\/$/, '') + '/')
const featuredStudies = featuredCaseOrder.flatMap((id) => caseStudies.filter((study) => study.id === id && study.featured))

function readTheme(): Theme {
  const storedTheme = document.documentElement.dataset.theme
  return themeCycle.find((option) => option === storedTheme) ?? 'day'
}

function getNextTheme(theme: Theme): Theme {
  const currentIndex = themeCycle.indexOf(theme)
  return themeCycle[(currentIndex + 1) % themeCycle.length]
}

function readLocale(): Locale {
  try {
    const storedLocale = window.localStorage.getItem('portfolio-locale')
    if (storedLocale === 'en' || storedLocale === 'ru') return storedLocale
  } catch {
    // The default language remains available when storage is blocked.
  }
  return 'en'
}

function chooseHeroArtwork() {
  if (heroArtworks.length === 0 || typeof window === 'undefined') return fallbackHeroArtwork
  try {
    const previousId = window.sessionStorage.getItem('portfolio-hero-artwork')
    const candidates = heroArtworks.length > 1 ? heroArtworks.filter((artwork) => artwork.id !== previousId) : heroArtworks
    const selected = candidates[Math.floor(Math.random() * candidates.length)] ?? fallbackHeroArtwork
    window.sessionStorage.setItem('portfolio-hero-artwork', selected.id)
    return selected
  } catch {
    return heroArtworks[Math.floor(Math.random() * heroArtworks.length)] ?? fallbackHeroArtwork
  }
}

const selectedHeroArtwork = chooseHeroArtwork()

function Avatar() {
  const [sourceIndex, setSourceIndex] = useState(0)
  return <span className="avatar avatar--small" aria-hidden="true">
    {sourceIndex >= avatarSources.length ? <span className="avatar__fallback">sl</span> : <img src={avatarSources[sourceIndex]} alt="" width="30" height="30" loading="eager" decoding="async" onError={() => setSourceIndex((current) => current + 1)} />}
  </span>
}

function GithubMark({ size = 17 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .75a11.25 11.25 0 0 0-3.56 21.92c.56.1.77-.24.77-.54v-2.1c-3.14.68-3.8-1.33-3.8-1.33-.5-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1 .1.77 1.98 3.02 1.4.1-.73.4-1.22.73-1.5-2.5-.29-5.13-1.25-5.13-5.57 0-1.23.44-2.23 1.16-3.02-.12-.29-.5-1.44.11-2.99 0 0 .95-.3 3.1 1.15a10.8 10.8 0 0 1 5.64 0c2.15-1.45 3.1-1.15 3.1-1.15.61 1.55.23 2.7.11 2.99.72.79 1.16 1.79 1.16 3.02 0 4.33-2.64 5.28-5.15 5.56.4.35.76 1.03.76 2.08v3.08c0 .3.2.65.78.54A11.25 11.25 0 0 0 12 .75Z" /></svg>
}

function SectionTitle({ id, label, title }: { id: string; label: string; title: string }) {
  return <header className="section-title"><p className="section-kicker">{label}</p><h2 id={id}>{title}</h2></header>
}

function App() {
  const [locale, setLocale] = useState<Locale>(readLocale)
  const [theme, setTheme] = useState<Theme>(readTheme)
  const [heroArtwork, setHeroArtwork] = useState(selectedHeroArtwork)
  const [menuOpen, setMenuOpen] = useState(false)
  const [emailCopyStatus, setEmailCopyStatus] = useState<'idle' | 'copied' | 'failed'>('idle')
  const primaryNavRef = useRef<HTMLElement>(null)
  const menuToggleRef = useRef<HTMLButtonElement>(null)
  const persistThemeRef = useRef(false)
  const emailCopyTimer = useRef<number | null>(null)
  const t = translations[locale]

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme
    const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
    const backgroundColor = window.getComputedStyle(document.documentElement).getPropertyValue('--bg').trim()
    if (themeColor && backgroundColor) themeColor.content = backgroundColor
    if (!persistThemeRef.current) return
    try { window.localStorage.setItem('portfolio-theme', theme) } catch { /* Theme remains active for this page. */ }
    persistThemeRef.current = false
  }, [theme])

  useEffect(() => {
    document.documentElement.lang = locale
    const title = activeCase?.title[locale] ?? seo.title[locale]
    const descriptionText = activeCase?.description[locale] ?? seo.description[locale]
    document.title = title
    const setMeta = (selector: string, content: string) => {
      const element = document.querySelector<HTMLMetaElement>(selector)
      if (element) element.content = content
    }
    setMeta('meta[name="description"]', descriptionText)
    setMeta('meta[property="og:title"]', title)
    setMeta('meta[property="og:description"]', descriptionText)
    setMeta('meta[name="twitter:title"]', title)
    setMeta('meta[name="twitter:description"]', descriptionText)
  }, [locale])

  useEffect(() => {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const targets = document.querySelectorAll<HTMLElement>('[data-reveal]')
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      entry.target.classList.add('is-visible')
      observer.unobserve(entry.target)
    }), { rootMargin: '0px 0px -8% 0px', threshold: 0.08 })
    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setMenuOpen(false)
      menuToggleRef.current?.focus()
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  useEffect(() => {
    if (menuOpen && window.matchMedia('(max-width: 800px)').matches) primaryNavRef.current?.querySelector<HTMLAnchorElement>('a')?.focus()
  }, [menuOpen])

  useEffect(() => () => {
    if (emailCopyTimer.current !== null) window.clearTimeout(emailCopyTimer.current)
  }, [])

  const copyEmail = async () => {
    if (emailCopyTimer.current !== null) window.clearTimeout(emailCopyTimer.current)
    try {
      await navigator.clipboard.writeText(profile.email)
      setEmailCopyStatus('copied')
      emailCopyTimer.current = window.setTimeout(() => { setEmailCopyStatus('idle'); emailCopyTimer.current = null }, 1800)
    } catch { setEmailCopyStatus('failed') }
  }

  const changeTheme = () => { persistThemeRef.current = true; setTheme(getNextTheme(theme)) }
  const changeLocale = () => {
    const nextLocale: Locale = locale === 'en' ? 'ru' : 'en'
    try { window.localStorage.setItem('portfolio-locale', nextLocale) } catch { /* The current page still changes language. */ }
    setLocale(nextLocale)
  }
  const nextTheme = getNextTheme(theme)
  const themePosition = themeCycle.indexOf(theme) + 1
  const themeDescription = t.theme.cycleDescription.replace('{current}', t.theme[theme]).replace('{position}', String(themePosition)).replace('{next}', t.theme[nextTheme])
  const ThemeIcon = themeIcons[theme]
  const navigation = [
    { id: 'work', href: '/#work', label: t.nav.work },
    { id: 'practice', href: '/#practice', label: t.nav.practice },
    { id: 'notes', href: '/#notes', label: t.nav.notes },
    { id: 'about', href: '/#about', label: t.nav.about },
    { id: 'contact', href: '/#contact', label: t.nav.contact },
  ]
  const home = !activeCase

  return <>
    {home && <AmbientGallery />}
    <a className="skip-link" href="#main">{t.a11y.skip}</a>
    <header className="site-header">
      <div className="header-inner page-shell">
        <a className="brand" href={home ? '#top' : '/'} aria-label={`${profile.handle}, ${t.a11y.home}`}><Avatar /><span>{profile.handle}</span></a>
        <nav ref={primaryNavRef} id="primary-nav" className={`primary-nav${menuOpen ? ' is-open' : ''}`} aria-label={t.a11y.navigation}>
          {navigation.map((item) => <a key={item.id} href={home ? `#${item.id}` : item.href} onClick={() => {
            setMenuOpen(false)
            if (window.matchMedia('(max-width: 800px)').matches) window.requestAnimationFrame(() => menuToggleRef.current?.focus())
          }}>{item.label}</a>)}
        </nav>
        <div className="header-actions">
          <a className="header-github" href={profile.github} target="_blank" rel="noreferrer noopener" aria-label={t.a11y.githubNewTab}><GithubMark size={17} /><span>GitHub</span><ArrowUpRight size={13} aria-hidden="true" /></a>
          <span className="header-divider" aria-hidden="true" />
          <button className="locale-toggle" type="button" onClick={changeLocale} aria-label={`${t.a11y.switchLanguage} ${t.language}`}><span className={locale === 'en' ? 'is-current' : ''}>EN</span><span aria-hidden="true">/</span><span className={locale === 'ru' ? 'is-current' : ''}>RU</span></button>
          <button className="icon-button theme-toggle" type="button" onClick={changeTheme} aria-label={themeDescription}><ThemeIcon size={17} aria-hidden="true" /><span className="theme-toggle__indicators" aria-hidden="true">{themeCycle.map((option) => <span key={option} className={option === theme ? 'is-active' : undefined} />)}</span><span className="theme-toggle__tooltip" aria-hidden="true">{themeDescription}</span></button>
          <button ref={menuToggleRef} className="icon-button menu-toggle" type="button" aria-label={menuOpen ? t.nav.close : t.nav.menu} aria-expanded={menuOpen} aria-controls="primary-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}</button>
        </div>
      </div>
    </header>

    <main id="main">
      {activeCase ? <article className="case-page page-shell" aria-labelledby="case-title">
        <a className="case-back" href="/#work"><ArrowLeft size={15} aria-hidden="true" />{t.case.back}</a>
        <header className="case-header">
          <p className="section-kicker">{activeCase.eyebrow[locale]}</p>
          <h1 id="case-title">{activeCase.name}</h1>
          <p>{activeCase.summary[locale]}</p>
          <p className="case-status">{activeCase.maturity[locale]}</p>
          <ul className="case-tags" aria-label={t.work.focus}>{activeCase.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
        </header>
        <div className="case-overview">
          <section><h2>{t.case.overview}</h2><p>{activeCase.summary[locale]}</p></section>
          <section><h2>{t.case.problem}</h2><p>{activeCase.problem[locale]}</p></section>
          <section><h2>{t.case.approach}</h2><p>{activeCase.approach[locale]}</p></section>
        </div>
        {activeCase.id === 'rag-retrieval-research' ? <section className="case-diagram-section case-diagram-section--research" aria-labelledby="research-results-title">
          <SectionTitle id="research-results-title" label={t.case.research.eyebrow} title={t.case.research.title} />
          <RagResearchFigures locale={locale} labels={t.case.research} />
        </section> : <section className="case-diagram-section">
          <SectionTitle id="case-architecture-title" label={t.case.diagramLabel} title={t.case.architecture} />
            <CaseDiagram title={activeCase.diagramTitle[locale]} caption={activeCase.diagramCaption[locale]} diagram={activeCase.architecture[locale]} />
        </section>}
        <section className="case-decisions">
          <h2>{t.case.decisions}</h2>
          <ul>{activeCase.decisions[locale].map((decision) => <li key={decision}>{decision}</li>)}</ul>
        </section>
        <div className="case-evidence">
          <section><h2>{t.case.validation}</h2><p>{activeCase.validation[locale]}</p></section>
          <section><h2>{t.case.outcome}</h2><p>{activeCase.outcome[locale]}</p>{activeCase.caveat && <p className="case-caveat"><strong>{t.case.caveat}:</strong> {activeCase.caveat[locale]}</p>}</section>
        </div>
          <div className="case-repository-row">
            <a className="case-repository text-link text-link--accent" href={activeCase.repository} target="_blank" rel="noreferrer noopener">{t.case.repository}<ArrowUpRight size={14} aria-hidden="true" /></a>
            {activeCase.repositoryStatus && <p className="case-repository-status">{activeCase.repositoryStatus[locale]}</p>}
          </div>
      </article> : <>
        <section className="hero page-shell" id="top" aria-labelledby="hero-title">
          <div className="hero__copy" data-hero-enter>
            <p className="hero__eyebrow">{t.hero.eyebrow}</p>
            <h1 id="hero-title"><span>{t.hero.firstLine}</span><span>{t.hero.secondLine}</span></h1>
            <p className="hero__intro">{t.hero.intro}</p>
            <svg className="hero__signal" viewBox="0 0 320 56" aria-hidden="true" focusable="false">
              <path className="hero__signal-harmonic" d="M2 32c18 0 20-8 36-8s21 14 38 14 22-10 38-10h12c12 0 15-12 29-12s18 26 33 26 18-14 34-14h15c11 0 15-9 28-9s17 17 30 17 18-8 33-8h50" />
              <path className="hero__signal-track" pathLength="100" d="M2 28h23c8 0 10-10 18-10s10 20 19 20 10-17 19-17 10 11 19 11h15c8 0 11-18 20-18s11 30 21 30 11-19 21-19h20c8 0 11-11 19-11s11 22 20 22 11-13 20-13h62" />
              <path className="hero__signal-pulse" pathLength="100" d="M2 28h23c8 0 10-10 18-10s10 20 19 20 10-17 19-17 10 11 19 11h15c8 0 11-18 20-18s11 30 21 30 11-19 21-19h20c8 0 11-11 19-11s11 22 20 22 11-13 20-13h62" />
              <path className="hero__signal-pulse hero__signal-pulse--echo" pathLength="100" d="M2 28h23c8 0 10-10 18-10s10 20 19 20 10-17 19-17 10 11 19 11h15c8 0 11-18 20-18s11 30 21 30 11-19 21-19h20c8 0 11-11 19-11s11 22 20 22 11-13 20-13h62" />
            </svg>
            <div className="hero__links"><a className="text-link text-link--accent" href="#work">{t.hero.projects}<ArrowDownRight size={15} aria-hidden="true" /></a><a className="text-link" href={profile.github} target="_blank" rel="noreferrer noopener">{t.hero.github}<ArrowUpRight size={14} aria-hidden="true" /></a></div>
          </div>
          <figure className="hero__artwork" data-reveal>
            <div className="hero__artwork-frame"><span className="hero__artwork-image-clip" style={{ aspectRatio: `${heroArtwork.width} / ${heroArtwork.height}` }}>
              <img src={heroArtwork.src} alt={heroArtwork.alt[locale]} width={heroArtwork.width} height={heroArtwork.height} loading="eager" fetchPriority="high" decoding="async" onError={() => { if (heroArtwork.id !== fallbackHeroArtwork.id) setHeroArtwork(fallbackHeroArtwork) }} />
            </span></div>
            <figcaption><a href={heroArtwork.source} target="_blank" rel="noreferrer noopener"><span>{heroArtwork.attribution[locale]}</span><ArrowUpRight size={12} aria-hidden="true" /></a></figcaption>
          </figure>
        </section>

        <section className="content-section page-shell work-section" id="work" aria-labelledby="work-title" data-reveal>
          <div className="section-heading-row"><div><SectionTitle id="work-title" label={t.work.eyebrow} title={t.work.title} /></div><p className="section-description">{t.work.intro}</p></div>
          <div className="work-list">{featuredStudies.map((study) => <article className="work-item" key={study.id}>
            <div className="work-item__primary"><p className="work-item__meta">{study.eyebrow[locale]}</p><p className="work-item__status">{t.work.maturity}: {study.maturity[locale]}</p><h3><a href={study.path}>{study.name}<ArrowUpRight size={17} aria-hidden="true" /></a></h3><p className="work-item__summary">{study.summary[locale]}</p><div className="work-item__tags">{study.tags.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}</div><div className="work-item__links"><a href={study.path}>{t.work.openCase}<ArrowUpRight size={13} aria-hidden="true" /></a><a href={study.repository} target="_blank" rel="noreferrer noopener">{t.work.repository}<ArrowUpRight size={13} aria-hidden="true" /></a></div></div>
            <div className="work-item__details"><section><h4>{t.work.problem}</h4><p>{study.problem[locale]}</p></section><section><h4>{t.work.approach}</h4><p>{study.approach[locale]}</p></section></div>
          </article>)}</div>
          <section className="more-work" aria-labelledby="more-work-title">
            <div className="more-work__intro"><h3 id="more-work-title">{t.work.moreTitle}</h3><p>{t.work.moreIntro}</p></div>
            <div className="more-work__list">{caseStudies.filter((study) => !study.featured).map((study) => <article className="more-work__item" key={study.id}>
              <div className="more-work__content"><p className="work-item__meta">{study.eyebrow[locale]} · {study.maturity[locale]}</p><h4><a href={study.path}>{study.name}<ArrowUpRight size={15} aria-hidden="true" /></a></h4><p>{study.summary[locale]}</p>{study.repositoryStatus && <p className="work-item__publication-status">{study.repositoryStatus[locale]}</p>}</div>
              <div className="more-work__actions"><div className="work-item__links"><a href={study.path}>{t.work.openCase}<ArrowUpRight size={13} aria-hidden="true" /></a><a href={study.repository} target="_blank" rel="noreferrer noopener">{t.work.repository}<ArrowUpRight size={13} aria-hidden="true" /></a></div></div>
            </article>)}</div>
          </section>
        </section>

        <section className="content-section page-shell practice-section" id="practice" aria-labelledby="practice-title" data-reveal>
          <div className="section-heading-row"><div><SectionTitle id="practice-title" label={t.practice.eyebrow} title={t.practice.title} /></div><p className="section-description">{t.practice.intro}</p></div>
          <div className="practice-areas">{t.practice.areas.map((area) => <article key={area.title}><h3>{area.title}</h3><p>{area.text}</p></article>)}</div>
        </section>

        <section className="content-section page-shell process-section" id="process" aria-labelledby="process-title" data-reveal>
          <div className="section-heading-row"><div><SectionTitle id="process-title" label={t.process.eyebrow} title={t.process.title} /></div><p className="section-description">{t.process.intro}</p></div>
          <ol className="process-list">{t.process.steps.map((step) => <li key={step.title}><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol>
        </section>

        <section className="content-section page-shell notes-section" id="notes" aria-labelledby="notes-title" data-reveal>
          <div className="section-heading-row"><div><SectionTitle id="notes-title" label={t.notes.eyebrow} title={t.notes.title} /></div><p className="section-description">{t.notes.intro}</p></div>
          <div className="notes-list">{t.notes.items.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
          <a className="notes-source text-link" href="/projects/rag-retrieval-research/">{t.notes.source}<ArrowUpRight size={14} aria-hidden="true" /></a>
        </section>

        <section className="content-section page-shell about-section" id="about" aria-labelledby="about-title" data-reveal><div><SectionTitle id="about-title" label={t.about.eyebrow} title={t.about.title} /></div><div className="about-copy">{t.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></section>
        <section className="contact-section page-shell" id="contact" aria-labelledby="contact-title" data-reveal>
          <div className="contact-intro"><p className="section-kicker">{t.contact.eyebrow}</p><h2 id="contact-title">{t.contact.title}</h2><p className="contact-description">{t.contact.intro}</p></div>
          <a className="text-link text-link--accent" href={profile.github} target="_blank" rel="noreferrer noopener"><GithubMark size={16} /><span className="contact-link-label">{t.contact.link}</span><ArrowUpRight size={14} aria-hidden="true" /></a>
          <div className="contact-links"><a className="text-link" href={`mailto:${profile.email}`}><span className="contact-link-label">{profile.email}</span></a><button className="contact-copy" type="button" onClick={copyEmail} aria-label={t.contact.emailCopy} title={t.contact.emailCopy}>{emailCopyStatus === 'copied' ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}</button><span className="contact-copy-status" role="status" aria-live="polite" aria-atomic="true">{emailCopyStatus === 'copied' ? t.contact.emailCopied : emailCopyStatus === 'failed' ? t.contact.emailCopyFailed : ''}</span></div>
        </section>
      </>}
    </main>

    <footer className="site-footer page-shell"><a className="footer-brand" href={home ? '#top' : '/'}>{profile.handle}</a><p>{t.footer.note}</p><a className="footer-credits" href="/artwork/credits.html">{t.footer.artworkCredits}</a><span>© {new Date().getFullYear()}</span></footer>
  </>
}

export default App

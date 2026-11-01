import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowDownRight, ArrowUpRight, Check, CloudRain, Copy, Menu, Moon, Sun, Sunset, TreePine, X, type LucideIcon } from 'lucide-react'
import { AmbientGallery } from './components/AmbientGallery'
import { fallbackHeroArtwork, heroArtworks } from './content/artworks'
import { additionalTraining, education, experiences, languages, profile, projects, seo, technologyCategories } from './content/portfolio'
import { translations } from './content/translations'
import { themeCycle, type Locale, type Theme } from './content/types'
import './fonts.css'

const avatarUrl = profile.avatar
const avatarSources = [avatarUrl, profile.avatarFallback, profile.githubAvatar].filter((source) => source.length > 0)
const themeIcons: Record<Theme, LucideIcon> = {
  day: Sun,
  sunset: Sunset,
  forest: TreePine,
  rain: CloudRain,
  night: Moon,
}

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
    const candidates = heroArtworks.length > 1
      ? heroArtworks.filter((artwork) => artwork.id !== previousId)
      : heroArtworks
    const selected = candidates[Math.floor(Math.random() * candidates.length)] ?? fallbackHeroArtwork
    window.sessionStorage.setItem('portfolio-hero-artwork', selected.id)
    return selected
  } catch {
    return heroArtworks[Math.floor(Math.random() * heroArtworks.length)] ?? fallbackHeroArtwork
  }
}

const selectedHeroArtwork = chooseHeroArtwork()

function Avatar({ size = 'large' }: { size?: 'large' | 'small' }) {
  const [sourceIndex, setSourceIndex] = useState(0)

  return (
    <span className={`avatar avatar--${size}`} aria-hidden="true">
      {sourceIndex >= avatarSources.length ? (
        <span className="avatar__fallback">sl</span>
      ) : (
        <img
          src={avatarSources[sourceIndex]}
          alt=""
          width={size === 'large' ? 88 : 30}
          height={size === 'large' ? 88 : 30}
          loading="eager"
          decoding="async"
          fetchPriority={size === 'large' ? 'high' : 'auto'}
          onError={() => setSourceIndex((current) => current + 1)}
        />
      )}
    </span>
  )
}

function GithubMark({ size = 17 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .75a11.25 11.25 0 0 0-3.56 21.92c.56.1.77-.24.77-.54v-2.1c-3.14.68-3.8-1.33-3.8-1.33-.5-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1 .1.77 1.98 3.02 1.4.1-.73.4-1.22.73-1.5-2.5-.29-5.13-1.25-5.13-5.57 0-1.23.44-2.23 1.16-3.02-.12-.29-.5-1.44.11-2.99 0 0 .95-.3 3.1 1.15a10.8 10.8 0 0 1 5.64 0c2.15-1.45 3.1-1.15 3.1-1.15.61 1.55.23 2.7.11 2.99.72.79 1.16 1.79 1.16 3.02 0 4.33-2.64 5.28-5.15 5.56.4.35.76 1.03.76 2.08v3.08c0 .3.2.65.78.54A11.25 11.25 0 0 0 12 .75Z" /></svg>
}

function SectionTitle({ id, label, title }: { id: string; label: string; title: string }) {
  return (
    <header className="section-title">
      <p className="section-kicker">{label}</p>
      <h2 id={id}>{title}</h2>
    </header>
  )
}

function App() {
  const [locale, setLocale] = useState<Locale>(readLocale)
  const [theme, setTheme] = useState<Theme>(readTheme)
    const [heroArtwork, setHeroArtwork] = useState(selectedHeroArtwork)
  const [menuOpen, setMenuOpen] = useState(false)
  const primaryNavRef = useRef<HTMLElement>(null)
  const menuToggleRef = useRef<HTMLButtonElement>(null)
  const persistThemeRef = useRef(false)
  const [emailCopyStatus, setEmailCopyStatus] = useState<'idle' | 'copied' | 'failed'>('idle')
  const emailCopyTimer = useRef<number | null>(null)
  const t = translations[locale]

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme
    const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
    const backgroundColor = window.getComputedStyle(document.documentElement).getPropertyValue('--bg').trim()
    if (themeColor && backgroundColor) themeColor.content = backgroundColor
    if (!persistThemeRef.current) return

    try {
      window.localStorage.setItem('portfolio-theme', theme)
    } catch {
      // The selected theme still applies when storage is unavailable.
    }
    persistThemeRef.current = false
  }, [theme])

  const copyEmail = async () => {
    if (emailCopyTimer.current !== null) window.clearTimeout(emailCopyTimer.current)
    try {
      await navigator.clipboard.writeText(profile.email)
      setEmailCopyStatus('copied')
      emailCopyTimer.current = window.setTimeout(() => {
        setEmailCopyStatus('idle')
        emailCopyTimer.current = null
      }, 1800)
    } catch {
      setEmailCopyStatus('failed')
    }
  }

  useEffect(() => () => {
    if (emailCopyTimer.current !== null) window.clearTimeout(emailCopyTimer.current)
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
    document.title = seo.title[locale]
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    const ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]')
    const ogDescription = document.querySelector<HTMLMetaElement>('meta[property="og:description"]')
    const twitterTitle = document.querySelector<HTMLMetaElement>('meta[name="twitter:title"]')
    const twitterDescription = document.querySelector<HTMLMetaElement>('meta[name="twitter:description"]')
    if (description) description.content = seo.description[locale]
    if (ogTitle) ogTitle.content = seo.title[locale]
    if (ogDescription) ogDescription.content = seo.description[locale]
    if (twitterTitle) twitterTitle.content = seo.title[locale]
    if (twitterDescription) twitterDescription.content = seo.description[locale]
  }, [locale])

    useEffect(() => {
      if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const targets = document.querySelectorAll<HTMLElement>('[data-reveal]')
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        })
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 })
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
    if (menuOpen && window.matchMedia('(max-width: 800px)').matches) {
      primaryNavRef.current?.querySelector<HTMLAnchorElement>('a')?.focus()
    }
  }, [menuOpen])

  const changeTheme = () => {
    persistThemeRef.current = true
    setTheme(getNextTheme(theme))
  }

  const nextTheme = getNextTheme(theme)
  const themePosition = themeCycle.indexOf(theme) + 1
  const themeDescription = t.theme.cycleDescription
    .replace('{current}', t.theme[theme])
    .replace('{position}', String(themePosition))
    .replace('{next}', t.theme[nextTheme])
  const ThemeIcon = themeIcons[theme]

  const changeLocale = () => {
    const nextLocale: Locale = locale === 'en' ? 'ru' : 'en'
    try {
      window.localStorage.setItem('portfolio-locale', nextLocale)
    } catch {
      // The current page still changes language when storage is unavailable.
    }
    setLocale(nextLocale)
  }

  const navigation = [
    { id: 'about', label: t.nav.about },
    { id: 'projects', label: t.nav.projects },
    { id: 'stack', label: t.nav.stack },
      { id: 'experience', label: t.nav.experience },
      { id: 'education', label: t.nav.education },
    { id: 'contact', label: t.nav.contact },
  ]

  return (
    <>
        <AmbientGallery />
      <a className="skip-link" href="#main">{t.a11y.skip}</a>
      <header className="site-header">
        <div className="header-inner page-shell">
          <a className="brand" href="#top" aria-label={`${profile.handle}, ${t.a11y.home}`}>
            <Avatar size="small" />
            <span>{profile.handle}</span>
          </a>

          <nav ref={primaryNavRef} id="primary-nav" className={`primary-nav${menuOpen ? ' is-open' : ''}`} aria-label={t.a11y.navigation}>
            {navigation.map((item) => (
              <a key={item.id} href={`#${item.id}`} onClick={() => {
                setMenuOpen(false)
                if (window.matchMedia('(max-width: 800px)').matches) {
                  window.requestAnimationFrame(() => menuToggleRef.current?.focus())
                }
              }}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <a className="header-github" href={profile.github} target="_blank" rel="noreferrer noopener" aria-label={t.a11y.githubNewTab}>
              <GithubMark size={17} /><span>GitHub</span><ArrowUpRight size={13} aria-hidden="true" />
            </a>
            <span className="header-divider" aria-hidden="true" />
              <button className="locale-toggle" type="button" onClick={changeLocale} aria-label={`${t.a11y.switchLanguage} ${t.language}`}>
              <span className={locale === 'en' ? 'is-current' : ''}>EN</span><span aria-hidden="true">/</span><span className={locale === 'ru' ? 'is-current' : ''}>RU</span>
            </button>
            <button className="icon-button theme-toggle" type="button" onClick={changeTheme} aria-label={themeDescription}>
              <ThemeIcon size={17} aria-hidden="true" />
              <span className="theme-toggle__indicators" aria-hidden="true">
                {themeCycle.map((option) => <span key={option} className={option === theme ? 'is-active' : undefined} />)}
              </span>
              <span className="theme-toggle__tooltip" aria-hidden="true">{themeDescription}</span>
            </button>
            <button ref={menuToggleRef} className="icon-button menu-toggle" type="button" aria-label={menuOpen ? t.nav.close : t.nav.menu} aria-expanded={menuOpen} aria-controls="primary-nav" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      <main id="main">
          <section className="hero page-shell" id="top" aria-labelledby="hero-title">
            <div className="hero__copy" data-hero-enter>
              <div className="hero__identity">
                <Avatar />
                <div>
                  <p className="hero__handle">{profile.handle}</p>
                  <p className="hero__location">{t.hero.student}</p>
                </div>
            </div>
              <h1 id="hero-title">{t.hero.specialty}</h1>
              <p className="hero__intro">{t.hero.intro}</p>
              <div className="hero__links">
                <a className="text-link text-link--accent" href="#projects">{t.hero.projects}<ArrowDownRight size={15} aria-hidden="true" /></a>
                <a className="text-link" href={profile.github} target="_blank" rel="noreferrer noopener">{t.hero.github}<ArrowUpRight size={14} aria-hidden="true" /></a>
              </div>
          </div>
            <figure className="hero__artwork" data-reveal>
              <div className="hero__artwork-frame">
                <span className="hero__artwork-image-clip" style={{ aspectRatio: `${heroArtwork.width} / ${heroArtwork.height}` }}>
                  <img
                    src={heroArtwork.src}
                    alt={heroArtwork.alt[locale]}
                    width={heroArtwork.width}
                    height={heroArtwork.height}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    onError={() => {
                      if (heroArtwork.id !== fallbackHeroArtwork.id) setHeroArtwork(fallbackHeroArtwork)
                    }}
                  />
                </span>
              </div>
                <figcaption><a href={heroArtwork.source} target="_blank" rel="noreferrer noopener"><span>{heroArtwork.attribution[locale]}</span><ArrowUpRight size={12} aria-hidden="true" /></a></figcaption>
            </figure>
        </section>

        <section className="content-section page-shell about-section" id="about" aria-labelledby="about-title">
            <div data-reveal><SectionTitle id="about-title" label={t.about.eyebrow} title={t.about.title} /></div>
              <p className="about-copy" data-reveal>{t.about.body}</p>
        </section>

        <section className="content-section page-shell projects-section" id="projects" aria-labelledby="projects-title">
          <div className="section-heading-row">
              <div data-reveal><SectionTitle id="projects-title" label={t.projects.eyebrow} title={t.projects.title} /></div>
              <p className="section-description" data-reveal>{t.projects.intro}</p>
          </div>
          <div className="projects-grid">
            {projects.map((project) => (
                <article className="project-card" data-reveal key={project.id}>
                <p className="project-tags">{project.tags.join(' · ')}</p>
                <h3>{project.name}</h3>
                <p className="project-description">{project.description[locale]}</p>
                <div className="project-links">
                  {project.repositories.map((repository) => (
                    <a href={repository.href} key={repository.href} target="_blank" rel="noreferrer noopener">{repository.label[locale]}<ArrowUpRight size={13} aria-hidden="true" /></a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section page-shell stack-section" id="stack" aria-labelledby="stack-title">
          <div className="section-heading-row">
              <div data-reveal><SectionTitle id="stack-title" label={t.stack.eyebrow} title={t.stack.title} /></div>
              <p className="section-description" data-reveal>{t.stack.intro}</p>
          </div>
          <div className="stack-grid">
            {technologyCategories.map((category) => (
                <section className="stack-group" data-reveal key={category.id} aria-labelledby={`stack-${category.id}`}>
                <h3 id={`stack-${category.id}`}>{category.label[locale]}</h3>
                <ul className="tech-list">{category.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </section>
            ))}
          </div>
        </section>

          <section className="content-section page-shell experience-section" id="experience" aria-labelledby="experience-title">
            <div className="section-heading-row">
              <div data-reveal><SectionTitle id="experience-title" label={t.experience.eyebrow} title={t.experience.title} /></div>
              <p className="section-description" data-reveal>{t.experience.intro}</p>
            </div>
            <div className="experience-list">
              {experiences.map((experience) => (
                <article className="experience-item" data-reveal key={experience.id}>
                  <div className="experience-meta">
                    <h3>{experience.role[locale]}</h3>
                    <p>{experience.period[locale]}</p>
                    <p className="experience-org">{experience.organization} · {experience.arrangement[locale]}</p>
                  </div>
                  <div className="experience-detail">
                    <p>{experience.summary[locale]}</p>
                    {experience.highlights[locale].length > 0 && (
                      <ul>
                        {experience.highlights[locale].map((highlight) => <li key={highlight}>{highlight}</li>)}
                      </ul>
                    )}
                    {experience.link && <a className="experience-link" href={experience.link.href} target="_blank" rel="noreferrer noopener">{experience.link.label}<ArrowUpRight size={13} aria-hidden="true" /></a>}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="content-section page-shell credential-section" id="education" aria-labelledby="education-title">
            <div className="section-heading-row">
              <div data-reveal><SectionTitle id="education-title" label={t.education.eyebrow} title={t.education.title} /></div>
            </div>
            <article className="credential-row" data-reveal>
              <div><h3>{education.field[locale]}</h3><p>{education.specialization[locale]}</p><p>{education.institution[locale]}</p></div>
              <p className="credential-period">{education.period[locale]}<span>{education.status[locale]}</span></p>
            </article>
          </section>

          <section className="content-section page-shell credential-section" id="training" aria-labelledby="training-title">
            <div className="section-heading-row">
              <div data-reveal><SectionTitle id="training-title" label={t.training.eyebrow} title={t.training.title} /></div>
            </div>
            <article className="credential-row" data-reveal>
              <div><h3>{additionalTraining.course[locale]}</h3><p>{additionalTraining.provider}</p></div>
              <p className="credential-period">{additionalTraining.period[locale]}<span>{additionalTraining.description[locale]}</span></p>
            </article>
          </section>

          <section className="content-section page-shell language-section" id="languages" aria-labelledby="languages-title">
            <div className="section-heading-row">
              <div data-reveal><SectionTitle id="languages-title" label={t.languages.eyebrow} title={t.languages.title} /></div>
            </div>
            <ul className="language-list" data-reveal>
              {languages.map((language) => <li key={language.name.en}><span>{language.name[locale]}</span><span>{language.level[locale]}</span></li>)}
            </ul>
          </section>

          <section className="contact-section page-shell" id="contact" aria-labelledby="contact-title" data-reveal>
            <div className="contact-intro">
              <p className="section-kicker">{t.contact.eyebrow}</p>
              <h2 id="contact-title">{t.contact.title}</h2>
              <p className="contact-description">{t.contact.intro}</p>
            </div>
            <a className="text-link text-link--accent" href={profile.github} target="_blank" rel="noreferrer noopener">
              <GithubMark size={16} /><span className="contact-link-label">{t.contact.link}</span><ArrowUpRight size={14} aria-hidden="true" />
            </a>
            <div className="contact-links">
              <a className="text-link" href={`mailto:${profile.email}`}><span className="contact-link-label">{profile.email}</span></a>
              <button className="contact-copy" type="button" onClick={copyEmail} aria-label={t.contact.emailCopy} title={t.contact.emailCopy}>
                {emailCopyStatus === 'copied' ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
              </button>
              <span className="contact-copy-status" role="status" aria-live="polite" aria-atomic="true">
                {emailCopyStatus === 'copied' ? t.contact.emailCopied : emailCopyStatus === 'failed' ? t.contact.emailCopyFailed : ''}
              </span>
            </div>
          </section>
      </main>

      <footer className="site-footer page-shell">
        <a className="footer-brand" href="#top">{profile.handle}</a>
        <p>{t.footer.note}</p>
          <a className="footer-credits" href="/artwork/credits.html">{t.footer.artworkCredits}</a>
        <span>© {new Date().getFullYear()}</span>
      </footer>
    </>
  )
}

export default App

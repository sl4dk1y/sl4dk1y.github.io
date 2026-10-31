export type Locale = 'en' | 'ru'
export type Theme = 'dark' | 'light'

export type TechnologyCategory = {
  id: string
  label: Record<Locale, string>
  items: string[]
}

export type PortfolioProject = {
  id: string
  name: string
  description: Record<Locale, string>
  tags: string[]
  repositories: { label: Record<Locale, string>; href: string }[]
}

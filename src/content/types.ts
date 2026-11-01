export type Locale = 'en' | 'ru'
export const themeCycle = ['day', 'sunset', 'forest', 'rain', 'night'] as const
export type Theme = (typeof themeCycle)[number]

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

export type PortfolioExperience = {
  id: string
  role: Record<Locale, string>
  organization: string
  period: Record<Locale, string>
  arrangement: Record<Locale, string>
  summary: Record<Locale, string>
  highlights: Record<Locale, string[]>
  link?: { label: string; href: string }
}

export type PortfolioEducation = {
  institution: Record<Locale, string>
  field: Record<Locale, string>
  specialization: Record<Locale, string>
  period: Record<Locale, string>
  status: Record<Locale, string>
}

export type PortfolioTraining = {
  provider: string
  course: Record<Locale, string>
  period: Record<Locale, string>
  description: Record<Locale, string>
}

export type PortfolioLanguage = {
  name: Record<Locale, string>
  level: Record<Locale, string>
}

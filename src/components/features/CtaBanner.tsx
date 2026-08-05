import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function CtaBanner({
  title,
  subtitle,
  label,
  href,
}: {
  title: string
  subtitle: string
  label: string
  href: string
}) {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 py-12 text-center md:flex-row md:text-left">
        <div>
          <h2 className="font-display text-2xl font-bold md:text-3xl">{title}</h2>
          <p className="mt-1 text-sm font-medium">{subtitle}</p>
        </div>
        <Button asChild size="lg" variant="secondary" className="rounded-[2px]">
          <Link to={href}>{label}</Link>
        </Button>
      </div>
    </section>
  )
}
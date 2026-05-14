import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function ProjectCardSkeleton() {
  return (
    <Card className="flex flex-col bg-brand-dark-secondary border-slate-700 h-full overflow-hidden">
      <CardHeader className="pb-2">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <div className="flex gap-2 mt-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
      </CardHeader>
      <CardContent className="flex-grow pt-0">
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-5/6" />
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-2 items-stretch pt-2">
        <Skeleton className="h-10 w-full sm:flex-1" />
        <Skeleton className="h-10 w-full sm:flex-1" />
      </CardFooter>
    </Card>
  )
}

export function ProjectsSectionSkeleton() {
  return (
    <section id="projects-loading" className="container mx-auto py-16 md:py-24">
      <div className="text-center mb-12 md:mb-16">
        <Skeleton className="h-10 w-1/2 mx-auto mb-2" />
        <Skeleton className="h-1 w-1/4 mx-auto bg-brand-accent" />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ProjectCardSkeleton />
        <ProjectCardSkeleton />
        <ProjectCardSkeleton />
        <ProjectCardSkeleton />
        <ProjectCardSkeleton />
        <ProjectCardSkeleton />
      </div>
    </section>
  )
}

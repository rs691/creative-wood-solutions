import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Project } from '@/types';
import Image from 'next/image';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden group break-inside-avoid-column mb-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
      <CardHeader className="p-0">
        <div className="relative w-full aspect-auto">
          <Image
            src={project.imageUrl}
            // alt={project.title}
            alt="project card image"
            width={600}
            height={800} // This is just a base, actual height will vary
            className="object-cover w-full h-auto"
            data-ai-hint={project.imageHint}
          />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <CardTitle className="font-headline text-xl">{project.title}</CardTitle>
        <CardDescription className="mt-2">{project.description}</CardDescription>
      </CardContent>
    </Card>
  );
}

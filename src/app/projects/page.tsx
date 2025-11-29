'use client';

import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import type { Project } from '@/types';
import { collection } from 'firebase/firestore';
import Image from 'next/image';

export default function ProjectsPage() {
  const firestore = useFirestore();
  const projectsCollection = useMemoFirebase(() => collection(firestore, 'projects'), [firestore]);
  const { data: projects, isLoading } = useCollection<Project>(projectsCollection);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">Our Portfolio</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          A gallery of our passion, precision, and partnership with clients.
        </p>
      </div>
      {isLoading && (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="break-inside-avoid-column mb-6">
                    <Skeleton className="w-full h-80" />
                </div>
            ))}
        </div>
      )}
      {!isLoading && projects && projects.length > 0 ? (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="break-inside-avoid-column mb-6">
              <Card className="overflow-hidden group transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
                {project.imageUrl && (
                  <div className="overflow-hidden">
                    <Image
                      src={project.imageUrl}
                      // alt={project.title}
                      alt="project card image"
                      width={600}
                      height={800}
                      className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={project.imageHint}
                    />
                  </div>
                )}
                <div className="p-6">
                    <h3 className="font-semibold font-headline text-xl">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2">{project.description}</p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      ) : !isLoading && (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No projects to display yet. Please check back soon.</p>
        </div>
      )}
    </div>
  );
}

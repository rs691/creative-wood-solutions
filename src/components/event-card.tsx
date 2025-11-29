import { Calendar, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Event } from '@/types';
import { format } from 'date-fns';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const eventDate = new Date(event.date);

  return (
    <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">{event.title}</CardTitle>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground mt-2">
            <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{format(eventDate, 'MMMM d, yyyy')}</span>
            </div>
            <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{event.location}</span>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>{event.description}</CardDescription>
      </CardContent>
    </Card>
  );
}

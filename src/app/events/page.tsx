import { getEvents } from '@/lib/data';
import { EventCard } from '@/components/event-card';

export const metadata = {
  title: 'Events - Creative Wood Solutions',
  description: 'Join us for workshops, craft fairs, and other woodworking events.',
};

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">Upcoming Events</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Connect with us, learn new skills, and see our work in person.
        </p>
      </div>
      {events.length > 0 ? (
        <div className="space-y-8 max-w-4xl mx-auto">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No upcoming events. Please check back later.</p>
        </div>
      )}
    </div>
  );
}

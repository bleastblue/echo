import { useAuth } from '@/lib/AuthContext';

export default function Command() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <p className="font-cta text-xs uppercase tracking-[0.3em] text-muted-foreground">Echo Knuckles</p>
        <h1 className="mt-4 text-4xl font-heading">Command</h1>
        <p className="mt-4 text-muted-foreground">
          {user?.full_name || user?.email
            ? `Signed in as ${user.full_name || user.email}.`
            : 'Internal reservations console.'}
        </p>
      </div>
    </div>
  );
}

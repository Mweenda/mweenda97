import { Button } from '@mweenda97/ui';

export default function App(): JSX.Element {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-5xl font-bold text-white mb-4">mweenda97</h1>
        <p className="text-xl text-slate-300 mb-8">
          Christopher Kawanga - AI | Full-Stack | Network Security
        </p>
        <div className="flex gap-4">
          <Button variant="default">Download CV</Button>
          <Button variant="outline">View AI Lab</Button>
        </div>
      </div>
    </div>
  );
}

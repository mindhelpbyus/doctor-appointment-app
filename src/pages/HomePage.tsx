import { MadeWithDyad } from "@/components/made-with-dyad";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <div className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="text-center max-w-3xl">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
          Your Health, Simplified.
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          Find and book appointments with top doctors and healthcare agencies effortlessly.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/search">
            <Button size="lg" className="text-lg px-8 py-6">
              Find a Doctor
            </Button>
          </Link>
          <Link to="/register">
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Register for Free
            </Button>
          </Link>
        </div>
      </div>
      <div className="mt-auto pt-10">
        <MadeWithDyad />
      </div>
    </div>
  );
};

export default HomePage;
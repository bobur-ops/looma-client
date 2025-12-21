import { useRouteError, isRouteErrorResponse, useNavigate } from "react-router";
import {
  AlertCircle,
  Home,
  RefreshCw,
  ArrowLeft,
  ServerCrash,
  FileQuestion,
  ShieldOff,
  WifiOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ErrorInfo {
  icon: React.ReactNode;
  title: string;
  description: string;
  suggestion: string;
}

function getErrorInfo(status?: number): ErrorInfo {
  const iconClass = "h-12 w-12";

  switch (status) {
    case 400:
      return {
        icon: <AlertCircle className={`${iconClass} text-yellow-500`} />,
        title: "Bad Request",
        description: "The request couldn't be understood by the server.",
        suggestion: "Please check your input and try again.",
      };
    case 401:
      return {
        icon: <ShieldOff className={`${iconClass} text-orange-500`} />,
        title: "Unauthorized",
        description: "You need to be logged in to access this page.",
        suggestion: "Please sign in and try again.",
      };
    case 403:
      return {
        icon: <ShieldOff className={`${iconClass} text-red-500`} />,
        title: "Access Denied",
        description: "You don't have permission to view this page.",
        suggestion: "Contact support if you believe this is a mistake.",
      };
    case 404:
      return {
        icon: <FileQuestion className={`${iconClass} text-blue-500`} />,
        title: "Page Not Found",
        description:
          "The page you're looking for doesn't exist or has been moved.",
        suggestion: "Check the URL or navigate back to safety.",
      };
    case 500:
      return {
        icon: <ServerCrash className={`${iconClass} text-red-500`} />,
        title: "Server Error",
        description: "Something went wrong on our end.",
        suggestion: "Please try again later. We're working on it!",
      };
    case 503:
      return {
        icon: <WifiOff className={`${iconClass} text-gray-500`} />,
        title: "Service Unavailable",
        description: "The service is temporarily unavailable.",
        suggestion: "Please try again in a few minutes.",
      };
    default:
      return {
        icon: <AlertCircle className={`${iconClass} text-destructive`} />,
        title: "Oops! Something Went Wrong",
        description: "An unexpected error occurred.",
        suggestion: "Try refreshing the page or going back.",
      };
  }
}

export default function RouteErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();

  const isRouteError = isRouteErrorResponse(error);
  const status = isRouteError ? error.status : undefined;
  const errorInfo = getErrorInfo(status);

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-background via-background to-muted/30 p-4">
      <Card className="w-full max-w-lg shadow-lg border-border/50">
        <CardHeader className="text-center space-y-4 pb-2">
          <div className="mx-auto rounded-full bg-muted p-4 w-fit">
            {errorInfo.icon}
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold tracking-tight">
              {status && (
                <span className="text-muted-foreground mr-2">{status}</span>
              )}
              {errorInfo.title}
            </CardTitle>
            <CardDescription className="text-base">
              {errorInfo.description}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="text-center">
          <p className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
            💡 {errorInfo.suggestion}
          </p>

          {!isRouteError && error instanceof Error && (
            <details className="mt-4 text-left">
              <summary className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                Technical details
              </summary>
              <pre className="mt-2 p-3 bg-muted rounded-lg text-xs overflow-auto max-h-32 text-muted-foreground">
                {error.message}
                {error.stack && `\n\n${error.stack}`}
              </pre>
            </details>
          )}
        </CardContent>

        <CardFooter className="flex flex-col gap-2 pt-2">
          <div className="flex gap-2 w-full">
            <Button variant="outline" className="flex-1" onClick={handleGoBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleRefresh}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
          <Button className="w-full" onClick={handleGoHome}>
            <Home className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

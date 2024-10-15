import { NextResponse, type NextRequest } from "next/server";

// function for check information about user
// if user is not defined => redirect to home page

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  let user;

  try {
    user = request.cookies.get('user'); // Using cookies-next library to get the cookies
  } catch (error) {
    console.error("Error accessing 'user' cookie:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!user) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return response;
}

// Protected page
export const config = {
  matcher: ["/information-page"]
}

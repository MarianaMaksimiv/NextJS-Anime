import { useRouter } from "next/navigation";
import { setMyCookie } from "@/lib/actions/setMyCookie";
import UserForm from "@/components/UserForm";

export default function LoginForm() {
  const router = useRouter();

  const handleLogin = ({userName, jobTitle}: {userName: string; jobTitle: string}) => {
    setMyCookie("user", JSON.stringify({ userName, jobTitle }));

    redirectToInformationPage();
  };

  // Function to redirect to information page
  const redirectToInformationPage = () => {
    // Define the path to redirect to after login
    const redirectPath = "/information-page?page=1&per_page=50";

    router.push(redirectPath);
  }

  return (
      <UserForm title="Login" submitFunction={handleLogin} />
  );
}

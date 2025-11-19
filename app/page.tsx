import { homePageText } from "@/lib/data/homePage";
import Link from "next/link";

const HomePage = () => {
  return (
    <div>
      <h1>{homePageText.title}</h1>
      <div>
        <Link
          href={homePageText.loginLink}>
          {homePageText.loginText}
        </Link>
        <Link
          href={homePageText.registerLink}>
          {homePageText.registerText}
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
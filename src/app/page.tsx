import Image from "next/image";
import { redirect } from "next/navigation";

export default function Home() {
  // 重定向到登录页面
  redirect("/login");
  return (
    // 重定向到登录页面
    <div>
      <h1>重定向到登录页面</h1>
    </div>
  );
}

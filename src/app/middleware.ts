import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 打印请求路径和环境变量，确认中间件是否执行
  console.log("middleware触发：", request.nextUrl.pathname);
  console.log("当前环境：", process.env.NODE_ENV);
  console.log("==========middleware", middleware);
  // 生产环境下拦截 /test 路由
  if (
    process.env.NODE_ENV !== "production" &&
    request.nextUrl.pathname.startsWith("/test")
  ) {
    return new NextResponse("页面不存在", { status: 404 }); // 直接返回 404
  }

  return NextResponse.next();
}

// 配置拦截的路由范围
export const config = {
  matcher: "/test/:path*", // 匹配 /test 及所有子路由（如 /test/123）
};

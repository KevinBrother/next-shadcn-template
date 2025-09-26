"use client";
import React, { useState } from "react";
import { Eye, EyeOff, Lock, User, Shield, Zap } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";
import { ROUTERS } from "@/lib/constants/routers";

// 定义登录表单数据类型
type LoginFormData = {
  username: string;
  password: string;
  remember: boolean;
};

const LoginPage: React.FC = () => {
  // 密码可见性状态
  const [showPassword, setShowPassword] = useState<boolean>(false);
  // 表单状态管理
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginFormData>();
  // 输入框焦点状态
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // 表单提交处理
  const onSubmit = (data: LoginFormData) => {
    console.log("登录表单数据:", data);
    // 这里添加实际登录逻辑
    redirect(ROUTERS.DASHBOARD);
  };

  // 密码值监听
  const password = watch("password", "");

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <Card className="w-full max-w-6xl overflow-hidden border-0 shadow-xl rounded-2xl">
        <div className="flex flex-col lg:flex-row">
          {/* 左侧品牌区域 - 仅在中等以上屏幕显示 */}
          <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-primary/80 p-8 sm:p-12 flex-col justify-between text-white">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-3">欢迎回来</h1>
              <p className="text-white/80 text-lg mb-8">
                请登录您的账户，继续您的旅程
              </p>

              <div className="space-y-6 mt-12">
                <div className="flex items-start gap-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <Shield className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">安全保障</h3>
                    <p className="text-white/70">
                      您的数据将被全程加密保护，确保信息安全
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <Zap className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">快速访问</h3>
                    <p className="text-white/70">
                      一键登录，即刻获取您的所有信息
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <p className="text-white/60 text-sm">
                © 2023 您的公司名称 版权所有
              </p>
            </div>
          </div>

          {/* 右侧登录表单 */}
          <div className="w-full lg:w-1/2 p-6 sm:p-8 md:p-10 flex flex-col">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 lg:hidden">
                账户登录
              </h2>
              <div className="flex items-center gap-2 text-gray-500 mb-6">
                {/* <Separator className="flex-grow" /> */}
                <span className="text-sm">请输入您的账号信息</span>
                {/* <Separator className="flex-grow" /> */}
              </div>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5 flex-grow"
            >
              {/* 用户名输入 */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium">
                  用户名
                </Label>
                <div
                  className={`relative transition-all duration-200 ${
                    focusedField === "username" ? "scale-[1.01]" : ""
                  }`}
                >
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <User className="h-5 w-5" />
                  </div>
                  <Input
                    id="username"
                    placeholder="请输入用户名"
                    className="pl-10 h-11"
                    {...register("username", {
                      required: "用户名不能为空",
                      minLength: { value: 3, message: "用户名至少3个字符" },
                    })}
                    onFocus={() => setFocusedField("username")}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.username.message}
                  </p>
                )}
              </div>

              {/* 密码输入 */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-sm font-medium">
                    密码
                  </Label>
                  <a
                    href="#"
                    className="text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    忘记密码?
                  </a>
                </div>
                <div
                  className={`relative transition-all duration-200 ${
                    focusedField === "password" ? "scale-[1.01]" : ""
                  }`}
                >
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Lock className="h-5 w-5" />
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="请输入密码"
                    className="pl-10 pr-10 h-11"
                    {...register("password", {
                      required: "密码不能为空",
                      minLength: { value: 6, message: "密码至少6个字符" },
                    })}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label={showPassword ? "隐藏密码" : "显示密码"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* 记住我选项 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {/* <Checkbox id="remember" {...register("remember")} /> */}
                  <Label htmlFor="remember" className="text-sm font-normal">
                    记住我
                  </Label>
                </div>
              </div>

              {/* 登录按钮 */}
              <Button
                type="submit"
                className="w-full h-11 text-base bg-primary hover:bg-primary/90 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                登录
              </Button>
            </form>

            {/* 其他登录方式 */}
            {/* <div className="mt-8">
              <div className="relative flex items-center justify-center">
                <span className="relative z-10 px-4 bg-white text-sm text-gray-500">
                  其他登录方式
                </span>
              </div>

              <div className="flex justify-center gap-4 mt-6">
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  className="h-12 w-12 rounded-full border border-gray-200 hover:bg-gray-50"
                >
                  <Weixin className="h-5 w-5" />
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  className="h-12 w-12 rounded-full border border-gray-200 hover:bg-gray-50"
                >
                  <Qq className="h-5 w-5" />
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  className="h-12 w-12 rounded-full border border-gray-200 hover:bg-gray-50"
                >
                  <Weibo className="h-5 w-5" />
                </Button>
              </div>
            </div> */}

            {/* 注册链接 */}
            <div className="mt-10 text-center">
              <p className="text-gray-600">
                还没有账号?{" "}
                <a
                  href="#"
                  className="text-primary font-medium hover:underline transition-colors"
                >
                  立即注册
                </a>
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;

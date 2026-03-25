"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { GitHubSignInButton, GoogleSignInButton } from "./OAuthButtons";

// Define the schema for the login form
const loginSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    termsAccepted: z.boolean(),
  })
  .refine((data) => data.termsAccepted === true, {
    message: "You must accept the terms and privacy policy",
    path: ["termsAccepted"],
  });

type LoginFormData = z.infer<typeof loginSchema>;

const SignInForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      termsAccepted: false,
    },
  });
  return (
    <div className="w-full px-4">
      <Card className="w-full shadow-none bg-transparent border-0 p-0">
        <CardContent className="p-0">
          <Form {...form}>
            <form className="space-y-6">
              {error && (
                <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md flex items-center gap-2 border border-destructive/20">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <p>{error}</p>
                </div>
              )}
              <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem>
                  <FormLabel className="text-sm font-bold text-foreground after:content-['*'] after:ml-1 after:text-destructive">Email</FormLabel>
                  <FormControl>
                     <Input
                        placeholder="Email Address"
                        type="email"
                        disabled={isLoading}
                        className="rounded-sm border-border focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary h-10 bg-background"
                        {...field}
                      />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
               />
               <FormField
               
               control={form.control}
               name="password"
               render={({field}) => (
                <FormItem>
                  <FormLabel className="text-sm font-bold text-gray-700 after:content-['*'] after:ml-1 after:text-red-500">Password</FormLabel>
                  <FormControl>
                     <div className="relative">
                        <Input
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                        disabled={isLoading}
                        className="mb-3 rounded-sm border-border focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary h-10 bg-background"
                        {...field}
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} disabled={isLoading} className="absolute right-0 inset-y-0 pr-3 flex items-center text-muted-foreground hover:text-primary transition-colors duration-200">
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                     </div>
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                  <FormField
                  control={form.control}
                  name="termsAccepted"
                  render={({field}) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox disabled={isLoading} checked={field.value} onCheckedChange={field.onChange} className="border-gray-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                      </FormControl>
                      <FormLabel className="text-sm text-muted-foreground font-normal">
                      I agree with the{" "}
                      <Link
                        href="/privacy"
                        className="text-primary hover:text-primary hover:underline"
                      >
                        Privacy Policy
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/terms"
                        className="text-primary hover:text-primary hover:underline"
                      >
                        Terms of Use
                      </Link>
                    </FormLabel>
                    <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )} 
                  />
                </FormItem>
               )}
               />
               <div className="flex items-center justify-between pt-2">
                <Button
                  type="submit"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold uppercase rounded-sm px-8"
                  disabled={isLoading || !form.watch("termsAccepted")}
                >
                  Login
                </Button>

                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  Forgot Your Password?
                </Link>
              </div>
                {/* OAuth Login Section */}
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-card px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <GoogleSignInButton
                    disabled={isLoading}
                    
                    onSuccess={() => {
                    
                    }}
                  />
                  <GitHubSignInButton
                    disabled={isLoading}
                    
                    onSuccess={() => {
                     
                    }}
                  />
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInForm;

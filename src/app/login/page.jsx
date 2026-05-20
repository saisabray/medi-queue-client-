"use client";
import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const LoginPage = () => {
  const router = useRouter();
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userdata = Object.fromEntries(formData.entries());
    const { email, password } = userdata;

    const { data, error } = await authClient.signIn.email({
      email,

      password,

      callbackURL: "/",
    });
    if (data) {
      toast.success("Logged in successfully! Redirecting to home...");
      router.push("/");
      router.refresh();
    }
    if (error) {
      toast.error("Login failed: " + (error.message || "Unknown error"));
    }
  };
  const onGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
    toast.success("Redirecting to Google sign in...");
  };
  return (
    <Card className="shadow-md mx-auto w-screen sm:w-125 py-5 mt-10">
      <h1 className="text-center text-2xl font-bold">Log In</h1>

      <Form className="flex w-96 mx-auto flex-col gap-4" onSubmit={onSubmit}>
        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "Please enter a valid email address";
            }

            return null;
          }}
        >
          <Label>Email</Label>
          <Input placeholder="john@example.com" />
          <FieldError />
        </TextField>

        <TextField
          isRequired
          minLength={6}
          name="password"
          type="password"
          validate={(value) => {
            if (value.length < 6) {
              return "Password must be at least 6 characters";
            }
            if (!/[A-Z]/.test(value)) {
              return "Password must contain at least one uppercase letter";
            }
            if (!/[a-z]/.test(value)) {
              return "Password must contain at least one lowercase letter";
            }

            return null;
          }}
        >
          <Label>Password</Label>
          <Input placeholder="Enter your password" />
          <Description>
            Must be at least 6 characters with 1 uppercase and 1 lowercase
            letter
          </Description>
          <FieldError />
        </TextField>

        <div className="flex gap-2">
          <Button type="submit" variant="primary">
            <Check />
            Sign In
          </Button>
          <Button type="reset" variant="outline" className="text-primary">
            Reset
          </Button>
        </div>
      </Form>
      <p className="text-center text-lg text-gray-400 font-semibold">Or</p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onGoogleSignIn}>
        Sign In with Google
      </button>
      <div className="text-center mt-4 text-sm text-gray-600 pb-4">
        Don&apos;t have an account?
        <Link href="/signup" className="text-blue-500 hover:underline">
          Sign up
        </Link>
      </div>
    </Card>
  );
};
export default LoginPage;

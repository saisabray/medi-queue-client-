"use client";
import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import Link from "next/link";
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
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const SignUpPage = () => {
  const router = useRouter();
  const onSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const image = e.target.image.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log({ name, email, password, image });
    const { data, error } = await authClient.signUp.email({
      email,
      password,
      name,
      image,
    });
    console.log({ data, error });
    if (error) {
      toast.error("Failed to sign up: " + error.message);
    }
    toast.success("Sign up successful! Please log in.");
    router.push("/login");
  };
  const onGoogleSignUp = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
    toast.success("Redirecting to Google sign up...");
  };
  return (
    <Card className="shadow-md mx-auto w-screen sm:w-125 py-5 mt-10">
      <h1 className="text-center text-2xl font-bold">Sign Up</h1>

      <Form className="flex w-96 mx-auto flex-col gap-4" onSubmit={onSubmit}>
        <TextField isRequired name="name" type="text">
          <Label>Name</Label>
          <Input placeholder="Enter your name" />
          <FieldError />
        </TextField>

        <TextField isRequired name="image" type="text">
          <Label>Image URL</Label>
          <Input placeholder="Image URL" />
          <FieldError />
        </TextField>

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
            Create Account
          </Button>
          <Button type="reset" variant="outline" className="text-primary">
            Reset
          </Button>
        </div>
      </Form>
      <p className="text-center text-lg text-gray-400 font-semibold">Or</p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onGoogleSignUp}>
        Sign Up with Google
      </button>
      <div className="text-center mt-4 text-sm text-gray-600 pb-4">
        Already have an account?
        <Link href="/login" className="text-blue-500 hover:underline">
          Log in
        </Link>
      </div>
    </Card>
  );
};
export default SignUpPage;

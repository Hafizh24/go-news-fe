/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "@/model/User";
import { setupInterceptor } from "../../../../../../lib/axios";
import { FC, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { updatePassword } from "../lib/action";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import SubmitButtonForm from "../../components/submit-button";
import { deleteCookie } from "cookies-next";

interface FormUserProps {
  defaultValues?: User | null;
}

const FormUserPage: FC<FormUserProps> = ({ defaultValues }) => {
  setupInterceptor();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string[]>([]);

  useEffect(() => {
    if (defaultValues) {
      setName(defaultValues.name);
      setEmail(defaultValues.email);
      setPassword(defaultValues.password);
    }
  }, [defaultValues]);

  const handleUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setError([]);

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Password will be changed",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, change it!",
    });

    if (result.isConfirmed) {
      try {
        await updatePassword({
          current_password: password,
          new_password: newPassword,
          confirm_password: confirmPassword,
        });

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Password changed successfully",
          toast: true,
          showConfirmButton: false,
          timer: 1500,
        });

        deleteCookie("accessToken");
        window.location.reload();
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
          toast: true,
          showConfirmButton: false,
          timer: 1500,
        });

        setError(error instanceof Error ? [error.message] : []);
      }
    }
  };

  return (
    <form onSubmit={handleUser} className="w-[100%] space-y-4">
      {error.length > 0 && (
        <div className="mx-auto my-7 bg-red-500 w-[400px] p-4 rounded-lg text-white">
          <div className="font-bold mb-4">
            <ul className="list-disc list-inside">
              {error.map((err, index) => (
                <li key={index}>{err}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            name="name"
            id="name"
            placeholder="Name..."
            disabled
            value={name}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            id="email"
            placeholder="Email..."
            disabled
            value={email}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="password">Current Password</Label>
          <Input
            name="password"
            id="password"
            type="password"
            placeholder="Password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="new_password">New Password</Label>
          <Input
            name="newPassword"
            id="newPassword"
            type="password"
            placeholder="New Password..."
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm_password">Confirm Password</Label>
          <Input
            name="confirmPassword"
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password..."
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <SubmitButtonForm />
      </div>
    </form>
  );
};

export default FormUserPage;

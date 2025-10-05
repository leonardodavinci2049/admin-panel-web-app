
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateOrganizationForm } from "@/components/forms/create-organization-form";
import { getOrganizations } from "../actions/organizations";

const OrganizationPage = async () => {

  const organizations = await getOrganizations();


  return (
    <>

      <div className="flex h-screen flex-col items-center justify-center gap-5 px-5 text-center">
        <Image
          src="/better-auth-starter.png"
          alt="Better Auth"
          width={100}
          height={100}
          className="rounded-lg dark:invert"
        />

        <h1 className="text-4xl font-bold">Better Auth Starter</h1>

        <p className="text-lg">
          This is a starter project for Better Auth. It is a simple project that
          uses Better Auth to authenticate users.
        </p>

        <div className="flex flex-wrap justify-center gap-2">
          <Link href="/login">
            <Button>Login</Button>
          </Link>
          <Link href="/signup">
            <Button>Signup</Button>
          </Link>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Create Organization</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                 Create a new organization to get started.
              </DialogDescription>
              <CreateOrganizationForm />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default OrganizationPage;

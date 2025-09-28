import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Link from "next/link";
import { getOrganizations } from "@/server/organizations";
import { CreateOrganizationForm } from "@/components/forms/create-organization-form";

// Tipo para a organização retornada pela função getOrganizations
type OrganizationWithDetails = Awaited<
  ReturnType<typeof getOrganizations>
>[number];

// Força renderização dinâmica devido ao uso de headers() na autenticação
export const dynamic = "force-dynamic";
const OrganizationPage = async () => {
  const organizations = await getOrganizations();
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Create Organization</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Organization</DialogTitle>
            <DialogDescription>
              Create a new organization to get started.
            </DialogDescription>
          </DialogHeader>
          <CreateOrganizationForm />
        </DialogContent>
      </Dialog>

      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">Organizations</h2>
        {organizations.map((organization: OrganizationWithDetails) => (
          <Button variant="outline" key={organization.id} asChild>
            <Link href={`/dashboard/organization/${organization.slug}`}>
              {organization.name}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default OrganizationPage;

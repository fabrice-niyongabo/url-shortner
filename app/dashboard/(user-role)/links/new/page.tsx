import Container from "@/components/container";
import PageHeader from "@/components/dashboard/PageHeader";
import Form from "./Form";
import BackButton from "@/components/BackButton";

function page() {
  return (
    <Container>
      <PageHeader title="Create Link">
        <BackButton href="/dashboard/links" label="Back to list" />
      </PageHeader>
      <div className="bg-white rounded-md p-10 mt-5">
        <Form />
      </div>
    </Container>
  );
}

export default page;

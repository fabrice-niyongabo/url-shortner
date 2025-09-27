import Container from "@/components/container";
import PageHeader from "@/components/dashboard/PageHeader";
import Form from "./Form";

function page() {
  return (
    <Container>
      <PageHeader title="Create Link" />
      <div className="bg-white rounded-md p-5 mt-5">
        <Form />
      </div>
    </Container>
  );
}

export default page;

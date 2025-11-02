import BackButton from "@/components/BackButton";
import Container from "@/components/container";
import PageHeader from "@/components/dashboard/PageHeader";
import PersonalInfo from "@/components/features/profile/PersonalInfo";
import { protectedUserSession } from "@/lib/authProtected";

async function Profile() {
  const session = await protectedUserSession();
  return (
    <Container>
      <PageHeader title="My Profile">
        <BackButton href="/dashboard" label="Back to home" />
      </PageHeader>
      <PersonalInfo session={session} />
    </Container>
  );
}

export default Profile;

import BackButton from "@/components/BackButton";
import Container from "@/components/container";
import PageHeader from "@/components/dashboard/PageHeader";
import ChangePassword from "@/components/features/profile/ChangePassword";
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
      <ChangePassword />
    </Container>
  );
}

export default Profile;

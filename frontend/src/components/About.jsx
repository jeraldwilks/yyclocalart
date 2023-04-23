import teamMembers from "../teamMembers";
import AboutCard from "./AboutCard"

function createCard(teamMember) {
  return (
    <AboutCard
    key={teamMember.id}
    name={teamMember.name}
    email={teamMember.email}
    />
  );
}

function AboutApp() {
console.log(teamMembers);

return (
  <div>
{teamMembers.map(createCard)}
  </div>
);
}

export default AboutApp;
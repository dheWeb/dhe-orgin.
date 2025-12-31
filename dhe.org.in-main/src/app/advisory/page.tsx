
import AdvisoryCouncil2 from "../component/DesAdvisory";



const advisoryMembers2 = [
  { name: "Mr. Vijay Kumar Nadda",des2: "Organising Secretary, Vidya Bharti (North Region)", designation: "Member, Advisory Council", contact: "9417257310" },
  { name: "Prof. Rajeev Ahuja",des2: "Director, (IIT) Ropar", designation: "Member, Advisory Council", contact: "1881231006" },
  { name: "Prof. Binod Kumar Kanaujia",des2: "Director, (NIT) Jalandhar", designation: "Member, Advisory Council", contact: "	9868795834" },
  { name: "Mr. Manoj Singhal",des2: "Scientific Advisor", designation: "Member, Advisory Council", contact: "9872994017" },
];


export default function Advisory() {
  return (
    <>
    <AdvisoryCouncil2 title="Advisory Council" members={advisoryMembers2} />
  </>
  )
}

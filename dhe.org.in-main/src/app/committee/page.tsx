import AdvisoryCouncil from "../component/AdvisoryCouncilComp";


const committeeMembers = [
  { name: "Shri Ashok Pal", designation: "Patron", contact: "9810296355" },
  { name: "Dr. Thakur Sudesh Kumar Raunija", designation: "Patron", contact: "7627888222" },
  { name: "Smt. Pratibha Gupta", designation: "President", contact: "9814738016" },
  { name: "Mr. Praveen Saini", designation: "Vice President", contact: "9855260099" },
  { name: "Ms. Maninder Kakkar", designation: "Secretary", contact: "9419248487" },
  { name: "Shri Chander Has Gupta", designation: "Treasurer", contact: "9417050631" },
  { name: "Shri Desh Raj Sharma", designation: "General Secretary, Vidya Bharti (North Region)", contact: "9478000698" },
  { name: "Shri. Aurag Biala", designation: "Member", contact: "9814808323" },
  { name: " Shri Vikash Kalsyan", designation: "Member", contact: " 9411644142 " },
  { name: " Shri Vipul Gupta", designation: "Member", contact: "9888701601" },
  { name: "Smt. Sonu Sharma", designation: "Member", contact: "9988690588" },
  { name: "Shri Anshul Bansal", designation: "Member", contact: "9058000045" },
  { name: "Shri Saurav Kumar", designation: "Member", contact: "9023519487" },
];


export default function Committee() {
  return (
    <>
   
    <AdvisoryCouncil title="LMC Members" members={committeeMembers} />
 
  </>
  )
}

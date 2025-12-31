import AdvisoryCouncil from "../component/AdvisoryCouncilComp";

const advisoryMembers = [
  { name: "Dr. Neeraj Naithani", designation: "Coordinator, IT Cell", contact: "9995678372" },
  { name: "Col. K. K. Kakkar", designation: "Coordinator, Event Managment Cell", contact: "8697730065" },
  { name: "Ms. Maninder Kakkar", designation: "Coordinator, Punjab Super 100", contact: "9419248487" },
  { name: "Dr. Neelesh Kumar", designation: "Coordinator, IPR Cell", contact: "9478515278" },
  { name: "Dr. Karan Goel", designation: "Coordinator, Industry Co-ordination Cell", contact: "9915087986" },
  { name: "Dr. Htet Ne Oo", designation: "Coordinator, HEI Co-ordination Cell", contact: "9041120510" },
  { name: "Mr. Sachin Tiwari", designation: "Coordinator, E-commerce Cell", contact: "8729012133" },
  { name: "Dr. Mohit Verma", designation: "Coordinator, TMS Cell", contact: "9872003823" },
  { name: "Mr. Arsh Agarwal", designation: "Coordinator, Udyam Cell", contact: "7986327876" },
  { name: "Shri Saurav Kumar", designation: "Coordinator, Foreign Language Cell", contact: "9023519487" },
  { name: "Ms. Sonu Sharma", designation: "Coordinator, Olympiad Cell", contact: "9988690588" },
  { name: "Ms. Neeru", designation: "Coordinator, LMS Cell", contact: "9467733337" },
  { name: "Dr. Girish Bali", designation: "Coordinator, CSR Cell", contact: "9530703711" },
  { name: "Dr. Neeraj Pant", designation: "Co-coordinator, CSR Cell", contact: "9815298846" },
  { name: "Dr. Praveen Sharma", designation: "Coordinator, R & D Cell", contact: "9988625485" },
  { name: "Dr. Ramit Vasudev", designation: "Coordinator, Art Cell", contact: "9463310838" },
  { name: "Mr. Krishan Kumar", designation: "Coordinator, ATL Cell", contact: "9995565850" },
  { name: "Dr. Chaman Chandel", designation: "Coordinator, Astrology Cell", contact: "8146000152" },
  { name: "Mr. Krishan Kumar", designation: "Coordinator, Publication and Promation Cell", contact: "9995565850" },
  { name: "Mr. Om Parkash", designation: "Coordinator, Environment Cell", contact: "7696277109" },
  { name: "Adv. Ruchita Garg", designation: "Coordinator, Parenting Cell", contact: "9463588899" },
  { name: "Adv. Vikram Verma", designation: "Coordinator, Premium School Cell", contact: "9855400094" },
  { name: "Mrs. Shyam Priya", designation: "Coordinator, Health Wisdom Cell", contact: "9318440221" },
  { name: "Dr. Gurbachan Singh", designation: "Coordinator, Sports Cell", contact: "9781998278" },
  { name: "Adv. Niharika Kamal", designation: "Coordinator, Spritual Cell", contact: "7508638699" },
  { name: "Mr. Anuj Kumar", designation: "Co-coordinator, Spritual Cell", contact: "7508638699" },
  { name: "Adv. Poonam Thakur", designation: "Coordinator, Grievance Redressal Cell", contact: "7508337539" },
];


export default function People() {
  return (
    <>
    <AdvisoryCouncil title="Cell Co-ordinators" members={advisoryMembers} />  
  </>
  )
}

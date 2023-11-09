const users = [
    {
      id: 1,
      name: "John Doe",
      password: "password1",
      designation: "Software Engineer",
      contactNumber: "123-456-7890",
      email: "john.doe@example.com",
      isLogin: false,
     
  
    },
    {
      id: 2,
      name: "Alice Smith",
      password: "password2",
      designation: "Product Manager",
      contactNumber: "234-567-8901",
      email: "alice.smith@example.com",
      isLogin: false,
     
    },
    {
      id: 3,
      name: "Bob Johnson",
      password: "password3",
      designation: "UX Designer",
      contactNumber: "345-678-9012",
      email: "bob.johnson@example.com",
      isLogin: false,
     
    },
    {
      id: 4,
      name: "Jane Williams",
      password: "password4",
      designation: "Data Analyst",
      contactNumber: "456-789-0123",
      email: "jane.williams@example.com",
      isLogin: false,
     
    },
    {
      id: 5,
      name: "Chris Brown",
      password: "password5",
      designation: "Web Developer",
      contactNumber: "567-890-1234",
      email: "chris.brown@example.com",
      isLogin: false,
     timeIn: null,
   timeOut: null, 
   totalHours:null,
    },
    {
      id: 6,
      name: "Emily Davis",
      password: "password6",
      designation: "Project Manager",
      contactNumber: "678-901-2345",
      email: "emily.davis@example.com",
      isLogin: false,
     
    },
    {
      id: 7,
      name: "David Lee",
      password: "password7",
      designation: "UI Designer",
      contactNumber: "789-012-3456",
      email: "david.lee@example.com",
      isLogin: false,
     
    },
    {
      id: 8,
      name: "Grace Wilson",
      password: "password8",
      designation: "Software Engineer",
      contactNumber: "890-123-4567",
      email: "grace.wilson@example.com",
      isLogin: false,
     
    },
    {
      id: 9,
      name: "Ella Clark",
      password: "password9",
      designation: "Data Scientist",
      contactNumber: "901-234-5678",
      email: "ella.clark@example.com",
      isLogin: false,
     
    },
    {
      id: 10,
      name: "James Turner",
      password: "password10",
      designation: "Frontend Developer",
      contactNumber: "012-345-6789",
      email: "james.turner@example.com",
      isLogin: false,
     
    },
    {
      id: 11,
      name: "Sophia Hall",
      password: "password11",
      designation: "Business Analyst",
      contactNumber: "123-456-7890",
      email: "sophia.hall@example.com",
      isLogin: false,
     
    },
    {
      id: 12,
      name: "Michael Miller",
      password: "password12",
      designation: "QA Tester",
      contactNumber: "234-567-8901",
      email: "michael.miller@example.com",
      isLogin: false,
     
    },
    {
      id: 13,
      name: "Olivia Walker",
      password: "password13",
      designation: "Backend Developer",
      contactNumber: "345-678-9012",
      email: "olivia.walker@example.com",
      isLogin: false,
     
    },
    {
      id: 14,
      name: "Liam Green",
      password: "password14",
      designation: "Database Administrator",
      contactNumber: "456-789-0123",
      email: "liam.green@example.com",
      isLogin: false,
     
    },
    {
      id: 15,
      name: "Ava Perez",
      password: "password15",
      designation: "System Architect",
      contactNumber: "567-890-1234",
      email: "ava.perez@example.com",
      isLogin: false,
     
    },
    {
      id: 16,
      name: "William Harris",
      password: "password16",
      designation: "Network Engineer",
      contactNumber: "678-901-2345",
      email: "william.harris@example.com",
      isLogin: false,
     
    },
    {
      id: 17,
      name: "Mia Martinez",
      password: "password17",
      designation: "Full Stack Developer",
      contactNumber: "789-012-3456",
      email: "mia.martinez@example.com",
      isLogin: false,
     
    },
    {
      id: 18,
      name: "Benjamin Lopez",
      password: "password18",
      designation: "UI/UX Designer",
      contactNumber: "890-123-4567",
      email: "benjamin.lopez@example.com",
      isLogin: false,
     
    },
    {
      id: 19,
      name: "Camila King",
      password: "password19",
      designation: "Project Manager",
      contactNumber: "901-234-5678",
      email: "camila.king@example.com",
      isLogin: false,
     
    },
    {
      id: 20,
      name: "Ethan Wright",
      password: "password20",
      designation: "Software Engineer",
      contactNumber: "012-345-6789",
      email: "ethan.wright@example.com",
      isLogin: false,
     
    },
    {
      id: 21,
      name: "Oliver Taylor",
      password: "password21",
      designation: "Product Manager",
      contactNumber: "123-456-7890",
      email: "oliver.taylor@example.com",
      isLogin: false,
     
    },
    {
      id: 22,
      name: "Charlotte Harris",
      password: "password22",
      designation: "Web Developer",
      contactNumber: "234-567-8901",
      email: "charlotte.harris@example.com",
      isLogin: false,
     
    },
    {
      id: 23,
      name: "Mason Martinez",
      password: "password23",
      designation: "Data Analyst",
      contactNumber: "345-678-9012",
      email: "mason.martinez@example.com",
      isLogin: false,
     
    },
    {
      id: 24,
      name: "Amelia Davis",
      password: "password24",
      designation: "Software Engineer",
      contactNumber: "456-789-0123",
      email: "amelia.davis@example.com",
      isLogin: false,
     
    },
    {
      id: 25,
      name: "Liam Wilson",
      password: "password25",
      designation: "UX Designer",
      contactNumber: "567-890-1234",
      email: "liam.wilson@example.com",
      isLogin: false,
     
    },
    {
      id: 26,
      name: "Sophia Turner",
      password: "password26",
      designation: "Frontend Developer",
      contactNumber: "678-901-2345",
      email: "sophia.turner@example.com",
      isLogin: false,
     
    },
    {
      id: 27,
      name: "Michael Clark",
      password: "password27",
      designation: "Project Manager",
      contactNumber: "789-012-3456",
      email: "michael.clark@example.com",
      isLogin: false,
     
    },
    {
      id: 28,
      name: "Ella Green",
      password: "password28",
      designation: "Database Administrator",
      contactNumber: "890-123-4567",
      email: "ella.green@example.com",
      isLogin: false,
     
    },
    {
      id: 29,
      name: "James Harris",
      password: "password29",
      designation: "Full Stack Developer",
      contactNumber: "901-234-5678",
      email: "james.harris@example.com",
      isLogin: false,
     
    },
    {
      id: 30,
    name: "Olivia Smith",
    password: "password30",
    designation: "System Architect",
    contactNumber: "012-345-6789",
    email: "olivia.smith@example.com",
    isLogin: false,
   
    }
  ];
  
  export default users;
  
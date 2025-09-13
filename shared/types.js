// ---------------------------
// User structure
// ---------------------------
const User = {
    id: "",        // unique identifier (string / ObjectId from MongoDB)
    name: "",      // user full name
    email: "",     // user email (unique)
    role: "user",  // "admin" | "sales" | "support"
  };
  
  // ---------------------------
  // Company structure
  // ---------------------------
  const Company = {
    id: "",
    name: "",
    domain: "",    // e.g. "apple.com"
    ownerId: "",   // which user owns this company
  };
  
  // ---------------------------
  // Contact structure
  // ---------------------------
  const Contact = {
    id: "",
    name: "",
    email: "",
    phone: "",
    companyId: "", // belongs to which company
  };
  
  // ---------------------------
  // Deal structure
  // ---------------------------
  const Deal = {
    id: "",
    title: "",
    value: 0,          // deal value in $
    stage: "New",      // pipeline stage
    ownerId: "",
    companyId: "",
  };
  
  // ---------------------------
  // Export all
  // ---------------------------
  module.exports = { User, Company, Contact, Deal };
  
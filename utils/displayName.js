function createDisplayName(person) {
   const givenName = person.givn || "";
   const surname = person.surn || "";
   const suffix = person.nsfx || "";

   let displayName = surname.trim();

   if (givenName) {
      displayName += ", " + givenName.trim();
   }

   if (suffix) {
      displayName += " " + suffix.trim();
   }

   return displayName;
}

export default createDisplayName;
export const createDisplayName = (person) => {
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
};

export const getBirthYear = (person) => {
   if (!!person.birthday) {
     const birthDate = new Date(person.birthday);
     const birthYear = birthDate.getFullYear();
     const birthMonth = String(birthDate.getMonth() + 1).padStart(2, '0');
     const birthDay = String(birthDate.getDate()).padStart(2, '0');
     return `${birthYear}-${birthMonth}-${birthDay}`;
   } else if (!!person.birth_year) {
     return `${person.birth_year}`;
   }
 
   return '';
 };
 
 export const getDeathYear = (person) => {
   if (person.deathday) {
     const deathDate = new Date(person.deathday);
     const deathYear = deathDate.getFullYear();
     const deathMonth = String(deathDate.getMonth() + 1).padStart(2, '0');
     const deathDay = String(deathDate.getDate()).padStart(2, '0');
     return `${deathYear}-${deathMonth}-${deathDay}`;
   } else if (person.death_year) {
     return `${person.death_year}`;
   }
   
   return '';
 };
 
 export const formatDateToYMD = (dateStr) => {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}
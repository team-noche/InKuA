// After the user successfully logs in...
//Determine the user's role (por ejemplo, desde la base de datos o la sesión)

const userRole = 'student'; 

//Redirects the user according to their role
if (userRole === 'student') {
res.redirect('/student-home');
} else if (userRole === 'tutor') {
res.redirect('/tutor-home');
} else if (userRole === 'sponsor') {
res.redirect('/sponsor-home');
} else {
  // Redirects to a default page if the role is not recognized
res.redirect('/default-home');
}

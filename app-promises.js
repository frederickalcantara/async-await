const users = [{
	id: 1,
	name: 'Fred',
	schoolId: 101
}, {
	id: 2,
	name: 'Sean',
	schoolId: 999
}];
const grades = [
  {
    id: 1,
    schoolId: 101,
    grade: 86
  },
  {
    id: 2,
    schoolId: 999,
    grade: 100
  },
  {
    id: 3,
    schoolId: 101,
    grade: 80
  }
];

const getUser = (id) => {
	return new Promise((resolve, reject) => {
		const user = users.find((user) => user.id === id);

		if (user) {
			resolve(user);
		} else {
			reject(`Unable to find user with id of ${id}.`);
		}
	});
};

const getGrades = (schoolId) => {
	return new Promise((resolve, reject) => {
		resolve(grades.filter((grade) => grade.schoolId === schoolId));
	})
};

const getStatus = (userId) => {
	let user;
	return getUser(userId).then((tempUser) => {
		user = tempUser;
		return getGrades(user.schoolId);
	}).then((grades) => {
		let average = 0;

		if (grades.length > 0) {
			average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
		}
		return `${user.name} has a ${average}% in the class.`;
	});
};

// async await

const getStatusAlt = async (userId) => {
	const user = await getUser(userId);
	const grades = await getGrades(user.schoolId);
	let average = 0;

  if (grades.length > 0) {
    average = grades
        .map(grade => grade.grade)
        .reduce((a, b) => a + b) / grades.length;
	}

  return `${user.name} has a ${average}% in the class.`;
};

getStatusAlt(1).then((name) => {
	console.log(name);
}).catch((e) => {
	console.log(e);
})

// .then is promise-based chaining

// async equivalent
// () => {
// 	return new Promise((resolve, reject) => {
// 		resolve('Fred');
// 	});
// }


// await equivalent
// return getUser(userId).then(tempUser => {
//   user = tempUser;
//   return getGrades(user.schoolId);
// });


// Both examples are nested under a return new Promise function

// return 'Fred';
// resolve ('Fred');

// throw "new Error('String')"
// The same as "reject('String')"



// regular functions return strings, whereas async functions return promises

// getStatus(1).then((status) => {
// 	console.log(status);
// }).catch((e) => {
// 	console.log(e);
// });

// There is no top level await, but there is a top level async
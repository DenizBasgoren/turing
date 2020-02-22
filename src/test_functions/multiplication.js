


function pickOneFrom(...arr) {
	return arr[randomBetween(0, arr.length)]
}

function randomBetween(from, toExcl) {
	return Math.floor(Math.random() * (toExcl - from) + from)
}


function generate() {
	let n1 = randomBetween(2, 16)
	let n2 = randomBetween(2, 16)
	let mul = n1 * n2
	return [n1.toString(2), n2.toString(2), mul.toString(2)]
}


function defect(number) {
	let isToBeDefected = Array(number.length).fill(false)

	let defectedTimes = 0, defectTimes = randomBetween(1, number.length)

	while (defectTimes !== defectedTimes) {

		let index = randomBetween(1, number.length)
		if (isToBeDefected[index]) {
			continue
		}
		else {
			isToBeDefected[index] = true
			defectedTimes++
		}
	}

	number = number.split('')

	for (let i = 0; i < number.length; i++) {
		if (isToBeDefected[i]) {
			number[i] = number[i] === '1' ? '0' : '1'
		}
	}

	return number.join('')
}


module.exports = function multiplication() {

	let tests = []

	while ( tests.length !== 100 ) {
		let test = { tape: {}, expected: pickOneFrom(true, false) }

		let tuple = generate()

		if ( !test.expected ) {
			let indexToDefect = pickOneFrom(0,1,2)

			tuple[indexToDefect] = defect( tuple[indexToDefect] )
		}

		
		for (let j = 0; j<tuple.length; j++) {
			for (let i = 0; i<tuple[j].length; i++) {
				test.tape[`${i} ${j}`] = tuple[j][i]
			}
		}
		
		tests.push( test )

	}

	return tests
}
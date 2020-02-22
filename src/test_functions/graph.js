

function pickOneFrom(...arr) {
	return arr[randomBetween(0, arr.length)]
}

function randomBetween(from, toExcl) {
	return Math.floor(Math.random() * (toExcl - from) + from)
}


function generate_groups() {

	const NODES = ['F', 'W', 'A', 'E']

	let groups = Array(NODES.length).fill(true).map(r => [])
	let single = pickOneFrom(true, false)

	if (single) {
		groups[0] = ['F', 'W', 'A', 'E']
	}
	else {
		for (let i = 0; i < NODES.length; i++) {
			groups[randomBetween(0, NODES.length)].push(NODES[i])
		}
	}

	return groups
}

function generate_pairs( groups) {
	let pairs = []

	for (let i = 0; i<groups.length; i++) {

		if ( groups[i].length === 0) continue
		
		let usedOnes = Array( groups[i].length ).fill(false)
		let generatedFirstOne = false

		while ( usedOnes.filter( a => a ).length !== usedOnes.length) {
			let n1 = randomBetween(0, groups[i].length )
			let n2 = randomBetween(0, groups[i].length )
			
			if (generatedFirstOne) {
				if ( !usedOnes[n1] && !usedOnes[n2]) {
					continue
				}
			}

			pairs.push( [ groups[i][n1], groups[i][n2]] )
			usedOnes[n1] = true
			usedOnes[n2] = true
			generatedFirstOne = true
		}
	}

	return pairs
}

function isSingleGroup( groups ) {
	let isSingle = false

	for (let i = 0; i<groups.length; i++) {
		if ( groups[i].length === groups.length ) {
			isSingle = true
			break
		}
	}

	return isSingle
}


module.exports = function graph() {

	let tests = []

	while ( tests.length !== 100) {

		let test = { tape: {} }

		let groups = generate_groups()
		let pairs = generate_pairs(groups)

		test.expected = isSingleGroup(groups)

		for (let i = 0; i<pairs.length; i++) {
			test.tape[`0 ${i}`] = pairs[i][0]
			test.tape[`1 ${i}`] = pairs[i][1]
		}

		tests.push( test )
	}

	return tests
}
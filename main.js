// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

function pAequorFactory (specimenNum, dna) {
  return {
    specimenNum: specimenNum,
    dna: dna,
    mutate (dna) {
      const rndBase = Math.floor(Math.random() * 14);
      const compareDna = this.dna[rndBase];
      this.dna[rndBase] = returnRandBase();
      if (this.dna[rndBase] === compareDna) {
        this.dna[rndBase] = returnRandBase();
      }
      return this.dna;
    },
    compareDNA (pAequor) {
      let counter = 0;
      for (let i = 0; i < pAequor.dna.length; i++) {
        if (pAequor.dna[i] === this.dna[i]) {
          counter++;
        }
      }
      console.log(`${this.specimenNum} and ${pAequor.specimenNum} have ${Math.floor(counter * 100 / 15)}% DNA in common.`);
    },
    willLikelySurvive () {
      let counter = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === 'C' || this.dna[i] === 'G') {
          counter++;
        }
      }
      return counter * 100 / 15 >= 60;
    }
  }
};
const survivableOrganisms = [];
let i = 1;
while (survivableOrganisms.length < 30) {
  const organism = pAequorFactory(i, mockUpStrand());
  if (organism.willLikelySurvive()) {
    survivableOrganisms.push(organism)
  };
  i++;
};
// const pAequor1 = pAequorFactory(2, mockUpStrand());
// console.log(pAequor1.dna);
// console.log(pAequor1.willLikelySurvive());
console.log(survivableOrganisms);

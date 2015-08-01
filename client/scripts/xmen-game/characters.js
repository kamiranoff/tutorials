function Mutant(name, alias, skills, information, powers, health) {
  this.name = name;
  this.alias = alias;
  this.information = information;
  this.powers = powers;
  this.health = health;

}

Mutant.prototype.manifestPowers = function() {
  this.powers = arguments;
};

Mutant.prototype.damage = function(damage) {
  this.health -= damage;
  this.exp += 2;
};


Mutant.prototype.skills = function(intelligence, strength, speed, durability, energyProjection, fightingSkills) {
  this.skills = {
    intelligence: intelligence,
    strength: strength,
    speed: speed,
    durability: durability,
    energyProjection: energyProjection,
    fightingSkills: fightingSkills
  };

};

//CHANCE CALCULATOR
function chanceCalculator(amount) {
  var r = Math.random();
  if (r <= amount) {
    return true;
  } else {
    return false;
  }
}

/*=============================
=            TEAMS            =
=============================*/
function Team(teamName, mutants) {
  // body...
  this.teamName = teamName;
  this.mutant = mutants;

}

// function BrotherHoodMutant() {
//   // body...
//   this.teamName = 'BrotherHood';

// }
/*-----  End of TEAMS  ------*/

//MUTANTS
var Cyclops = new Mutant('Scott Summers', 'Cyclops', {}, {}, ['eye beam'], 100);
var Wolverine = new Mutant('James Howlett', 'Wolverine', {}, {}, ["healing", "claws", "senses"], 200);
Cyclops.skills(4, 3, 3, 2, 5, 4);
Wolverine.skills(2, 4, 4, 6, 1, 5);


//TEAMS
var XMen = new Team('X-Men', [Cyclops, Wolverine]);
var BrotherHoodMutant = new Team('BrotherHood', ['Magneto']);

// Wolverine.name = "James Howlett";
// Wolverine.manifestPowers("healing", "claws", "senses");

console.log(XMen);



jQuery(document).ready(function($) {
  var game = $('.xmen-game');

  for (var i = 0; i <= XMen.mutant.length - 1; i++) {
    console.log(XMen.mutant[i]);
    game.append(JSON.stringify(XMen.mutant[i]) + '<br>');
  }

  $('.intelligenceTest').on('click', function() {


    function intelCalc(baseIntelligence, luckiness) {
      var xFactor = chanceCalculator(luckiness);
      if (xFactor === true) {
        return baseIntelligence * 2;
      } else {
        return baseIntelligence;
      }
    }

    var luckiness = 0.1;
    var cIntel = intelCalc(Cyclops.skills.intelligence, luckiness);
    var wIntel = intelCalc(Wolverine.skills.intelligence, luckiness);
    if (cIntel > wIntel) {
      console.log('Cycplops wins');
    } else {
      console.log('Wolverine wins');
    }
  });

});

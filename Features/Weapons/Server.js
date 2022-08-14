

const Weapon = {
    Pistol: {
        name: "Pistol",
        weaponid: 0,
        accuracy: 70,
        range: 800,
        damage: 30,
    },
    Rilfe: {
        name: "Rifle",
        weaponid: 1,
        accuracy: 40,
        range: 1300,
        damage: 45,
    },
    Knife: {
        name: "Knife",
        weaponid: 2,
        accuracy: 1000,
        range: 50,
        damage: 100
    }
}

const Weapons = [Weapon.Pistol, Weapon.Rilfe, Weapon.Knife]

module.exports = {
    Weapon,
    Weapons
}
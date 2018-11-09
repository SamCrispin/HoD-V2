function displayFightOptions() {
    id("fightOpeningBanner").style.display = "none";
    id("fightMovesBanner").style.display = "block";
    id ("fightBack").style.display = "block";
}

function displayWeapons() {
    id("fightOpeningBanner").style.display = "none";
    id("fightWeaponsBanner").style.display = "block";
    id ("fightBack").style.display = "block";
}

function fightBack() {
    id("fightOpeningBanner").style.display = "block";
    id("fightMovesBanner").style.display = "none";
    id("fightWeaponsBanner").style.display = "none";
    id ("fightBack").style.display = "none";
}
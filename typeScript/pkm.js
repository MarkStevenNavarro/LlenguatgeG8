var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var urlPokemons = "https://pokeapi.co/api/v2/pokemon/";
var urlTipus = "https://pokeapi.co/api/v2/type/";
var firstPokemon = 1;
var numPokemon;
fetch(urlPokemons)
    .then(function (response) { return response.json(); })
    .then(function (data) {
    numPokemon = data.count;
});
var contenidor = document.querySelector(".contenidor");
var select = document.getElementById("tipus");
var nomPk = document.getElementById("nomPK");
nomPk.addEventListener("change", fetchPokemon);
function inserirSelector() {
    var _loop_1 = function (i) {
        fetch(urlTipus)
            .then(function (response) { return response.json(); })
            .then(function (data) {
            var tipus = data.results[i].name;
            if (select != null) {
                if (tipus == 'unknown') {
                    select.innerHTML += '<option value=unknown>all</option>';
                }
                else {
                    select.innerHTML += '<option value=' + tipus + '>' + tipus + '</option>';
                }
            }
        });
    };
    for (var i = 0; i < 20; i++) {
        _loop_1(i);
    }
    if (select != null) {
        select.addEventListener("change", fetchPokemon);
    }
}
function showPokemon(pokemon, div) {
    var img = document.createElement('img');
    if (pokemon.sprites.front_default != null) {
        img.src = pokemon.sprites.front_default;
    }
    else {
        img.src = "imatges/unknown.png";
        img.style.height = "96px";
        img.style.width = "96px";
    }
    img.id = pokemon.id;
    div.classList.add('image');
    div.appendChild(img);
}
function fetchPokemon() {
    return __awaiter(this, void 0, void 0, function () {
        var _loop_2, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(contenidor != null && select != null)) return [3 /*break*/, 4];
                    contenidor.innerHTML = "";
                    _loop_2 = function (i) {
                        var pokeEndpoint, response, pokemon, imatge;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    pokeEndpoint = "".concat(urlPokemons).concat(i);
                                    return [4 /*yield*/, fetch(pokeEndpoint)];
                                case 1:
                                    response = _b.sent();
                                    return [4 /*yield*/, response.json()];
                                case 2:
                                    pokemon = _b.sent();
                                    if ((pokemon.types[0].type.name == select.value || (pokemon.types[1] != undefined && pokemon.types[1].type.name == select.value)) || select.value == "unknown") {
                                        if (nomPk.value == "" || pokemon.name.includes(nomPk.value)) {
                                            showPokemon(pokemon, contenidor);
                                            imatge = document.getElementById(pokemon.id);
                                            imatge.addEventListener("click", function () {
                                                mostrarStats(pokemon.id);
                                            });
                                        }
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    };
                    i = firstPokemon;
                    _a.label = 1;
                case 1:
                    if (!(i < numPokemon)) return [3 /*break*/, 4];
                    return [5 /*yield**/, _loop_2(i)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function mostrarStats(id) {
    var caracteristiques = document.getElementById("caracteristiques");
    fetch("https://pokeapi.co/api/v2/pokemon/" + id)
        .then(function (response) { return response.json(); })
        .then(function (pokemon) {
        var hp = pokemon.stats[0].base_stat;
        var atac = pokemon.stats[1].base_stat;
        var def = pokemon.stats[2].base_stat;
        var atacSp = pokemon.stats[3].base_stat;
        var defSp = pokemon.stats[4].base_stat;
        var vel = pokemon.stats[5].base_stat;
        var hpBar = document.getElementById('hp-bar');
        var HP = document.getElementById("hp");
        var atacBar = document.getElementById('atac-bar');
        var ATAC = document.getElementById("atac");
        var defBar = document.getElementById('def-bar');
        var DEF = document.getElementById("def");
        var atacSpBar = document.getElementById('atacSp-bar');
        var ATACSP = document.getElementById("atacSp");
        var defSpBar = document.getElementById('defSp-bar');
        var DEFSP = document.getElementById("defSp");
        var velBar = document.getElementById('vel-bar');
        var VEL = document.getElementById("vel");
        var labels = document.querySelectorAll("label");
        labels[0].innerHTML = hp;
        hpBar.style.width = hp + 'px';
        hpBar.style.backgroundColor = getStatColor(hp);
        labels[1].innerHTML = atac;
        atacBar.style.width = atac + 'px';
        atacBar.style.backgroundColor = getStatColor(atac);
        labels[2].innerHTML = def;
        defBar.style.width = def + 'px';
        defBar.style.backgroundColor = getStatColor(def);
        labels[3].innerHTML = atacSp;
        atacSpBar.style.width = atacSp + 'px';
        atacSpBar.style.backgroundColor = getStatColor(atacSp);
        labels[4].innerHTML = defSp;
        defSpBar.style.width = defSp + 'px';
        defSpBar.style.backgroundColor = getStatColor(defSp);
        labels[5].innerHTML = vel;
        velBar.style.width = vel + 'px';
        velBar.style.backgroundColor = getStatColor(vel);
        caracteristiques.innerHTML = "Name: " + pokemon.name + "<br>" + "Height: " + pokemon.height / 10
            + " m.<br>" + "Weight: " + pokemon.weight / 10 + " Kg. <br>";
        var img = document.createElement("img");
        img.src = pokemon.sprites.front_default;
        var imgsy = document.createElement("img");
        imgsy.src = pokemon.sprites.front_shiny;
        caracteristiques.appendChild(img);
        caracteristiques.appendChild(imgsy);
    })
        .catch(function (error) {
        console.error("Error fetching pokemon:", error);
    });
}
inserirSelector();
fetchPokemon();
function getStatColor(statValue) {
    if (statValue >= 120) {
        return '#00ff00';
    }
    else if (statValue >= 70) {
        return '#ffcc00';
    }
    else {
        return '#ff0000';
    }
}

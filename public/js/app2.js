const d = document.querySelector('#dat');
const c = document.querySelector(".form-select");
const tc = document.querySelector("#totc");
const tr = document.querySelector("#totr");
const td = document.querySelector("#totd");
const nc = document.querySelector("#totnc");
const nr = document.querySelector("#totnr");
const nd = document.querySelector("#totnd");
const con = document.querySelector("#con");
const f = document.querySelector("#fl");
const g = document.querySelector("#glo");

f.classList.add("to");

async function getapis() {
    const result = await fetch("https://api.covid19api.com/summary"); //api for all countries
    const dat = await result.json()
    const date = dat.Date;
    d.textContent = date;
    const op = document.createElement('option');
    const t = document.createTextNode("Global");
    op.appendChild(t);
    op.selected;
    c.append(op);
    con.textContent = "World";
    const v = dat.Global;
    adte(tc, v.TotalConfirmed);
    adte(tr, v.TotalRecovered);
    adte(td, v.TotalDeaths);
    adte(nc, v.NewConfirmed);
    adte(nr, v.NewRecovered);
    adte(nd, v.NewDeaths);
    makeim(dat.Countries);
    async function ca() {
        const count = document.querySelectorAll(".counter");
        var speed = 100;
        count.forEach(c => {
            const updatec = () => {
                const tar = +c.getAttribute('data-target');
                const act = +c.innerText;
                const inc = tar / speed;
                if (act < tar) {
                    c.innerText = Math.floor(act + inc);
                    setTimeout(updatec, 1);
                } else {
                    c.innerText = tar;
                }
            }
            updatec();
        });
    }
    ca();
}

getapis();

//   https://api.covid19api.com/total/country/india    -- api for country wise graph

const body = document.querySelector('body');

async function makeim(rs) {
    for (let a of rs) {
        createa(a.Country, c, a.CountryCode);
    }
}

function createa(r, tr, c) {
    const op = document.createElement('option');
    const t = document.createTextNode(`${r} (${c})`);
    op.appendChild(t);
    op.value = c;
    tr.append(op);
}

function adte(id, val) {
    id.setAttribute('data-target', val);
    id.textContent = 0;
}

const sel = document.querySelector("#coni");
const form = document.querySelector("#add");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const val = sel.value;
    findcon(val);
});

async function findcon(a) {
    const r = await fetch(`https://corona.lmao.ninja/v2/countries/${a}`);
    if (r.status === 404) {
        f.classList.add("to");
        g.classList.remove('to');
        con.textContent = "World";
    } else {
        const dd = await r.json();
        con.textContent = dd.country;
        const result = await fetch("https://api.covid19api.com/summary"); //api for all countries
        const dat = await result.json()
        for (let l of dat.Countries) {
            if (l.CountryCode === a) {
                adte(tc, l.TotalConfirmed);
                adte(tr, l.TotalRecovered);
                adte(td, l.TotalDeaths);
                adte(nc, l.NewConfirmed);
                adte(nr, l.NewRecovered);
                adte(nd, l.NewDeaths);
            }
        }
        async function ca() {
            const count = document.querySelectorAll(".counter");
            var speed = 100;
            count.forEach(c => {
                const updatec = () => {
                    const tar = +c.getAttribute('data-target');
                    const act = +c.innerText;
                    const inc = tar / speed;
                    if (act < tar) {
                        c.innerText = Math.floor(act + inc);
                        setTimeout(updatec, 1);
                    } else {
                        c.innerText = tar;
                    }
                }
                updatec();
            });
        }
        ca();
        f.classList.remove('to');
        if (dd.countryInfo.flag !== "")
            f.src = await dd.countryInfo.flag;
        else
            f.classList.add("to");
        g.classList.add('to');
    }
}
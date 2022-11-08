import FetchWrapper from "./fetch-wrapper.js";

const form = document.querySelector("#register-form");
const jmeno = document.querySelector("#register-jmeno");
const prijmeni = document.querySelector("#register-prijmeni");
const vek = document.querySelector("#register-vek");
const telefon = document.querySelector("#register-telefon");
const tbody = document.querySelector("#pojistenci-table tbody");

const postPojisteni = document.querySelector(".post-pojisteni");
const editDetail = document.querySelector(".edit-detail");

const API = new FetchWrapper(
	"https://aethalas-default-rtdb.europe-west1.firebasedatabase.app/Pojisteni");

//TABLE POJISTENCU
const displayPojistenci = (jmeno, prijmeni, vek, telefon, key) => {

	tbody.insertAdjacentHTML("beforeend",
		`<tr id="trko" style="display: ;">
			<td id="tdcko" class="ps-3 cislo"></td>
			<td id="tdcko" class="px-0">${jmeno} ${prijmeni}</td>
			<td id="tdcko">${telefon}</td>
			<td id="tdcko" class="text-center ps-0">${vek}</td>
			<td id="qwert" class="px-0" style="width: 70px;">
				<button id="${key}" type="button" class="btn-close closeButt" aria-label="Close"></button>
				<button id="${key}" type="button" class="btn-edit dropstart" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside"></button>
				<form id="edit-form" class="dropdown-menu container-sm w-50 px-4 py-2 text-center" style="max-width: 30em; min-width: 20em;">
					<div class="row justify-content-center">
						<div class="col-sm">
							<label for="edit-jmeno" class="form-label pt-2">Jméno</label>
							<input id="edit-jmeno${key}" class="form-control inButts my-0" type="text" maxlength="20" value="${jmeno}">
						</div>
						<div class="col-sm">
							<label for="edit-prijmeni" class="form-label pt-2">Příjmení</label>
							<input id="edit-prijmeni${key}" class="form-control inButts my-0" type="text" maxlength="20" value="${prijmeni}">
						</div>
					</div>
					<div class="row justify-content-center">
						<div class="col-sm">
							<label for="edit-vek" class="form-label pt-2">Věk</label>
							<input id="edit-vek${key}" class="form-control inButts my-0" type="number" maxlength="3" min="18" value="${vek}">
						</div>
						<div class="col-sm">
							<label for="edit-telefon" class="form-label pt-2">Telefon</label>
							<input id="edit-telefon${key}" class="form-control inButts my-0" type="tel" maxlength="12" value="${telefon}">
						</div>
					</div>
					<div class="row justify-content-center">
						<div class="col-auto">
							<input type="submit" value="Upravit" id="${key}" class="btn btn-default edit-btn prd mt-4">
						</div>
					</div>
				</form>
			</td>
		</tr>`
	);
	// CISLOVANI
	const trko = document.querySelectorAll("#trko");
	const trk = (trko[trko.length- 1]);
	const cislovani = document.querySelectorAll(".cislo");
	const cislo = (cislovani[cislovani.length- 1]);
	
	const ocisluj = () => {
		cislo.textContent = `${cislovani.length}`;
	}
	ocisluj();

	//DETAIL TABLE
	const tdcko = document.querySelectorAll("#tdcko");
	const tdc = (tdcko[tdcko.length- 1]);
	const tdcc = (tdcko[tdcko.length- 2]);
	const tdccc = (tdcko[tdcko.length- 3]);
	const tddd = [tdc, tdcc, tdccc];

	tddd.forEach(tdddd => {
	tdddd.addEventListener("click", event => {
	  	event.preventDefault();	
		detailJmeno.value = `${jmeno}`;
		detailPrijmeni.value = `${prijmeni}`;
		detailVek.value = `${vek}`;
		detailTelefon.value = `${telefon}`;
	  	detail(jmeno, prijmeni, vek, telefon, key);  
		})
  	})
	
	// SEARCH
	const search = document.querySelector("#app-search");
	const inform = (`${jmeno} ${prijmeni} ${telefon} ${vek}`);

	const vyhledej = (query = "") => {
		const cleanedupQuery = query.trim().toLowerCase();
		const filtered = inform.toLowerCase();
		trk.style.display = "";

		if (filtered.includes(cleanedupQuery)) {
			trk.style.display = "";
		} else {
			trk.style.display = "none";
		}
	}

	search.addEventListener("keyup", () => {
		vyhledej(search.value);
	});
	  
	// SMASH POJISTENCE
	const closeButts = document.querySelectorAll(".closeButt");
	const closeButt = (closeButts[closeButts.length- 1]);
	const closeID = closeButt.id;

		closeButt.addEventListener("click", event => {
			event.preventDefault();
			smash(closeID, "");
			mujSnackbar("Pojištěnec byl odebrán.");
		});

	// PUT
	const editJmeno = document.querySelector(`#edit-jmeno${key}`);
	const editPrijmeni = document.querySelector(`#edit-prijmeni${key}`);
	const editVek = document.querySelector(`#edit-vek${key}`);
	const editTelefon = document.querySelector(`#edit-telefon${key}`);
	const editButts = document.querySelectorAll(`.edit-btn`);
	const editButt = (editButts[editButts.length- 1])
	const editID = editButt.id;

		editButt.addEventListener("click", event => {
			event.preventDefault();
			if (editJmeno.value.length < 1) return; 
			if (editPrijmeni.value.length < 1) return;
			if (editVek.value < 1) return;
			if (editTelefon.value.length < 1) return ;

			putna(editID, editJmeno.value, editPrijmeni.value, editVek.value, editTelefon.value);
			mujSnackbar("Pojištěnec byl upraven.");
		});


	//ADMIN TOOLS
	const btnRow = document.querySelector("#btn-row");
	const adminus = document.querySelector(".adminus");
	const adminusak = document.querySelector(".adminusak");
	const qwerty = document.querySelectorAll("#qwert");
	const qwert = (qwerty[qwerty.length- 1]);
	const adminTool = [qwert, btnRow, adminus, adminusak];
	
	adminTool.forEach(tools => {
	  adminTools(tools, key)
	});

};
	//KONEC DISKA

//POST POJISTENCI SUBMIT
form.addEventListener("submit", event => {
	event.preventDefault();
	if (jmeno.value.length < 1) return; 
	if (prijmeni.value.length < 1) return;
	if (vek.value < 1) return;
	if (telefon.value.length < 1) return ;

	API.post(`/Pojistenec.json`, {
		info: {
			jmeno: jmeno.value,
			prijmeni: prijmeni.value,
			vek: vek.value,
			telefon: telefon.value}
	}).then(data => {
		displayPojistenci(jmeno.value, prijmeni.value, vek.value, telefon.value, data.name);

		jmeno.value = "";
		prijmeni.value = "";
		vek.value = "";
		telefon.value = "";
		
		document.querySelector("#close-new").click();

		mujSnackbar("Nový pojištěnec byl přidán.");
	});
});

//GET POJISTENCE
const init = () => {
	API.get("/Pojistenec.json").then(data => {
		if (data == null) return;
		Object.keys(data).forEach(key => {
			const klice = (data[key]);
			displayPojistenci(klice.info.jmeno, klice.info.prijmeni, klice.info.vek, klice.info.telefon, key);
		})
	})
}

// SNACKSNACK
const snackbar = document.querySelector(".snackbar")

const mujSnackbar = snackac => {
	snackbar.textContent = `${snackac}`

	snackbar.classList.add("show");
	setTimeout(function(){ snackbar.classList.remove("show"); }, 4000);
}

// EASY LOGIN - next lvl Firebase
const logForm = document.querySelector("#login-form");
const logName = document.querySelector("#login-name");
const logPass = document.querySelector("#login-pass");
const prihlasovak = document.querySelector("#prihlasovak");
const odhlasovak = document.querySelector("#odhlasovak");
let admin = false;

logForm.addEventListener("submit", event => {
	event.preventDefault();

	if (logName.value + logPass.value === "AdminHovnovolepole"){
		mujSnackbar(`${logName.value} byl přihlášen`);
		prihlasovak.click();
		prihlasovak.classList.add("d-none");
		odhlasovak.classList.remove("d-none");
		const adminus = document.querySelector(".adminus")
	  	adminus.classList.remove("d-none");
		admin = true;
		tbody.innerHTML = "";
		init();
		tbodyPojisteni.innerHTML = "";
		initPojisteni(editDetail.id);

	} else {
		mujSnackbar("Zadal jste špatné jméno nebo heslo");
	}
})

odhlasovak.addEventListener("click", event => {
	event.preventDefault();
	prihlasovak.classList.remove("d-none");
	odhlasovak.classList.add("d-none");
	const adminus = document.querySelector(".adminus")
	adminus.classList.add("d-none");
	mujSnackbar("Byl jste odhlášen")
	admin = false;
	tbody.innerHTML = "";
	init()
	tbodyPojisteni.innerHTML = "";
	initPojisteni(editDetail.id);
})

//ADMIN
const adminTools = (tools, fKey) => {
	if (admin == false) {
	  	tools.classList.add("d-none");
	} else {
	  	tools.classList.remove("d-none");
	};
}

//SMASH
const smash = (startID, endID) => {
	if (endID == "") {
		API.delete(`/Pojistenec/${startID}.json`, {
			jmeno: "",
			prijmeni: "",
			vek: "",
			telefon: ""
		}).then(() => {
			tbody.innerHTML = "";
			init();
		});
	} else {
		API.delete(`/Pojistenec/${startID}/pojisteni/${endID}.json`, {
			typ: "",
			castka: ""
		}).then(() => {
			tbodyPojisteni.innerHTML = "";
			initPojisteni(startID);
		});
	}
}

//SMASH DETAIL
const closeEdit = document.querySelector(".close-edit");

closeEdit.addEventListener("click", event => {
	event.preventDefault();
	const closeEditID = closeEdit.id;
	smash(closeEditID, "");
	zpetak();
	mujSnackbar("Pojištěnec byl odebrán.");
});

//ZPET - pojistenci
const pojistenciPage = document.querySelectorAll("#pojistenci-page");
	
const zpetak = () => {
	pojisteni.style.display = "";
	pojistenec.style.display = "none";
}

pojistenciPage.forEach(zpet => {
	zpet.addEventListener("click", event => {
		event.preventDefault();
		zpetak();
	})
});

// DETAIL
const detail = (dJmeno, dPrijmeni, dVek, dTelefon, fKey) => {
	const pojisteni = document.querySelector("#pojisteni");
	const pojistenec = document.querySelector("#pojistenec");
	const detailJmeno = document.querySelector("#detail-jmeno");
	const detailVek = document.querySelector("#detail-vek");
	const detailTel = document.querySelector("#detail-tel");
	
	pojisteni.style.display = "none";
	pojistenec.style.display = "";

	tbodyPojisteni.innerHTML = "";
	initPojisteni(fKey);

	detailJmeno.textContent = `${dJmeno} ${dPrijmeni}`;
	detailVek.textContent = `Věk: ${dVek}`;
	detailTel.textContent = `Telefon: ${dTelefon}`;
	closeEdit.id = fKey;
	editDetail.id = fKey;
	postPojisteni.id = fKey;
}
		
//PUT DETAIL
const detailJmeno = document.querySelector(`#e-d-jmeno`);
const detailPrijmeni = document.querySelector(`#e-d-prijmeni`);
const detailVek = document.querySelector(`#e-d-vek`);
const detailTelefon = document.querySelector(`#e-d-telefon`);
const detailSubmit = document.querySelector(`#e-d-submit`);

detailSubmit.addEventListener("click", event => {
	event.preventDefault();
	if (detailJmeno.value.length < 1) return; 
	if (detailPrijmeni.value.length < 1) return;
	if (detailVek.value < 1) return;
	if (detailTelefon.value.length < 1) return;
	const detailID = editDetail.id;
	
	putna(detailID, detailJmeno.value, detailPrijmeni.value, detailVek.value, detailTelefon.value);
	editDetail.click();
	detail(detailJmeno.value, detailPrijmeni.value, detailVek.value, detailTelefon.value, detailID);
	mujSnackbar("Pojištěnec byl upraven.");
});

//PUTNA
const putna = (endID, putJmeno, putPrijmeni, putVek, putTelefon) => {
	API.put(`/Pojistenec/${endID}/info.json`, {
		jmeno: putJmeno,
		prijmeni: putPrijmeni,
		vek: putVek,
		telefon: putTelefon
	}).then(() => {
    	displayPojistenci(putJmeno, putPrijmeni, putVek, putTelefon, endID);
		tbody.innerHTML = "";
		init();
	});
}

//PUTNA
const putnaPojistení = (startID, endID, putTyp, putCastka) => {
	API.put(`/Pojistenec/${startID}/pojisteni/${endID}.json`, {
		typ: putTyp,
		castka: putCastka
	}).then(() => {
    	displayPojisteni(putTyp, putCastka, startID, endID);
		tbodyPojisteni.innerHTML = "";
		initPojisteni(startID);
	});
}

//TABLE POJISTENI  
const tbodyPojisteni = document.querySelector("#pojisteni-table tbody");
const pojisteniTyp = document.querySelector(`#typ-pojisteni`);
const pojisteniCastka = document.querySelector(`#castka`);
const pojisteniSubmit = document.querySelector(`#pojisteni-submit`);

const displayPojisteni = (typ, castka, fKey, sKey) => {

    tbodyPojisteni.insertAdjacentHTML("beforeend",
      	`<tr>
			<td class="ps-3">${typ}</td>
			<td class="ps-3">${castka}</td>
			<td id="${fKey}" class="px-0 d-none adminusik" style="width: 70px;">
				<button id="${sKey}" type="button" class="btn-close closilla" aria-label="Close"></button>
				<button id="${sKey}" type="button" class="btn-editak dropstart" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside"></button>
					<form id="edit-form" class="dropdown-menu container-sm w-50 px-4 py-2" style="max-width: 30em; min-width: 20em;">
					<div class="row justify-content-center text-center">
						<div class="col-lg-auto col-md-auto col-sm-auto align-self-center px-3">
							<label for="typ" class="form-label pt-2">Typ pojištěni</label>
							<select id="typ-pojisteni${sKey}" class="form-controling typ-pojisteni px-5 py-2 my-2" style="max-width: 15em;">
								<option selected>${typ}</option>
								<option>Životni</option>
								<option>Úrazové</option>
								<option>Zdravotní</option>
								<option>Havarijní</option>
								<option>Cestovní</option>
							</select>
						</div>
						<div class="col-lg-auto col-md-auto col-sm-auto align-self-center px-3">
						<label for="castka" class="form-label pt-2">Částka</label>
						<input id="castka${sKey}" class="form-controling inButts my-0 castka" type="number" maxlength="20" value="${castka}">
						</div>
					</div>
					<div class="row justify-content-center">
						<div class="col-auto">
							<input type="submit" value="Upravit" id="${sKey}" class="btn btn-default edit-btn-submit prd mt-4">
						</div>
					</div>
				</form>	
			</td>
     	</tr>`
      	);
//ADMIN TOOL
	const adminusik = document.querySelectorAll(".adminusik");

	adminusik.forEach(tools => {
		adminTools(tools, adminusik.id);
	})

//SMASH POJISTENI
	const closillas = document.querySelectorAll(".closilla");
	const closilla = (closillas[closillas.length- 1]);
	const closillaID = closilla.id;
	const adminusicek = (adminusik[adminusik.length- 1]);

	closilla.addEventListener("click", event => {
		event.preventDefault();
		const adminusikID = adminusicek.id;

		smash(adminusikID, closillaID);
		mujSnackbar("Pojištění bylo odebráno.");
	});

//PUT POJISTENI
	const editTyp = document.querySelector(`#typ-pojisteni${sKey}`);
	const editCastka = document.querySelector(`#castka${sKey}`);
	const editButtsPojisteni = document.querySelectorAll(`.edit-btn-submit`);
	const editButtPojisteni = (editButtsPojisteni[editButtsPojisteni.length- 1])
	const editIDPojisteni = editButtPojisteni.id;

	editButtPojisteni.addEventListener("click", event => {
			event.preventDefault();
			if (editTyp.value == "Zvolte typ") return; 
			if (editCastka.value.length < 1) return;

			const adminusikID = adminusicek.id;

			putnaPojistení(adminusikID, editIDPojisteni, editTyp.value, editCastka.value);
			mujSnackbar("Pojištění bylo upraveno.");
		});



} //TABLE POJISTENI END

//POST SUBMIT POJISTENI
pojisteniSubmit.addEventListener("click", event => {
	event.preventDefault();
	if (pojisteniTyp.value == "Zvolte typ") return; 
	if (pojisteniCastka.value.length < 1) return;
	const postID = postPojisteni.id;

	API.post(`/Pojistenec/${postID}/pojisteni.json`, {
			typ: pojisteniTyp.value,
			castka: pojisteniCastka.value
		}).then(data => {
			const sKey = data.name;
			displayPojisteni(pojisteniTyp.value, pojisteniCastka.value, postID, sKey);

			pojisteniTyp.value = "Zvolte typ";
			pojisteniCastka.value = "";
			
			postPojisteni.click();
			mujSnackbar("Nové pojištění bylo přidáno.");
	});
})

//GET POJISTENI
const initPojisteni = (fKey) => {
	if (fKey == "") return;
	API.get(`/Pojistenec/${fKey}/pojisteni.json`)
  		.then(data => {
			if (data == null) return;
			Object.keys(data).forEach(key => {
				const klice = (data[key]);
				displayPojisteni(klice.typ,	klice.castka, fKey,	key);
			})
		})
}



init();

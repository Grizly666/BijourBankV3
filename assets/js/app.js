console.log('Bijour Bank !');
/**
 * init foundation
 */
$(document).ready(function () {
	$(document).foundation();
});
//push en localstorage
function setData() {
	var i = localStorage.length;
		var datastorage = {
		titre: document.getElementById('titre').value,
		desc: document.getElementById('desc').value,
		montant: document.getElementById('montant').value,
		operator: document.getElementById('operator').value,
		};

		localStorage.setItem(i, JSON.stringify(datastorage));
	}
	// boucle sur le tableau localstorage
	let montantCredit = 0;
	let montantDebit = 0;
	for (let i = 0; i < localStorage.length; i++) {
	let obj = JSON.parse(localStorage.getItem(i));
	var img = '';

	if (obj.operator == 'credit') {
		img = 'sac-dargent';
		montantCredit = montantCredit + Number(obj.montant);
	} else {
		img = 'depenses';
		montantDebit = montantDebit + Number(obj.montant);
	}
	var solde = document.getElementById('solde');
	solde.innerHTML = montantCredit - montantDebit + '€';

	//calcule du pourcentage

	for (let i = 0; i < localStorage.length; i++) {
		let obj = JSON.parse(localStorage.getItem(i));
		var soldefinal = montantCredit - montantDebit;
		var pourcentage = (soldefinal * 100) / obj.montant;
	}

	//injection html

	var html = `
	<div class="grid-container" >
				<div class="operation ${obj.operator}">
					<div class="grid-x grid-padding-x align-middle">
						<div class="cell shrink">
							<div class="picto">
								<img src="./assets/images/${img}.png" alt="${obj.operator}" />
							</div>
						</div>
						<div class="cell auto">
							<div>
								<h2>${obj.titre}</h2>
								<small>${obj.desc}</small>
							</div>
						</div>
						<div class="cell small-3 text-right">
							<div>
								<p class="count">${obj.montant} €</p>
								<small>${pourcentage.toFixed(2)}%</small>
							</div>
						</div>
					</div>
				</div>
			</div>
        `;

	var replace = document.getElementById('grid-container');
	replace.insertAdjacentHTML('afterbegin', html);
	}

	//recuperation des boutons debit credit
	const all = document.getElementById("all");
	const cred = document.getElementById("cred");
	const deb = document.getElementById("deb");
   
	const allDeb = document.getElementsByClassName("debit");
	const allCred =  document.getElementsByClassName("credit");
	
	//ajout de l'evenement clic pour changer l'affichage
	cred.addEventListener("click",(e) =>{
	  
	   for (const [key, value] of Object.entries(allDeb)) {
		 
		 value.style.display = "none";
	   }
	   for (const [key, value] of Object.entries(allCred)) {
		 
		 value.style.display = "block";
	   }
	
	})
	
	deb.addEventListener("click", (e) => {
   
	 for (const [key, value] of Object.entries(allDeb)) {
		 
	   value.style.display = "block";
	 }
	 for (const [key, value] of Object.entries(allCred)) {
	   
	   value.style.display = "none";
	 }
	
	})
	
	all.addEventListener("click", (e) => {
   
	 for (const [key, value] of Object.entries(allDeb)) {
		 
	   value.style.display = "block";
	 }
	 for (const [key, value] of Object.entries(allCred)) {
	   
	   value.style.display = "block";
	 }
	
	})
